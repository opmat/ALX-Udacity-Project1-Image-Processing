"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const imagePreProcessor_1 = __importDefault(require("../utilities/imagePreProcessor"));
const logger_1 = __importDefault(require("../utilities/logger"));
/**
 * Image upload Parts
 *
 */
const imageStorage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, './images/original');
    },
    filename: (_req, file, cb) => {
        const ext = path_1.default.extname(file.originalname).substring(1);
        let newFileName = path_1.default.parse(file.originalname).name;
        newFileName = newFileName.replace(' ', '-') + `.${ext}`;
        cb(null, newFileName);
    }
});
const imageUploader = (0, multer_1.default)({
    storage: imageStorage,
    fileFilter: (_req, file, cb) => {
        const ext = path_1.default.extname(file.originalname).substring(1);
        if (!imagePreProcessor_1.default.isValidInputImageFormat(ext)) {
            // if file type is not a valid image format, return error
            logger_1.default.error(`imageUploader module completed with invalid format error`);
            return cb(new Error('Invalid image file uploaded'));
        }
        cb(null, true);
    }
});
const uploadSingleImage = imageUploader.single('image');
exports.default = {
    imageUploader,
    uploadSingleImage
};
