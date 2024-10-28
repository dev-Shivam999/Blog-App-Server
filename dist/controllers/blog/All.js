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
exports.All = void 0;
var __1 = require("../.."); // Database client
var redis_1 = __importDefault(require("../../utils/redis/redis"));
var All = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, cachedBlogs, cachedUsers, user_1, blogs, users, user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.header("authorization");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 9, , 10]);
                return [4 /*yield*/, redis_1.default.get("Blogs")];
            case 2:
                cachedBlogs = _a.sent();
                if (!cachedBlogs) return [3 /*break*/, 4];
                cachedBlogs = JSON.parse(cachedBlogs);
                if (!id) {
                    return [2 /*return*/, res.json({ success: false, blogs: cachedBlogs })];
                }
                return [4 /*yield*/, redis_1.default.get("User")];
            case 3:
                cachedUsers = _a.sent();
                if (cachedUsers) {
                    cachedUsers = JSON.parse(cachedUsers);
                    user_1 = Array.isArray(cachedUsers) ? cachedUsers.find(function (p) { return p.id === Number(id); }) : null;
                    return [2 /*return*/, res.json({ success: true, blogs: cachedBlogs, vali: user_1 ? user_1.img : null })];
                }
                _a.label = 4;
            case 4: return [4 /*yield*/, __1.client.blog.findMany({
                    select: {
                        avtar: true,
                        content: true,
                        title: true,
                        created: true,
                        id: true,
                        authore: {
                            select: { name: true, img: true, id: true },
                        },
                        Likes: {
                            select: { blogerId: true },
                        },
                    },
                    orderBy: {
                        Likes: {
                            _count: "desc",
                        },
                    },
                })];
            case 5:
                blogs = _a.sent();
                return [4 /*yield*/, redis_1.default.set("Blogs", JSON.stringify(blogs))];
            case 6:
                _a.sent(); // Cache for 1 hour
                if (!id) {
                    return [2 /*return*/, res.json({ success: false, blogs: blogs })];
                }
                return [4 /*yield*/, __1.client.bloger.findMany({
                        select: { id: true, img: true },
                    })];
            case 7:
                users = _a.sent();
                return [4 /*yield*/, redis_1.default.set("User", JSON.stringify(users))];
            case 8:
                _a.sent();
                user = users.find(function (u) { return u.id === Number(id); });
                return [2 /*return*/, res.json({ success: true, blogs: blogs, vali: user ? user.img : null })];
            case 9:
                error_1 = _a.sent();
                console.error("Error fetching data:", error_1);
                return [2 /*return*/, res.json({ success: false })];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.All = All;
//# sourceMappingURL=All.js.map