import express, { Express } from 'express';
import cors from 'cors';
import { PrismaClient } from "@prisma/client";
import { routes } from './routes/userRoute';
import * as dotenv from 'dotenv';
import cluster from 'cluster';
import os from 'os';
import http from "http";
import { WebSocketServer } from "ws";
import { log } from 'console';
import RedisApi from './utils/redis/redis';
import { json } from 'stream/consumers';

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

    wss.on("connection", (ws) => {
        console.log("Client connected");

        ws.on("message", async(message) => {
            const data = JSON.parse(message.toString())
            console.log("User message:", data);
            
            console.log(wss.clients.size);
            
      if (data.event=="User") {
        
        let user=await RedisApi.get("User")
        if (user) {
            user=JSON.parse(user)
            wss.clients.forEach(client => {
                if (client.readyState === ws.OPEN) {
                    client.send(message.toString());

                }

            });
           
        }
      }

          else{
          wss.clients.forEach(client => {
              if (client.readyState === ws.OPEN) {
                  client.send(message.toString());

              }

          });
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
