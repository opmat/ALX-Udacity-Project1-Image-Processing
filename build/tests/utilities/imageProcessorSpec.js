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
const imageProcessor_1 = __importDefault(require("../../utilities/imageProcessor"));
const path_1 = __importDefault(require("path"));
describe('Image Resizing test Suite', () => {
    const rawFilePath = path_1.default.join(__dirname, '../../../images/original/palmtunnel.jpg');
    it('should return true for positive height and width resizing values', () => __awaiter(void 0, void 0, void 0, function* () {
        const newFilePath = path_1.default.join(__dirname, '../../../images/refined/palmtunnel_w840_h540.jpg');
        const result = yield imageProcessor_1.default.resizeImage(rawFilePath, newFilePath, {
            height: 540,
            width: 840
        });
        expect(result).toBeTrue();
    }));
    it('should return true for implied undefined height and/or width resizing values', () => __awaiter(void 0, void 0, void 0, function* () {
        const newFilePath = path_1.default.join(__dirname, '../../../images/refined/palmtunnel_w840.jpg');
        const result = yield imageProcessor_1.default.resizeImage(rawFilePath, newFilePath, {
            width: 840
        });
        expect(result).toBeTrue();
    }));
    it('should return true for explicit undefined height and/or width resizing values', () => __awaiter(void 0, void 0, void 0, function* () {
        const newFilePath = path_1.default.join(__dirname, '../../../images/refined/palmtunnel_w1020.jpg');
        const result = yield imageProcessor_1.default.resizeImage(rawFilePath, newFilePath, {
            height: undefined,
            width: 1020
        });
        expect(result).toBeTrue();
    }));
    it('should return true for negative height and/or width resizing values', () => __awaiter(void 0, void 0, void 0, function* () {
        const newFilePath = path_1.default.join(__dirname, '../../../images/refined/palmtunnel_w830_h-200.jpg');
        const resizer = yield imageProcessor_1.default.resizeImage(rawFilePath, newFilePath, {
            height: -200,
            width: 830
        });
        expect(resizer).toBeFalse();
    }));
    it('should return true for zero height and/or width resizing values', () => __awaiter(void 0, void 0, void 0, function* () {
        const newFilePath = path_1.default.join(__dirname, '../../../images/refined/palmtunnel_w830_h0.jpg');
        const resizer = yield imageProcessor_1.default.resizeImage(rawFilePath, newFilePath, {
            height: 0,
            width: 830
        });
        expect(resizer).toBeFalse();
    }));
});
describe('Image Conversion test Suite', () => {
    const rawFilePath = path_1.default.join(__dirname, '../../../images/original/parks-mountains.png');
    it('should return true for support file format conversion', () => __awaiter(void 0, void 0, void 0, function* () {
        const newFilePath = path_1.default.join(__dirname, '../../../images/refined/parks-mountains.jpg');
        const newFormat = 'jpg';
        const result = yield imageProcessor_1.default.convertImageFormat(rawFilePath, newFilePath, newFormat);
        expect(result).toBeTrue();
    }));
    it('should return false for unsupported file format conversion', () => __awaiter(void 0, void 0, void 0, function* () {
        const newFilePath = path_1.default.join(__dirname, '../../../images/refined/parks-mountains.svg');
        const newFormat = 'svg';
        const result = yield imageProcessor_1.default.convertImageFormat(rawFilePath, newFilePath, newFormat);
        expect(result).toBeFalse();
    }));
});
