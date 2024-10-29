"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogDelete = void 0;
const __1 = require("../..");
const redis_1 = __importDefault(require("../../utils/redis/redis"));
const BlogDelete = async (req, res) => {
    const id = req.body;
    const user = req.header("authorization");
    try {
        await __1.client.blog.delete({
            where: {
                authoreId: Number(user),
                id: id.e
            }
        });
        await redis_1.default.del("Blogs");
        return res.json({ success: true });
    }
    catch (error) {
        console.log(error);
        return res.json({ success: false });
    }
};
exports.BlogDelete = BlogDelete;
