import express, { Express } from 'express';
import cors from 'cors';
import { PrismaClient } from "@prisma/client";
import { routes } from './routes/userRoute';
import * as dotenv from 'dotenv';
import cluster from 'cluster';
import os from 'os';
import http from "http";
import { WebSocketServer } from "ws";

dotenv.config();

export const client = new PrismaClient();
const totalCpus = os.cpus().length;

if (cluster.isPrimary) {
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

    // WebSocket connection
    wss.on("connection", (ws) => {
        console.log("Client connected");

        ws.on("message", (message) => {
            console.log("User message:", message.toString());

            wss.clients.forEach(client => {
                if (client.readyState === ws.OPEN) {
                    client.send(message.toString());
                }
            });
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
