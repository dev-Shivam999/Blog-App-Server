"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = void 0;
const __1 = require("../..");
const update = async (req, res) => {
    const { Post } = req.body;
    const { id } = req.params;
    try {
        const up = await __1.client.blog.update({
            where: { id: id, authoreId: Number(Post.authorId) },
            data: {
                title: Post.Title,
                content: Post.content
            }, select: {
                title: true, content: true,
            }
        });
        return res.json({ success: true, data: up });
    }
    catch (error) {
        console.log(error);
        return res.json({ success: true, data: error });
    }
};
exports.update = update;
