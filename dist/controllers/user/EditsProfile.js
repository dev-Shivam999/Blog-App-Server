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
exports.EditsProfile = void 0;
const __1 = require("../..");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const EditsProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.header("authorization");
    const user = req.body;
    try {
        if (!req.file) {
            if (id) {
                yield __1.client.bloger.update({
                    where: {
                        id: Number(id),
                    },
                    data: {
                        name: user.name,
                    },
                });
                return res.json({ success: true });
            }
        }
        else {
            if (id) {
                const data = yield __1.client.bloger.findFirst({
                    where: {
                        id: Number(id),
                    },
                    select: {
                        img: true,
                    },
                });
                if (data && data.img) {
                    const filePath = path_1.default.resolve(`dist/uploads/${data.img.split("/uploads/")[1]}`);
                    if (fs_1.default.existsSync(filePath)) {
                        fs_1.default.unlinkSync(filePath);
                    }
                    else {
                        console.log("File not found");
                    }
                    yield __1.client.bloger.update({
                        where: {
                            id: Number(id),
                        },
                        data: {
                            name: user.name,
                            img: `/uploads/${req.file.filename}`,
                        },
                    });
                    return res.json({ success: true });
                }
            }
        }
    }
    catch (error) {
        console.log(error);
        return res.json({ success: false });
    }
});
exports.EditsProfile = EditsProfile;
