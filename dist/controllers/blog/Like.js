"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeCount = void 0;
const __1 = require("../..");
const redis_1 = __importDefault(require("../../utils/redis/redis"));
const LikeCount = async (req, res) => {
    const id = req.body;
    const userId = req.header('authorization');
    try {
        if (!userId) {
            return res.json({ success: false, message: false });
        }
        let user = await __1.client.bloger.findFirst({
            where: {
                id: Number(userId)
            },
            select: { id: true, img: true },
        });
        if (!user) {
            return res.json({ success: false, message: false });
        }
        await redis_1.default.del("Blogs");
        await redis_1.default.del("User");
        await redis_1.default.del("BloggerProfile");
        const cl = await __1.client.like.findFirst({
            where: {
                blogerId: Number(userId),
                blogId: String(id.id)
            }
        });
        if (cl) {
            await __1.client.like.deleteMany({
                where: {
                    blogerId: Number(userId),
                    blogId: String(id.id)
                }
            });
            return res.json({ success: false, message: true });
        }
        else {
            await __1.client.like.create({
                data: {
                    blogerId: Number(userId),
                    blogId: id.id,
                }
            });
            return res.json({ success: true, message: true });
        }
    }
    catch (error) {
        console.log(error);
        return res.json({ error: false });
    }
};
exports.LikeCount = LikeCount;
