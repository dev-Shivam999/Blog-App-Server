"use strict";
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
const Follow_1 = require("../controllers/user/Follow");
const BlogDelete_1 = require("../controllers/blog/BlogDelete");
const Like_1 = require("../controllers/blog/Like");
const EditsProfile_1 = require("../controllers/user/EditsProfile");
const Chat_1 = require("../controllers/user/Chat");
exports.routes = express_1.default.Router();
exports.routes.post('/All', All_1.All);
exports.routes.post('/signup', sign_1.SignIn);
exports.routes.post('/post', Post_1.PostCreate);
exports.routes.post('/sign', signUp_1.Sign);
exports.routes.put('/result/:id', showPost_1.showPost);
exports.routes.get('/AllUser', async (req, res) => {
    const data = await __1.client.bloger.findMany({
        where: {
            id: 1
        },
        select: {
            blogs: true
        }
    });
    res.json({ data: data ? data : "lol" });
});
exports.routes.put('/update/:id', update_1.update);
exports.routes.post('/profile', Profile_1.Profile);
exports.routes.post('/EditsProfile', EditsProfile_1.EditsProfile);
exports.routes.post('/follow', Follow_1.Follow);
exports.routes.post('/BlogDelete', BlogDelete_1.BlogDelete);
exports.routes.post('/Link', Like_1.LikeCount);
exports.routes.post('/Chat', Chat_1.Chat);
