"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: path_1.default.join(__dirname, '../../uploads'),
    filename: (req, file, cb) => {
        cb(null, `${Date.now() + file.originalname}`);
    }
});
exports.upload = (0, multer_1.default)({ storage: storage });
