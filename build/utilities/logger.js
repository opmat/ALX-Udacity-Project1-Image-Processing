"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston = __importStar(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const errorTransport = new winston_daily_rotate_file_1.default({
    filename: 'error-%DATE%.log',
    dirname: './logs',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '10m',
    maxFiles: '14d'
});
const transport = new winston_daily_rotate_file_1.default({
    filename: 'combined-%DATE%.log',
    dirname: './logs',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '10m',
    maxFiles: '14d'
});
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(winston.format.timestamp({
        format: () => {
            return new Date().toLocaleString('en-GB', {
                timeZone: 'Africa/Lagos'
            });
        }
    }), winston.format.json()),
    transports: [
        new winston.transports.File({
            filename: './logs/error.log',
            level: 'error'
        }),
        new winston.transports.File({ filename: './logs/combined.log' })
    ]
});
errorTransport.on('rotate', (oldFilename, newFilename) => {
    logger.info(`rotating ${newFilename} to ${oldFilename}`);
});
transport.on('rotate', (oldFilename, newFilename) => {
    logger.info(`rotating ${newFilename} to ${oldFilename}`);
});
exports.default = logger;
