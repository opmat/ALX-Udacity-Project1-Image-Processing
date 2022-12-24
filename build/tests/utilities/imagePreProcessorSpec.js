"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const imagePreProcessor_1 = __importDefault(require("../../utilities/imagePreProcessor"));
describe('file validity test suites', () => {
    const inputImage = 'fjord';
    const width = 0;
    const height = 0;
    const inputImageType = 'jpg';
    const outputImageType = 'jpg';
    const wrongOutputImageType = 'svg';
    it('checks if input image type is valid', () => {
        const isValid = imagePreProcessor_1.default.isValidInputImageFormat(inputImageType);
        expect(isValid).toBeTruthy();
    });
    it('checks if output image type is valid', () => {
        const isValid = imagePreProcessor_1.default.isValidOutputImageFormat(outputImageType);
        expect(isValid).toBeTruthy();
    });
    it('confirms wrong output image format will be rejected', () => {
        const isValid = imagePreProcessor_1.default.isValidOutputImageFormat(wrongOutputImageType);
        expect(isValid).toBeFalse();
    });
    it('expects default image file name to be returned if file does not exist', () => { });
});
describe('file property test', () => {
    it('checks if file size conversion is correct', () => {
        expect(imagePreProcessor_1.default.convertSizes(3613944)).toBe('3.45MB');
    });
    it('checks if processed image name is correctly generated using default filetype', () => {
        expect(imagePreProcessor_1.default.imageNameFormatter('testImg', {})).toEqual('testImg.jpg');
    });
    it('checks if processed image name will not generate with default filetype', () => {
        expect(imagePreProcessor_1.default.imageNameFormatter('testImg', { format: 'png' })).not.toEqual('testImg.jpg');
    });
});
describe('Image Retrieval test Suite', () => {
    it('should retrieve more than 1 image file', () => {
        expect(imagePreProcessor_1.default.getAllImagesSync(imagePreProcessor_1.default.rawFileDir).length).toBeGreaterThan(1);
    });
    it('should not return any image for invalid directory', () => {
        expect(imagePreProcessor_1.default.getAllImagesSync('./images/craft').length).toBeFalsy();
    });
});
