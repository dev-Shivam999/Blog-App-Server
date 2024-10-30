import express, { Express } from 'express';
import cors from 'cors';
import { PrismaClient } from "@prisma/client";
import { routes } from './routes/userRoute';
import * as dotenv from 'dotenv';
import cluster from 'cluster';
import os from 'os';
import http from "http";
import { Server } from "socket.io";

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
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
            credentials: true,
        },
    });



    app.use('/user', routes);

    io.on("connection", (socket) => {
        console.log("Client connected:", socket.id);

        socket.on("message", (event) => {
            console.log("User event:", event);
            io.emit("message", event);
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });
    });

    
    httpServer.listen(3000, () => {
        console.log('Server listening on port 3000');
    });
}
