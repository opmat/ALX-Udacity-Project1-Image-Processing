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

const logger: winston.Logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: () => {
        return new Date().toLocaleString('en-GB', {
          timeZone: 'Africa/Lagos'
        });
      }
    }),
    winston.format.json()
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
