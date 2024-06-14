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
exports.Follow = void 0;
const __1 = require("../..");
const Follow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const val = req.header("Authorization");
    const auth = req.header("Lol");
    const isFollowing = yield __1.client.follow.findFirst({
        where: {
            follow: Number(auth),
            follower: Number(val)
        },
    });
    try {
        if (!isFollowing) {
            yield __1.client.follow.create({
                data: {
                    follow: Number(auth),
                    follower: Number(val)
                },
            });
            res.json({ success: true, message: "Followed successfully" });
        }
        else {
            yield __1.client.follow.deleteMany({
                where: {
                    follow: Number(auth),
                    follower: Number(val),
                },
            });
            res.json({ success: true, message: "Unfollowed successfully" });
        }
    }
    catch (error) {
        console.log(error);
        return res.json({ success: false });
    }
});
exports.Follow = Follow;
