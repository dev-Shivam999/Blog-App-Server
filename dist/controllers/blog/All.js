"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.All = void 0;
const __1 = require("../..");
const redis_1 = __importDefault(require("../../utils/redis/redis"));
const All = async (req, res) => {
    const id = req.header("authorization");
    try {
        let cachedBlogs = await redis_1.default.get("Blogs");
        if (cachedBlogs) {
            cachedBlogs = JSON.parse(cachedBlogs);
            if (!id) {
                return res.json({ success: false, blogs: cachedBlogs });
            }
            let cachedUsers = await redis_1.default.get("User");
            if (cachedUsers) {
                cachedUsers = JSON.parse(cachedUsers);
                const user = Array.isArray(cachedUsers) ? cachedUsers.find((p) => p.id === Number(id)) : null;
                return res.json({ success: true, blogs: cachedBlogs, vali: user ? user.img : null });
            }
        }
        const blogs = await __1.client.blog.findMany({
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
            },
        });
        await redis_1.default.set("Blogs", JSON.stringify(blogs));
        if (!id) {
            return res.json({ success: false, blogs });
        }
        const users = await __1.client.bloger.findMany({
            select: { id: true, img: true },
        });
        await redis_1.default.set("User", JSON.stringify(users));
        const user = users.find((u) => u.id === Number(id));
        return res.json({ success: true, blogs, vali: user ? user.img : null });
    }
    catch (error) {
        console.error("Error fetching data:", error);
        return res.json({ success: false });
    }
};
exports.All = All;
