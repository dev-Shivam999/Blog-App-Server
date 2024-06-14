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
exports.showPost = void 0;
const __1 = require("../..");
const showPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const posts = yield __1.client.blog.findFirst({
        where: { id: id },
        select: {
            avtar: true,
            content: true,
            title: true,
            created: true,
            id: true,
            authore: {
                select: {
                    name: true,
                    img: true,
                    id: true,
                }
            }
        }
    });
    if (!posts) {
        return res.json({ success: false });
    }
    return res.json({ success: true, data: posts });
});
exports.showPost = showPost;
