import "./Register.css";
import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useFormWithValidation } from "../../utils/formValidator";

function Login({ submit, loggedIn }) {
  const validateEmail = (email) => {
    if (!email) return "Введите адрес электронной почты.";
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? ""
      : "Введите корректный адрес электронной почты.";
  };

  const validatePhone = (phone) => {
    if (!phone) return "Введите номер телефона.";
    const phoneRegex = /^\+7\d{10}$/; // Проверка на +7 и ровно 10 цифр
    return phoneRegex.test(phone)
      ? ""
      : "Введите номер телефона в формате +7XXXXXXXXXX.";
  };

  const validateConfirmPassword = (confirmPassword, values) => {
    if (!confirmPassword) return "Введите подтверждение пароля.";
    return confirmPassword === values.password ? "" : "Пароли не совпадают.";
  };

  const { values, errors, handleChange, isValid } = useFormWithValidation({
    email: validateEmail,
    phone: validatePhone,
    confirmPassword: (confirmPassword) =>
      validateConfirmPassword(confirmPassword, values),
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      submit(
        values.name,
        values.surname,
        values.phone,
        values.email,
        values.password,
      );
    }
  }

  return !loggedIn ? (
    <section className="register register_type_big">
      <Link className="register__logo" to="/"></Link>
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__form" onSubmit={handleSubmit}>
        <div className="register__columns">
          <div className="register__column">
            <h3 className="register__column-title">О вас:</h3>
            <div className="register__container">
              <label className="register__label">Имя</label>
              <input
                name="name"
                required
                type="text"
                className="register__input"
                onChange={handleChange}
              />
            </div>
            <div className="register__container">
              <label className="register__label">Фамилия</label>
              <input
                name="surname"
                required
                type="text"
                className="register__input"
                onChange={handleChange}
              />
            </div>
            <div className="register__container">
              <label className="register__label">Телефон</label>
              <input
                name="phone"
                required
                type="tel"
                className="register__input"
                onChange={handleChange}
              />
              {errors.phone && (
                <span className="register__error">{errors.phone}</span>
              )}
            </div>
          </div>
          <div className="register__column">
            <h3 className="register__column-title">Учётные данные:</h3>
            <div className="register__container">
              <label className="register__label">E-mail</label>
              <input
                name="email"
                required
                type="email"
                className="register__input"
                onChange={handleChange}
              />
              {errors.email && (
                <span className="register__error">{errors.email}</span>
              )}
            </div>
            <div className="register__container">
              <label className="register__label">Пароль</label>
              <input
                name="password"
                required
                type="password"
                className="register__input"
                onChange={handleChange}
              />
            </div>
            <div className="register__container">
              <label className="register__label">Повторить пароль</label>
              <input
                name="confirmPassword"
                required
                type="password"
                className="register__input"
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <span className="register__error">
                  {errors.confirmPassword}
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          className={`register__button${!isValid ? " register__button_disabled" : ""}`}
          type="submit"
          disabled={!isValid}
        >
          Зарегистрироваться
        </button>
      </form>
      <p className="register__text">
        Уже зарегистрированы?
        <Link to="/signin" className="register__link">
          Войти
        </Link>
      </p>
    </section>
  ) : (
    <Navigate to="/" />
  );
}

export default Login;
