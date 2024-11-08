"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const userRoute_1 = require("./routes/userRoute");
const dotenv = __importStar(require("dotenv"));
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os"));
const http_1 = __importDefault(require("http"));
const ws_1 = require("ws");
dotenv.config();
exports.client = new client_1.PrismaClient();
const totalCpus = os_1.default.cpus().length;
if ( /*cluster.isPrimary*/false) {
    console.log(`totalCpus: ${totalCpus}`);
    for (let i = 0; i < totalCpus; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} exited, starting a new one...`);
        cluster_1.default.fork();
    });
}
else {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    const httpServer = http_1.default.createServer(app);
    const wss = new ws_1.WebSocketServer({ server: httpServer });
    app.use('/user', userRoute_1.routes);
    const UserSocket = new Map();
    wss.on("connection", (ws) => {
        console.log("Client connected");
        ws.on("message", async (message) => {
            const data = JSON.parse(message.toString());
            if (data.event == "User") {
                const value = UserSocket.get(data.id);
                ws.userId = data.id;
                if (!value)
                    UserSocket.set(data.id, { ws });
                else {
                    value.ws = ws;
                }
            }
            else {
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
