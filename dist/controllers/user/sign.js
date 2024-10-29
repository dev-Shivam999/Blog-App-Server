"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignIn = void 0;
const __1 = require("../..");
const redis_1 = __importDefault(require("../../utils/redis/redis"));
const SignIn = async (req, res) => {
    const body = req.body;
    try {
        const user = await __1.client.bloger.findFirst({
            where: {
                email: body.email,
            }
        });
        if (user) {
            return res.json({ success: false, message: "user have account already" });
        }
        const userId = await __1.client.bloger.create({
            data: {
                email: body.email,
                name: body.name,
                img: body.avtar,
                password: body.password
            }, select: {
                id: true,
            }
        });
        await redis_1.default.del("User");
        return res.json({ success: true, message: `${userId.id}` });
    }
    catch (error) {
        console.log("error", error);
        res.json({ success: false, message: "success failed" });
    }
};
exports.SignIn = SignIn;
