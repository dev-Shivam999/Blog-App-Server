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
exports.SignIn = void 0;
const __1 = require("../..");
const SignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req.body;
    try {
        const user = yield __1.client.bloger.findFirst({
            where: {
                email: body.email,
            }
        });
        if (user) {
            return res.json({ success: false, message: "user have account already" });
        }
        const userId = yield __1.client.bloger.create({
            data: {
                email: body.email,
                name: body.name,
                img: body.img,
                password: body.password
            }, select: {
                id: true
            }
        });
        return res.json({ success: true, message: `${userId.id}` });
    }
    catch (error) {
        console.log("error", error);
        res.json({ success: false, message: "success failed" });
    }
});
exports.SignIn = SignIn;
