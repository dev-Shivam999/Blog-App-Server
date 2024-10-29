"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Follow = void 0;
const __1 = require("../..");
const redis_1 = __importDefault(require("../../utils/redis/redis"));
const Follow = async (req, res) => {
    const val = req.header("Authorization");
    const auth = req.header("Lol");
    if (!auth) {
        return res.json({ success: false, message: "login plz" });
    }
    const user = await __1.client.bloger.findFirst({
        where: {
            id: Number(auth)
        },
        select: {
            id: true
        }
    });
    if (user == null) {
        return res.json({ success: false, message: "login plz" });
    }
    const isFollowing = await __1.client.follow.findFirst({
        where: {
            follow: Number(auth),
            follower: Number(val)
        },
    });
    try {
        await redis_1.default.del("BloggerProfile");
        if (!isFollowing) {
            await __1.client.follow.create({
                data: {
                    follow: Number(auth),
                    follower: Number(val)
                },
            });
            res.json({ success: true, message: "Followed successfully" });
        }
        else {
            await __1.client.follow.deleteMany({
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
};
exports.Follow = Follow;
