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
exports.All = void 0;
const __1 = require("../..");
const All = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.header("authorization");
    try {
        if (!id) {
            id = "0";
        }
        const vali = yield __1.client.bloger.findUnique({
            where: {
                id: Number(id)
            }, select: {
                img: true
            }
        });
        const blog = yield __1.client.blog.findMany({
            select: {
                avtar: true,
                content: true,
                title: true,
                created: true,
                id: true,
                authore: {
                    select: {
                        name: true, img: true,
                    }
                }, Link: {
                    select: {
                        blogerId: true,
                    }
                }
            }, orderBy: {
                Link: {
                    _count: "desc"
                }
            }
        });
        return res.json({ success: true, blogs: blog, vali: vali ? vali.img : vali });
    }
    catch (error) {
        console.log(error);
        return res.json({ success: false });
    }
});
exports.All = All;
