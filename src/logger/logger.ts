import expressWinston from 'express-winston';
import winston from 'winston';

const format = winston.format.combine(
  winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss:ms'}),
  winston.format.printf(info => `${info.timestamp}: ${info.message}`),
  winston.format.colorize()
);

const transports = [
  new winston.transports.Console(), // new winston.transports.File({filename: 'combined.log'}),
];

export const logger = winston.createLogger({
  level: 'info',
  format,
  transports,
});

export const expressLogger = expressWinston.logger(logger);
