import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { errors } from 'celebrate';
import auth from '../backend_auth/middlewares/auth.js';
import logger from '../backend_auth/middlewares/logger.js';
import corsMiddleware from '../backend_auth/middlewares/cors.js';
import errorHandler from "../backend_auth/middlewares/errors.js";
import itemsRoutes from './routes/items.js';
import NotFound from '../backend_auth/errors/NotFound.js';

const PORT = process.env.PORT || 8080;
const app = express();

// Логгеры для запросов и ошибок
const { requestLogger, errorLogger } = logger;

// Middleware для обработки JSON и URL-кодированных данных
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(corsMiddleware);

// Логирование запросов и ошибок
app.use(requestLogger);
app.use(errorLogger);

// Защищенные маршруты
app.use(auth);
app.use('/items', itemsRoutes);

// Обработка ошибок
app.use(errorLogger);
app.use('*', (_req, res, next) => {
    next(new NotFound('Страница не найдена'));
});
app.use(errors());
app.use(errorHandler);

// Подключение к базе данных
(async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/avitointernshipdb');
        logger.logger.info('База данных подключена');
    } catch (err) {
        logger.logger.error(`Ошибка подключения к базе данных: ${err.message}`);
        process.exit(1);
    }
})();

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
