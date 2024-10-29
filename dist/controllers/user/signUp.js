"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sign = void 0;
const __1 = require("../..");
const Sign = async (req, res) => {
    const body = req.body;
    try {
        const user = await __1.client.bloger.findFirst({
            where: {
                email: body.email,
            }
        });
        if (user) {
            if (user.password = body.password) {
                return res.json({ success: true, message: user.id });
            }
            else {
                return res.json({ success: false, message: "password not match" });
            }
        }
        return res.json({ success: false, message: 'user not found' });
    }
    catch (error) {
        console.log("error", error);
        res.json({ success: false, message: "success failed" });
    }
};
exports.Sign = Sign;
