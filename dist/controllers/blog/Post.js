"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCreate = void 0;
const __1 = require("../..");
const redis_1 = __importDefault(require("../../utils/redis/redis"));
const PostCreate = async (req, res) => {
    const Post = req.body;
    const auth = req.header("Authorization");
    try {
        if (auth == undefined) {
            return res.json({ success: false, message: "login first" });
        }
        let validation = await redis_1.default.get("User");
        if (!validation) {
            const validation = await __1.client.bloger.findMany({
                select: {
                    id: true
                }
            });
            const user = validation.find((u) => u.id === Number(auth.toString()));
            await redis_1.default.set("User", JSON.stringify(validation));
            if (user == null) {
                return res.json({ success: false, message: "login first" });
            }
        }
        else {
            validation = await JSON.parse(validation);
            validation = Array.isArray(validation) ? validation.find((p) => p.id === Number(auth.toString())) : null;
            if (validation == null) {
                return res.json({ success: false, message: "login first" });
            }
        }
        const daa = await __1.client.blog.create({
            data: {
                title: Post.Title,
                content: Post.content,
                authoreId: Number(auth.toString()),
                avtar: Post.avtar,
            }, select: {
                id: true
            }
        });
        await redis_1.default.del("Blogs");
        await redis_1.default.del("User");
        await redis_1.default.del("BloggerProfile");
        return res.json({ success: true, message: daa.id });
    }
    catch (error) {
        console.log(error, "Error");
        return res.json({ success: false, });
    }
};
exports.PostCreate = PostCreate;
