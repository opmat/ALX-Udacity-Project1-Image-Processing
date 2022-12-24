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
const fs_1 = __importDefault(require("fs"));
const imagePreProcessor_1 = __importDefault(require("../utilities/imagePreProcessor"));
const imageProcessor_1 = __importDefault(require("../utilities/imageProcessor"));
const logger_1 = __importDefault(require("../utilities/logger"));
// Convert Image between allowed format
const imageConvert = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const rawImageName = req.params.imageName + '.' + req.params.convertFrom;
    const processedImageName = req.params.imageName + '.' + req.params.convertTo;
    try {
        if (fs_1.default.existsSync(imagePreProcessor_1.default.rawFileDir + processedImageName)) {
            //file exists
            res.locals.rawImageName = imagePreProcessor_1.default.rawFileDir + rawImageName;
            res.locals.processedImageName =
                imagePreProcessor_1.default.rawFileDir + processedImageName;
        }
        else {
            //file does not exist. check if full image exist
            // then convert and save image
            if (fs_1.default.existsSync(imagePreProcessor_1.default.rawFileDir + rawImageName)) {
                res.locals.rawImageName = imagePreProcessor_1.default.rawFileDir + rawImageName;
                const success = imageProcessor_1.default.convertImageFormat(imagePreProcessor_1.default.rawFileDir + rawImageName, imagePreProcessor_1.default.rawFileDir + processedImageName, req.params.convertTo);
                if (yield success) {
                    logger_1.default.info(`imageConvert module in imageCache completed with ${JSON.stringify(success)}`);
                    res.locals.processedImageName =
                        imagePreProcessor_1.default.rawFileDir + processedImageName;
                }
                else {
                    logger_1.default.error(`imageConvert module in imageCache failed with ${JSON.stringify(success)})`);
                }
            }
            else {
                logger_1.default.error(`imageConvert module in imageCache failed with error: raw image not found`);
                res.locals.rawImageName = null;
                res.locals.processedImageName = null;
            }
        }
    }
    catch (err) {
        logger_1.default.info(`imageConvert module in imageCache completed with ${JSON.stringify(err)}`);
    }
    next();
});
// Resize image based on provided parameters
const cacheImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const ext = typeof req.query.format !== 'undefined' && req.query.format
        ? '.' + req.query.format
        : '.jpg';
    const rawImageName = req.params.imageName + ext;
    const processedImageName = imagePreProcessor_1.default.imageNameFormatter(req.params.imageName, req.query);
    try {
        if (fs_1.default.existsSync(imagePreProcessor_1.default.processedFileDir + processedImageName)) {
            //file exists
            res.locals.rawImageName = imagePreProcessor_1.default.rawFileDir + rawImageName;
            res.locals.processedImageName =
                imagePreProcessor_1.default.processedFileDir + processedImageName;
        }
        else {
            //file does not exist. check if full image exist
            // then generate the resized image
            if (fs_1.default.existsSync(imagePreProcessor_1.default.rawFileDir + rawImageName)) {
                res.locals.rawImageName = imagePreProcessor_1.default.rawFileDir + rawImageName;
                //if width and height is not define return the raw file
                if ((typeof req.query.height === 'undefined' ||
                    req.query.height === null) &&
                    (typeof req.query.width === 'undefined' || req.query.width === null)) {
                    res.locals.processedImageName = res.locals.rawImageName;
                }
                else {
                    //generate resized image from raw image
                    let success;
                    if (typeof req.query.height === 'undefined' ||
                        req.query.height === null) {
                        // only width provided
                        success = imageProcessor_1.default.resizeImage(imagePreProcessor_1.default.rawFileDir + rawImageName, imagePreProcessor_1.default.processedFileDir + processedImageName, { width: parseInt(req.query.width) });
                    }
                    else if (typeof req.query.width === 'undefined' ||
                        req.query.width === null) {
                        // only height provided
                        success = imageProcessor_1.default.resizeImage(imagePreProcessor_1.default.rawFileDir + rawImageName, imagePreProcessor_1.default.processedFileDir + processedImageName, { height: parseInt(req.query.height) });
                    }
                    else {
                        // both height and width provided
                        success = imageProcessor_1.default.resizeImage(imagePreProcessor_1.default.rawFileDir + rawImageName, imagePreProcessor_1.default.processedFileDir + processedImageName, {
                            width: parseInt(req.query.width),
                            height: parseInt(req.query.height)
                        });
                    }
                    if (yield success) {
                        logger_1.default.info(`cacheImage module completed with ${JSON.stringify(success)}`);
                        res.locals.processedImageName =
                            imagePreProcessor_1.default.processedFileDir + processedImageName;
                    }
                    else {
                        logger_1.default.info(`cacheImage module failed with ${JSON.stringify(success)}`);
                    }
                }
            }
            else {
                logger_1.default.error(`cacheImage module failed with error: raw image not found`);
                res.locals.rawImageName = null;
                res.locals.processedImageName = null;
            }
        }
    }
    catch (err) {
        logger_1.default.error(`cacheImage module failed with ${JSON.stringify(err)}`);
    }
    next();
});
exports.default = {
    cacheImage,
    imageConvert
};
