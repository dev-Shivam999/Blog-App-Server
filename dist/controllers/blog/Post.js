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
exports.PostCreate = void 0;
const __1 = require("../..");
const PostCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Post = req.body;
    const auth = req.header("Authorization");
    if (!req.file) {
        return res.json({ success: false, message: "plz upload img" });
    }
    try {
        if (auth == undefined) {
            return res.json({ success: false, message: "login first" });
        }
        const validation = yield __1.client.bloger.findFirst({
            where: {
                id: Number(auth.toString())
            }
        });
        if (validation == null) {
            return res.json({ success: false, message: "login first" });
        }
        const daa = yield __1.client.blog.create({
            data: {
                title: Post.Title,
                content: Post.content,
                authoreId: Number(auth.toString()),
                avtar: `/uploads/${req.file.filename}`,
            }, select: {
                id: true
            }
        });
        return res.json({ success: true, message: daa.id });
    }
    catch (error) {
        console.log(error, "Error");
        return res.json({ success: false, });
    }
});
exports.PostCreate = PostCreate;
