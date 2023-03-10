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
const sharp_1 = __importDefault(require("sharp"));
const logger_1 = __importDefault(require("./../utilities/logger"));
const resizeImage = (srcImage, destImage, sizeOptions) => __awaiter(void 0, void 0, void 0, function* () {
    let retValue = false;
    try {
        yield (0, sharp_1.default)(srcImage)
            .resize({ height: sizeOptions.height, width: sizeOptions.width })
            .toFile(destImage)
            .then((data) => {
            // generated
            logger_1.default.info(`resizeImage module completed with ${JSON.stringify(data)}`);
            retValue = true;
            return retValue;
        })
            .catch((err) => {
            logger_1.default.error(`resizeImage module failed with ${JSON.stringify(err)}`);
            retValue = false;
            return retValue;
        });
    }
    catch (err) {
        logger_1.default.error(`resizeImage module threw error with ${JSON.stringify(err)}`);
        retValue = false;
        return retValue;
    }
    return retValue;
});
const convertImageFormat = (srcImage, destImage, newFormat) => __awaiter(void 0, void 0, void 0, function* () {
    let retValue = false;
    try {
        yield (0, sharp_1.default)(srcImage)
            .toFormat(newFormat)
            .toFile(destImage)
            .then((data) => {
            // generated
            logger_1.default.info(`convertImage module completed with ${JSON.stringify(data)}`);
            retValue = true;
            return retValue;
        })
            .catch((err) => {
            logger_1.default.error(`convertImage module failed with ${JSON.stringify(err)}`);
            retValue = false;
            return retValue;
        });
        return retValue;
    }
    catch (err) {
        logger_1.default.error(`convertImage module threw error ${JSON.stringify(err)}`);
        retValue = false;
        return retValue;
    }
});
exports.default = {
    resizeImage,
    convertImageFormat
};
