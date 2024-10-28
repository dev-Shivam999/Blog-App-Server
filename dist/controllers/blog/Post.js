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
exports.PostCreate = void 0;
var __1 = require("../..");
var redis_1 = __importDefault(require("../../utils/redis/redis"));
var PostCreate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Post, auth, validation, validation_1, user, daa, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Post = req.body;
                auth = req.header("Authorization");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 12, , 13]);
                if (auth == undefined) {
                    return [2 /*return*/, res.json({ success: false, message: "login first" })];
                }
                return [4 /*yield*/, redis_1.default.get("User")];
            case 2:
                validation = _a.sent();
                if (!!validation) return [3 /*break*/, 5];
                return [4 /*yield*/, __1.client.bloger.findMany({
                        select: {
                            id: true
                        }
                    })];
            case 3:
                validation_1 = _a.sent();
                user = validation_1.find(function (u) { return u.id === Number(auth.toString()); });
                return [4 /*yield*/, redis_1.default.set("User", JSON.stringify(validation_1))];
            case 4:
                _a.sent();
                if (user == null) {
                    return [2 /*return*/, res.json({ success: false, message: "login first" })];
                }
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, JSON.parse(validation)];
            case 6:
                validation = _a.sent();
                validation = Array.isArray(validation) ? validation.find(function (p) { return p.id === Number(auth.toString()); }) : null;
                if (validation == null) {
                    return [2 /*return*/, res.json({ success: false, message: "login first" })];
                }
                _a.label = 7;
            case 7: return [4 /*yield*/, __1.client.blog.create({
                    data: {
                        title: Post.Title,
                        content: Post.content,
                        authoreId: Number(auth.toString()),
                        avtar: Post.avtar,
                    }, select: {
                        id: true
                    }
                })];
            case 8:
                daa = _a.sent();
                return [4 /*yield*/, redis_1.default.del("Blogs")];
            case 9:
                _a.sent();
                return [4 /*yield*/, redis_1.default.del("User")];
            case 10:
                _a.sent();
                return [4 /*yield*/, redis_1.default.del("BloggerProfile")];
            case 11:
                _a.sent();
                return [2 /*return*/, res.json({ success: true, message: daa.id })];
            case 12:
                error_1 = _a.sent();
                console.log(error_1, "Error");
                return [2 /*return*/, res.json({ success: false, })];
            case 13: return [2 /*return*/];
        }
    });
}); };
exports.PostCreate = PostCreate;
//# sourceMappingURL=Post.js.map