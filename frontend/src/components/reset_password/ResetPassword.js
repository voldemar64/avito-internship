import "../register/Register.css";
import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useFormWithValidation } from "../../utils/formValidator";

function ResetPassword({ submit, sendCode, loggedIn }) {
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [timer, setTimer] = useState(60);
    const [isCountingDown, setIsCountingDown] = useState(false);

    const validateEmail = (email) => {
        if (!email) return "Введите адрес электронной почты.";
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
            ? ""
            : "Введите корректный адрес электронной почты.";
    };

    const validateCode = (code) => {
        if (!code) return "Введите код.";
        return /^\d{6}$/.test(code) ? "" : "Код должен состоять из 6 цифр.";
    };

    const validateConfirmPassword = (confirmPassword, values) => {
        if (!confirmPassword) return "Введите подтверждение пароля.";
        return confirmPassword === values.password ? "" : "Пароли не совпадают.";
    };

    const { values, errors, handleChange, isValid } = useFormWithValidation({
        email: validateEmail,
        code: validateCode,
        confirmPassword: (confirmPassword) =>
            validateConfirmPassword(confirmPassword, values),
    });

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Тип данных кода:", typeof values.code, values.code);

        if (isValid) {
            submit(values.email, values.password, values.code);
        }
    }

    function handleSendCode() {
        if (values.email && !errors.email) {
            sendCode(values.email);
            setIsCodeSent(true);
            setIsCountingDown(true);
            setTimer(59);
        }
    }

    useEffect(() => {
        let interval;
        if (isCountingDown && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            setIsCountingDown(false);
            setIsCodeSent(false);
        }
        return () => clearInterval(interval);
    }, [isCountingDown, timer]);

    return !loggedIn ? (
        <section className="register">
            <Link className="register__logo" to="/"></Link>
            <h2 className="register__title">Восстановление пароля</h2>
            <form className="register__form" onSubmit={handleSubmit}>
                <div className="register__columns">
                    <div className="register__column">
                        <div className="register__container">
                            <label className="register__label">E-mail</label>
                            <div className="register__input-wrapper">
                                <input
                                    name="email"
                                    required
                                    type="email"
                                    className="register__input"
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    className={`register__button_code${(isCodeSent || !values.email || errors.email) ? " register__button_disabled" : ""}`}
                                    onClick={handleSendCode}
                                    disabled={isCodeSent || !values.email || errors.email}
                                >
                                    {isCountingDown ? `00:${timer < 10 ? `0${timer}` : timer}` : "Получить код"}
                                </button>
                            </div>
                            {errors.email && (
                                <span className="register__error">{errors.email}</span>
                            )}
                        </div>
                        <div className="register__container">
                            <label className="register__label">Код подтверждения</label>
                            <input
                                name="code"
                                required
                                type="text"
                                className="register__input"
                                onChange={handleChange}
                            />
                            {errors.code && (
                                <span className="register__error">{errors.code}</span>
                            )}
                        </div>
                        <div className="register__container">
                            <label className="register__label">Новый пароль</label>
                            <input
                                name="password"
                                required
                                type="password"
                                className="register__input"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="register__container">
                            <label className="register__label">Подтвердите пароль</label>
                            <input
                                name="confirmPassword"
                                required
                                type="password"
                                className="register__input"
                                onChange={handleChange}
                            />
                            {errors.confirmPassword && (
                                <span className="register__error">{errors.confirmPassword}</span>
                            )}
                        </div>
                    </div>
                </div>

                <button
                    className={`register__button register__button_type_big${!isValid ? " register__button_disabled" : ""}`}
                    type="submit"
                    disabled={!isValid}
                >
                    Изменить пароль
                </button>
            </form>
            <p className="register__text">
                Вспомнили пароль?{" "}
                <Link to="/signin" className="register__link">
                    Войти
                </Link>
            </p>
        </section>
    ) : (
        <Navigate to="/" />
    );
}

export default ResetPassword;
