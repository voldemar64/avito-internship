import winston from "winston";
import expressWinston from "express-winston";
import DailyRotateFile from "winston-daily-rotate-file";

// Транспорт для запросов с ротацией логов
const requestTransport = new DailyRotateFile({
  filename: "logs/request-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxFiles: "14d", // Хранить логи 14 дней
});

// Транспорт для ошибок с ротацией логов
const errorTransport = new DailyRotateFile({
  filename: "logs/error-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxFiles: "14d",
});

// Транспорт для консоли (в режиме разработки)
const consoleTransport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple(),
  ),
});

const requestLogger = expressWinston.logger({
  transports: [
    requestTransport,
    consoleTransport, // Логи запросов в консоль для разработки
  ],
  format: winston.format.json(),
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    errorTransport,
    consoleTransport, // Логи ошибок в консоль для разработки
  ],
  format: winston.format.json(),
});

// Настройка общего логгера для критических ошибок и прочих уровней
const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

export default {
  requestLogger,
  errorLogger,
  logger,
};
