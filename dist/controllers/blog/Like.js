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
exports.LikeCount = void 0;
const __1 = require("../..");
const LikeCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body;
    const userId = req.header('authorization');
    if (!userId) {
        return res.json({ success: false, message: false });
    }
    const user = yield __1.client.bloger.findFirst({
        where: {
            id: Number(userId),
        }, select: {
            Likes: true
        }
    });
    if (!user) {
        return res.json({ success: false, message: false });
    }
    const cl = yield __1.client.like.findFirst({
        where: {
            blogerId: Number(userId),
            blogId: id.id
        }
    });
    if (cl) {
        yield __1.client.like.deleteMany({
            where: {
                blogerId: Number(userId),
                blogId: id.id
            }
        });
        return res.json({ success: false, message: true });
    }
    else {
        yield __1.client.like.create({
            data: {
                blogerId: Number(userId),
                blogId: id.id,
            }
        });
        return res.json({ success: true, message: true });
    }
});
exports.LikeCount = LikeCount;
