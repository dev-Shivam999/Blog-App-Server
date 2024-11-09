"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
const redis_1 = __importDefault(require("../../utils/redis/redis"));
const __1 = require("../..");
const Chat = async (req, res) => {
    const val = req.header("Authorization");
    const auth = req.header("Lol");
    try {
        let user = await redis_1.default.get(`chat${val}:${auth}`);
        if (user) {
            user = await JSON.parse(user);
            return res.json({ success: true, message: user });
        }
        const sender = await __1.client.bloger.findUnique({ where: { id: Number(val) } });
        const receiver = await __1.client.bloger.findUnique({ where: { id: Number(auth) } });
        if (!sender || !receiver) {
            console.log(auth, receiver);
            return res.json({ success: false, message: "Sender or receiver not found." });
        }
        const data = await __1.client.chat.findFirst({
            where: {
                OR: [
                    { ReciveFrom: Number(val), SendTo: Number(auth) },
                    { ReciveFrom: Number(auth), SendTo: Number(val) },
                ]
            },
            select: { SendTo: true, content: true, sendTo: { select: { img: true, name: true } }, reciveFrom: { select: { img: true, name: true } } },
            orderBy: { content: { _count: "asc" } }
        });
        if (!data) {
            const newChat = await __1.client.chat.create({
                data: {
                    ReciveFrom: Number(val),
                    SendTo: Number(auth),
                }
            });
            return res.json({ success: true, message: newChat });
        }
        return res.json({ success: true, message: data.content, sendTo: data.SendTo != Number(auth) ? data.sendTo : data.reciveFrom });
    }
    catch (error) {
        console.log(error);
        return res.json({ success: false, error });
    }
};
exports.Chat = Chat;
