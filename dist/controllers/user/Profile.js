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
exports.Profile = void 0;
const __1 = require("../..");
const Profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const val = req.header("Authorization");
    const auth = req.header("Lol");
    const location = req.header("Location");
    try {
        if (location == "/Edits") {
            const user = yield __1.client.bloger.findFirst({
                where: {
                    id: Number(val)
                },
                select: {
                    name: true,
                    img: true,
                }
            });
            return res.json({ success: true, message: user });
        }
        if (auth == undefined) {
            return res.json({ success: false, message: "login plz" });
        }
        if (auth == val) {
            return res.json({ success: true, message: true });
        }
        if (location == "BloggerProfile") {
            const user = yield __1.client.bloger.findFirst({
                where: {
                    id: Number(auth)
                },
                select: {
                    id: true,
                    name: true,
                    img: true,
                    blogs: {
                        select: {
                            authoreId: true,
                            avtar: true,
                            content: true,
                            title: true,
                            created: true,
                            id: true,
                            Likes: {
                                select: {
                                    blogerId: true,
                                }
                            }
                        }
                    },
                    Followers: {
                        select: {
                            follow: true
                        }
                    },
                    Following: {
                        select: {
                            follow: true
                        }
                    },
                }
            });
            if (!user) {
                return res.json({ success: false, message: "Not found" });
            }
            const data = user.Followers.some(p => p.follow == Number(val));
            res.json({ success: true, message: { user, data }, });
        }
        else {
            const user = yield __1.client.bloger.findFirst({
                where: {
                    id: Number(val)
                }, select: {
                    id: true,
                    name: true,
                    img: true,
                    blogs: true,
                    Followers: {
                        select: {
                            follow: true
                        }
                    },
                    Likes: {
                        select: {
                            blogerId: true
                        }
                    },
                    Following: {
                        select: {
                            follower: true
                        }
                    }
                }
            });
            if (!user) {
                return res.json({ success: false, message: "login plz" });
            }
            res.json({ success: true, message: { user } });
        }
    }
    catch (error) {
        console.log(error);
        return res.json({ success: false, message: "plz try later" });
    }
});
exports.Profile = Profile;
