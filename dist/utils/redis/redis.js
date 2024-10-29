"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const RedisApi = (0, redis_1.createClient)({
    url: process.env.REDIS_URL
});
RedisApi.connect().then(() => {
    console.log("redis connect");
}).catch((error) => {
    console.log("error: " + error);
});
RedisApi.on("error", (error) => {
    console.log("error: " + error);
});
exports.default = RedisApi;
