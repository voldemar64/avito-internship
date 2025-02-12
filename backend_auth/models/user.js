import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';
import bcrypt from 'bcryptjs';
import AuthError from '../errors/AuthError.js';

const phoneExpression = /^\+7\d{10}$/;
const codeExpression = /^\d{6}$/;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 30,
        default: 'Василий',
    },
    surname: {
        type: String,
        minlength: 2,
        maxlength: 30,
        default: 'Пупкин',
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (email) => isEmail(email),
            message: 'Неверный email',
        },
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    phone: {
        type: String,
        validate: {
            validator: (phone) => phoneExpression.test(phone),
            message: 'Неверный формат телефона. Используйте формат +7**********',
        },
    },
    resetCode: {
        type: String,
        select: false,
        validate: {
            validator: (code) => {
                return code === null || codeExpression.test(code);
            },
            message: 'Код должен содержать ровно 6 цифр.',
        },
    },
    resetCodeExpires: {
        type: Date,
        select: false,
    },
});

userSchema.statics.findUserByCredentials = async function (email, password) {
    const user = await this.findOne({ email }).select('+password');
    if (!user) {
        throw new AuthError('Неправильные почта или пароль');
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
        throw new AuthError('Неправильные почта или пароль');
    }

    return user;
};

export default mongoose.model('user', userSchema);
