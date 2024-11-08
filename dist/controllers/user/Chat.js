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
        const data = await __1.client.chat.findFirst({
            where: {
                OR: [
                    {
                        ReciveFrom: Number(val),
                        SendTo: Number(auth),
                    }, {
                        ReciveFrom: Number(auth),
                        SendTo: Number(val),
                    }
                ]
            },
            select: {
                content: true
            },
            orderBy: { content: "asc" }
        });
        if (data == null) {
            await __1.client.chat.create({
                data: {
                    content: [], ReciveFrom: Number(val), SendTo: Number(auth)
                }
            });
            return res.json({ success: true, message: data });
        }
        // const serializedMessages = data.content.map(async (msg) =>
        //   await RedisApi.rPush(`chat:${val}:${auth}`,
        //     JSON.stringify(msg))
        // );
        return res.json({ success: true, message: data });
    }
    catch (error) {
        console.log(error);
        return res.json({ success: false, error: error });
    }
};
exports.Chat = Chat;
