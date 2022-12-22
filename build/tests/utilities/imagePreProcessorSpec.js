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
    it('checks if image file exists', () => {
    });
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
    it('expects default image file name to be returned if file does not exist', () => {
    });
});
describe('directory accessibility test suite', () => {
    it('checks if input directory is accessible', () => {
    });
    it('checks if output directory is accessible and writable', () => {
    });
});
