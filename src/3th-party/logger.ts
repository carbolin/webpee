import winston, { format } from 'winston';

export const logger = winston.createLogger({

  transports: [
    new winston.transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple(),
      ),
    }),
    new winston.transports.File({
      filename: './logs/error.json',
      level: 'error',
      format: format.combine(
        format.timestamp(),
        format.json(),
      ),
    }),
    new winston.transports.File({
      filename: './logs/combined.json',
      format: format.combine(
        format.timestamp(),
        format.json(),
      ),
    }),
  ],
});
