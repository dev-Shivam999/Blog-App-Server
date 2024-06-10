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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const Post_1 = require("../controllers/blog/Post");
const showPost_1 = require("../controllers/user/showPost");
const update_1 = require("../controllers/blog/update");
const sign_1 = require("../controllers/user/sign");
const All_1 = require("../controllers/blog/All");
const signUp_1 = require("../controllers/user/signUp");
const Profile_1 = require("../controllers/user/Profile");
const __1 = require("..");
const multer_1 = require("../utils/multer/multer");
const Follow_1 = require("../controllers/user/Follow");
const BlogDelete_1 = require("../controllers/blog/BlogDelete");
exports.routes = express_1.default.Router();
exports.routes.post('/All', All_1.All);
exports.routes.post('/signup', multer_1.upload.single("file"), sign_1.SignIn);
exports.routes.post('/post', multer_1.upload.single("file"), Post_1.PostCreate);
exports.routes.post('/sign', signUp_1.Sign);
exports.routes.put('/result/:id', showPost_1.showPost);
exports.routes.get('/AllUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield __1.client.bloger.findMany();
    res.json({ data });
}));
exports.routes.put('/update/:id', update_1.update);
exports.routes.post('/profile', Profile_1.Profile);
exports.routes.post('/follow', Follow_1.Follow);
exports.routes.post('/BlogDelete', BlogDelete_1.BlogDelete);
