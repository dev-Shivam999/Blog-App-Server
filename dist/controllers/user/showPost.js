"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showPost = void 0;
const __1 = require("../..");
const redis_1 = __importDefault(require("../../utils/redis/redis"));
const showPost = async (req, res) => {
    const { id } = req.params;
    let posts = await redis_1.default.get("Blogs");
    if (!posts) {
        const posts = await __1.client.blog.findMany({
            select: {
                avtar: true,
                content: true,
                title: true,
                created: true,
                id: true,
                authore: {
                    select: { name: true, img: true, id: true },
                },
                Likes: {
                    select: { blogerId: true },
                },
            },
            orderBy: {
                Likes: {
                    _count: "desc",
                },
            }
        });
        if (!posts) {
            return res.json({ success: false });
        }
        redis_1.default.set("Blogs", JSON.stringify(posts));
        return res.json({ success: true, data: posts });
    }
    posts = await JSON.parse(posts);
    posts = Array.isArray(posts) ? posts.find((p) => p.id === id) : null;
    if (!posts) {
        return res.json({ success: false });
    }
    return res.json({ success: true, data: posts });
};
exports.showPost = showPost;
