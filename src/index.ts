import express, { Express } from 'express';
import cors from 'cors';
import { PrismaClient } from "@prisma/client";
import { routes } from './routes/userRoute';
import * as dotenv from 'dotenv';
import cluster from 'cluster';
import os from 'os';
import http from "http";
import WebSocket, { WebSocketServer } from "ws";
import RedisApi from './utils/redis/redis';



export interface ClientData {
    ws: ExtendedWebSocket
    messageQue: String[]
}

export interface ExtendedWebSocket extends WebSocket {
    userId: string;
}

dotenv.config();



export const client = new PrismaClient();
const totalCpus = os.cpus().length;

if (/*cluster.isPrimary*/false) {
    console.log(`totalCpus: ${totalCpus}`);

    for (let i = 0; i < totalCpus; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} exited, starting a new one...`);
        cluster.fork();
    });
} else {
    const app: Express = express();
    app.use(cors());
    app.use(express.json());

    const httpServer = http.createServer(app);
    const wss = new WebSocketServer({ server: httpServer });

    app.use('/user', routes);


    const UserSocket = new Map<String, ClientData>()

    wss.on("connection", (ws: ExtendedWebSocket) => {
        console.log("Client connected");

        ws.on("message", async (message) => {
            const data = JSON.parse(message.toString())



            if (data.event == "User") {
                const value = UserSocket.get(data.id)
                ws.userId = data.id
                if (!value) UserSocket.set(data.id, { ws, messageQue: [] })

                else {

                    value.ws = ws
                    if (value.messageQue.length > 0) {

                        ws.send(JSON.stringify({ event: "Notification", message: value.messageQue }))
                        value.messageQue = []
                    }

                }




            }

            else {
                const targetClient = UserSocket.get(data.id)
                if (targetClient) {

                    if (targetClient.ws.readyState === WebSocket.OPEN) {
                        targetClient.ws.send(JSON.stringify({ event: "message", message: data.message, sendTo: ws.userId, getTo: data.SendTo }));


                    }
                    else {

                        UserSocket.get(data.id)?.messageQue.push(String(data.message))
                        console.log(UserSocket.get(data.id)?.messageQue);
                    }
                    ws.send(JSON.stringify({ event: "message", message: data.message, sendTo: ws.userId, getTo: data.SendTo }));


                } else {
                    ws.send(JSON.stringify({ event: "Error", message: "User not found" }))
                }
            }
        });

        ws.on("close", () => {
            console.log("Client disconnected");
        });

        ws.on("error", (error) => {
            console.error("WebSocket error:", error);
        });
    });

    httpServer.listen(3000, () => {
        console.log('Server listening on port 3000');
    });
}
