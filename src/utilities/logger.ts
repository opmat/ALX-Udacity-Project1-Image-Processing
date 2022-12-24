import * as winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const errorTransport: DailyRotateFile = new DailyRotateFile({
  filename: 'error-%DATE%.log',
  dirname: './logs',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '10m',
  maxFiles: '14d'
});
const transport: DailyRotateFile = new DailyRotateFile({
  filename: 'combined-%DATE%.log',
  dirname: './logs',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '10m',
  maxFiles: '14d'
});

// const myFormat = winston.format.printf(
//   ({ level, message, label, timestamp }) => {
//     return `${timestamp} [${label}] ${level}: ${message}`;
//   }
// );

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json() //,
    // myFormat
  ),
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

export default logger;
