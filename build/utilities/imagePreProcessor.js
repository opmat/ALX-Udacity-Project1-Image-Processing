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
// import {promise as fs} from fs;
const glob_1 = __importDefault(require("glob"));
const path_1 = __importDefault(require("path"));
const validInputImageFormat = [
    'jpg',
    'jpeg',
    'png',
    'webp',
    'gif',
    'avif',
    'tiff',
    'svg'
];
const validOutputImageFormat = [
    'jpg',
    'jpeg',
    'png',
    'webp',
    'gif',
    'avif',
    'tiff'
];
const rawFileDir = './images/original/';
const processedFileDir = './images/refined/';
const thumbsFileDir = './images/thumbs/';
const imageNotFound = './images/original/notfound.jpg';
const isValidInputImageFormat = (imageFormat) => {
    return validInputImageFormat.includes(imageFormat);
};
const isValidOutputImageFormat = (imageFormat) => {
    return validOutputImageFormat.includes(imageFormat);
};
const imageNameFormatter = (imageName, options) => {
    let extension = 'jpg';
    let newName = imageName;
    Object.keys(options).forEach((opt) => {
        if (opt === 'width') {
            newName += '_w' + options[opt];
        }
        if (opt === 'height') {
            newName += '_h' + options[opt];
        }
        if (opt === 'format') {
            extension = options[opt];
        }
    });
    extension = extension == '' ? '.jpg' : '.' + extension;
    return newName + extension;
};
const getAllImagesSync = (searchDir, imageType = '*') => {
    const imgList = [];
    const files = glob_1.default.sync(`${searchDir}/*.${imageType}`);
    files.forEach((ifile) => {
        imgList.push({
            name: path_1.default.parse(ifile).name,
            ext: path_1.default.extname(ifile).substring(1),
            dir: path_1.default.parse(ifile).dir + '/'
        });
        // console.log(imgList)
    });
    return imgList;
};
const getAllImages = (searchDir, imageType = '*') => __awaiter(void 0, void 0, void 0, function* () {
    const imgList = [];
    yield (0, glob_1.default)(`${searchDir}/*.${imageType}`, (err, files) => {
        if (err) {
            console.log(err);
        }
        else {
            files.forEach((ifile) => {
                imgList.push({
                    name: path_1.default.parse(ifile).name,
                    ext: path_1.default.parse(ifile).ext,
                    dir: path_1.default.parse(ifile).dir + '/'
                });
                console.log(imgList);
            });
        }
        return imgList;
    });
    return imgList;
});
const convertSizes = (size) => {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (size === 0) {
        return 'n/a';
    }
    const i = Math.min(Math.floor(Math.log(size) / Math.log(1024)), units.length - 1);
    if (i === 0) {
        return `${size}${units[i]}`;
    }
    return `${(size / 1024 ** i).toFixed(2)}${units[i]}`;
};
exports.default = {
    isValidInputImageFormat,
    isValidOutputImageFormat,
    getAllImages,
    getAllImagesSync,
    imageNameFormatter,
    convertSizes,
    rawFileDir,
    processedFileDir,
    thumbsFileDir,
    imageNotFound
};
