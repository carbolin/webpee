import winston, { format } from 'winston';

export const logger = winston.createLogger({

  format: format.combine(
    format.timestamp(),
    format.json(),
  ),

  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: './logs/error.json', level: 'error' }),
    new winston.transports.File({ filename: './logs/combined.json' }),
  ],
});
