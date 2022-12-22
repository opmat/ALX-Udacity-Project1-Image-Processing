"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import {promise as fs} from fs;
const glob_1 = __importDefault(require("glob"));
const validInputImageFormat = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif', 'tiff', 'svg'];
const validOutputImageFormat = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif', 'tiff'];
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
    (Object.keys(options)).forEach((opt) => {
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
    // (Object.keys(options) as Array<keyof ImageOptions>).forEach((option) => {
    //     newName += imgOptionShortname[option]
    // })
    // options.forEach((option) => {
    //     newName = imgOptionShortname[option]
    //     console.log(`There are ${options[option]} ${option}`);
    // });
    extension = extension == '' ? '.jpg' : '.' + extension;
    return newName + extension;
};
const getImage = (sourceDir, imageName) => {
    return '';
};
const getAllImages = (searchDir, imageType = '*') => {
    return glob_1.default.sync(`${searchDir}/*.${imageType}`);
    ;
};
exports.default = {
    isValidInputImageFormat,
    isValidOutputImageFormat,
    getImage,
    getAllImages,
    imageNameFormatter,
    rawFileDir,
    processedFileDir,
    thumbsFileDir,
    imageNotFound
};
