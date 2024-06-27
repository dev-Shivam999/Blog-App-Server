"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
var storage = multer_1.default.diskStorage({
    destination: path_1.default.join(__dirname, '../../uploads'),
    filename: function (req, file, cb) {
        cb(null, "".concat(Date.now() + file.originalname));
    }
});
exports.upload = (0, multer_1.default)({ storage: storage });
//# sourceMappingURL=multer.js.map