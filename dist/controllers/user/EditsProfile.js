"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditsProfile = void 0;
const __1 = require("../..");
const redis_1 = __importDefault(require("../../utils/redis/redis"));
const EditsProfile = async (req, res) => {
    const id = req.header("authorization");
    const user = req.body;
    try {
        if (id) {
            await __1.client.bloger.update({
                where: {
                    id: Number(id),
                },
                data: {
                    name: user.name,
                    img: user.avtar
                },
            });
            await redis_1.default.del("User");
            return res.json({ success: true });
        }
        // } else {
        //     if (id) {
        //         const data = await client.bloger.findFirst({
        //             where: {
        //                 id: Number(id),
        //             },
        //             select: {
        //                 img: true,
        //             },
        //         });
        //         if (data && data.img) {
        //             const filePath = path.resolve(
        //                 `dist/uploads/${data.img.split("/uploads/")[1]}`
        //             );
        //             if (fs.existsSync(filePath)) {
        //                 fs.unlinkSync(filePath);
        //             } else {
        //                 console.log("File not found");
        //             }
        //             await client.bloger.update({
        //                 where: {
        //                     id: Number(id),
        //                 },
        //                 data: {
        //                     name: user.name,
        //                     img: `/uploads/${req.file.filename}`,
        //                 },
        //             });
        //             return res.json({ success: true });
        //         }
        //     }
        // }
        else {
            return res.json({ success: false, message: "login plz" });
        }
    }
    catch (error) {
        console.log(error);
        return res.json({ success: false });
    }
};
exports.EditsProfile = EditsProfile;
