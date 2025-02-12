import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import User from '../models/user.js';
import ValidationError from '../errors/ValidationError.js';
import NotFound from '../errors/NotFound.js';
import ConflictError from '../errors/ConflictError.js';

const { JWT_SECRET, NODE_ENV } = process.env;

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findUserByCredentials(email, password);
        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
          { expiresIn: '7d' }
        );
        res.send({ token });
    } catch (err) {
        next(err);
    }
};

const sendCode = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw new ValidationError('Некорректный email.');
        }

        const user = await User.findOne({ email });

        if (!user) {
            throw new NotFound('Пользователь с указанным email не найден.');
        }

        const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expirationTime = new Date(Date.now() + 10 * 60 * 1000);

        user.resetCode = resetCode;
        user.resetCodeExpires = expirationTime;
        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Сброс пароля',
            text: `Ваш код для сброса пароля: ${resetCode}. Он действителен в течение 5 минут.`,
        });

        res.status(200).send({
            email: user.email,
            name: user.name,
            surname: user.surname,
            phone: user.phone,
            _id: user._id,
        });
    } catch (err) {
        next(err);
    }
};

const resetPassword = async (req, res, next) => {
    try {
        const { email, password, code } = req.body;

        const user = await User.findOne({ email }).select('+resetCode +resetCodeExpires');
        if (!user) {
            throw new NotFound('Пользователь с указанным email не найден.');
        }

        if (user.resetCode !== code || Date.now() > user.resetCodeExpires) {
            throw new ValidationError('Неверный или истекший код подтверждения.');
        }

        user.password = await bcrypt.hash(password, 10);
        user.resetCode = null;
        user.resetCodeExpires = null;
        await user.save();

        res.status(201).send({
            email: user.email,
            name: user.name,
            surname: user.surname,
            phone: user.phone,
            _id: user._id,
        });
    } catch (err) {
        if (err.name === 'ValidationError' || err.name === 'CastError') {
            next(new ValidationError(err.message));
        } else if (err.code === 11000) {
            next(new ConflictError('Введите другой email.'));
        } else {
            next(err);
        }
    }
};


const getUsers = async (req, res, next) => {
    try {
        const users = await User.find({});
        res.send({ users });
    } catch (err) {
        next(err);
    }
};

const getCurrentUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            throw new NotFound('Пользователь по указанному _id не найден.');
        }
        res.send({
            email: user.email,
            name: user.name,
            surname: user.surname,
            phone: user.phone,
            _id: user._id,
        });
    } catch (err) {
        if (err.name === 'CastError') {
            next(new ValidationError('Передан некорректный _id пользователя.'));
        } else {
            next(err);
        }
    }
};

const getUser = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user) {
            throw new NotFound('Пользователь по указанному _id не найден.');
        }
        res.send({
            email: user.email,
            name: user.name,
            surname: user.surname,
            phone: user.phone,
            _id: user._id,
        });
    } catch (err) {
        if (err.name === 'CastError') {
            next(new ValidationError('Передан некорректный _id пользователя.'));
        } else {
            next(err);
        }
    }
};

const createUser = async (req, res, next) => {
    try {
        const { name, surname, phone, email, password } = req.body;
        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            surname,
            phone,
            email,
            password: hash,
        });
        res.status(201).send({
            email: user.email,
            name: user.name,
            surname: user.surname,
            phone: user.phone,
            _id: user._id,
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            next(new ValidationError('Переданы некорректные данные при создании пользователя.'));
        } else if (err.code === 11000) {
            next(new ConflictError('Пользователь с таким email уже существует'));
        } else {
            next(err);
        }
    }
};

const patchUser = async (req, res, next) => {
    try {
        const ownerId = req.user._id;
        const { name, surname, email, phone } = req.body;
        const user = await User.findByIdAndUpdate(
          ownerId,
          { name, surname, email, phone },
          { new: true, runValidators: true }
        );
        if (!user) {
            throw new NotFound('Пользователь с указанным _id не найден.');
        }
        res.send({ user });
    } catch (err) {
        if (err.name === 'ValidationError' || err.name === 'CastError') {
            next(new ValidationError('Переданы некорректные данные при обновлении профиля.'));
        } else {
            next(err);
        }
    }
};

export default {
    login,
    sendCode,
    resetPassword,
    getUsers,
    getCurrentUser,
    getUser,
    createUser,
    patchUser,
};
