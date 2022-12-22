"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const imageFile_1 = __importDefault(require("./../../utilities/imageFile"));
describe('file validity test suites', () => {
    it('checks if image file exists', () => {
    });
    it('checks if input image type is valid', () => {
        imageFile_1.default.isValidImageFormat('');
    });
    it('checks if output image type is valid', () => {
    });
});
