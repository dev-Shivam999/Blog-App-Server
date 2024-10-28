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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
var __1 = require("../..");
var redis_1 = __importDefault(require("../../utils/redis/redis"));
var Profile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var val, auth, location, user, ser, user_1, use, user_2, data_1, data_2, user, data, user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                val = req.header("Authorization");
                auth = req.header("Lol");
                location = req.header("Location");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 16, , 17]);
                if (!(location == "/Edits")) return [3 /*break*/, 7];
                return [4 /*yield*/, redis_1.default.get("User")];
            case 2:
                user = _a.sent();
                if (!!user) return [3 /*break*/, 5];
                return [4 /*yield*/, __1.client.bloger.findMany({
                        select: {
                            id: true,
                            name: true,
                            img: true,
                        }
                    })];
            case 3:
                ser = _a.sent();
                return [4 /*yield*/, redis_1.default.set("User", JSON.stringify(ser))];
            case 4:
                _a.sent();
                user_1 = ser.find(function (u) { return u.id === Number(val); });
                return [2 /*return*/, res.json({ success: true, message: user_1 })];
            case 5: return [4 /*yield*/, JSON.parse(user)];
            case 6:
                user = _a.sent();
                user = Array.isArray(user) ? user.find(function (p) { return p.id === Number(val); }) : null;
                return [2 /*return*/, res.json({ success: true, message: user })];
            case 7:
                if (auth == undefined) {
                    return [2 /*return*/, res.json({ success: false, message: "login plz" })];
                }
                if (auth == val) {
                    return [2 /*return*/, res.json({ success: true, message: true })];
                }
                if (!(location == "BloggerProfile")) return [3 /*break*/, 13];
                return [4 /*yield*/, redis_1.default.get("BloggerProfile")];
            case 8:
                use = _a.sent();
                if (!!use) return [3 /*break*/, 11];
                return [4 /*yield*/, __1.client.bloger.findMany({
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
                                    Likes: true
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
                    })];
            case 9:
                user_2 = _a.sent();
                return [4 /*yield*/, redis_1.default.set("BloggerProfile", JSON.stringify(user_2))];
            case 10:
                _a.sent();
                user_2 = user_2.filter(function (p) { return p.id == Number(auth); });
                if (!user_2) {
                    return [2 /*return*/, res.json({ success: false, message: "Not found" })];
                }
                if (user_2[0].Followers.length > 0) {
                    data_1 = user_2[0].Followers.some(function (p) { return (p === null || p === void 0 ? void 0 : p.follow) == Number(val); });
                    return [2 /*return*/, res.json({ success: true, message: { user: user_2[0], data: data_1 }, })];
                }
                data_2 = false;
                return [2 /*return*/, res.json({ success: true, message: { user: user_2[0], data: data_2 }, })];
            case 11: return [4 /*yield*/, JSON.parse(use)];
            case 12:
                use = _a.sent();
                user = Array.isArray(use) ? use.find(function (p) { return p.id === Number(auth); }) : null;
                data = user.Followers.some(function (p) { return p.follow == Number(val); });
                res.json({ success: true, message: { user: user, data: data } });
                return [3 /*break*/, 15];
            case 13: return [4 /*yield*/, __1.client.bloger.findFirst({
                    where: {
                        id: Number(val)
                    }, select: {
                        id: true,
                        name: true,
                        img: true,
                        blogs: {
                            select: {
                                avtar: true,
                                content: true,
                                title: true,
                                created: true,
                                id: true,
                                authore: {
                                    select: {
                                        name: true, img: true,
                                        id: true
                                    }
                                }, Likes: {
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
                        Likes: {
                            select: {
                                blogId: true
                            }
                        },
                        Following: {
                            select: {
                                follower: true
                            }
                        }
                    }
                })];
            case 14:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.json({ success: false, message: "login plz" })];
                }
                return [2 /*return*/, res.json({ success: true, message: { user: user } })];
            case 15: return [3 /*break*/, 17];
            case 16:
                error_1 = _a.sent();
                console.log(error_1);
                return [2 /*return*/, res.json({ success: false, message: "plz try later" })];
            case 17: return [2 /*return*/];
        }
    });
}); };
exports.Profile = Profile;
//# sourceMappingURL=Profile.js.map