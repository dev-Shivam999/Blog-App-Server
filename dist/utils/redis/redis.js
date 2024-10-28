"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redis_1 = require("redis");
var RedisApi = (0, redis_1.createClient)({
    url: process.env.REDIS_URL
});
RedisApi.connect().then(function () {
    console.log("redis connect");
}).catch(function (error) {
    console.log("error: " + error);
});
RedisApi.on("error", function (error) {
    console.log("error: " + error);
});
exports.default = RedisApi;
//# sourceMappingURL=redis.js.map