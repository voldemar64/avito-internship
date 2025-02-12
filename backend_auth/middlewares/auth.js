const { JWT_SECRET, NODE_ENV } = process.env;
import jwt from 'jsonwebtoken';
import AuthError from '../errors/AuthError.js';
import Logger from './logger.js';

const { logger } = Logger;

// Функция для получения JWT ключа
const getJwtSecret = () => (NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');

export default (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        logger.warn('Auth: Отсутствует или некорректный заголовок Authorization');
        throw new AuthError('Необходима авторизация');
    }

    const token = authorization.replace('Bearer ', '');
    let payload;

    try {
        payload = jwt.verify(token, getJwtSecret());
    } catch (err) {
        logger.error(`Auth: Ошибка проверки токена - ${err.message}`);
        if (err.name === 'TokenExpiredError') {
            throw new AuthError('Токен истёк. Пожалуйста, выполните вход заново.');
        }
        throw new AuthError('Необходима авторизация');
    }

    req.user = payload;

    logger.info(`Auth: Пользователь ${payload._id} успешно аутентифицирован`);
    next();
};
