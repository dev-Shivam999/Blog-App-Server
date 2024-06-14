"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = void 0;
const __1 = require("../..");
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Post } = req.body;
    const { id } = req.params;
    try {
        const up = yield __1.client.blog.update({
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
});
exports.update = update;
