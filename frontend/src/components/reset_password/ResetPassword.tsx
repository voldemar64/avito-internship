import "../register/Register.css";
import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useFormWithValidation } from "../../utils/formValidator";

// Типизация пропсов компонента
interface ResetPasswordProps {
  submit: (email: string, password: string, code: string) => void;
  sendCode: (email: string) => void;
  loggedIn: boolean;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ submit, sendCode, loggedIn }) => {
  const [isCodeSent, setIsCodeSent] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(60);
  const [isCountingDown, setIsCountingDown] = useState<boolean>(false);

  const validateEmail = (email: string) => {
    if (!email) return "Введите адрес электронной почты.";
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ? ""
        : "Введите корректный адрес электронной почты.";
  };

  const validateCode = (code: string) => {
    if (!code) return "Введите код.";
    return /^\d{6}$/.test(code) ? "" : "Код должен состоять из 6 цифр.";
  };

  const validateConfirmPassword = (confirmPassword: string, values: any) => {
    if (!confirmPassword) return "Введите подтверждение пароля.";
    return confirmPassword === values.password ? "" : "Пароли не совпадают.";
  };

  const { values, errors, handleChange, isValid } = useFormWithValidation({
    email: validateEmail,
    code: validateCode,
    confirmPassword: (confirmPassword: string) =>
        validateConfirmPassword(confirmPassword, values),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      submit(values.email, values.password, values.code);
    }
  };

  const handleSendCode = () => {
    if (values.email && !errors.email) {
      sendCode(values.email);
      setIsCodeSent(true);
      setIsCountingDown(true);
      setTimer(59);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
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
        <Link className="register__logo" to="/" />
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
                      className={`register__button_code${isCodeSent || !values.email || errors.email ? " register__button_disabled" : ""}`}
                      onClick={handleSendCode}
                      disabled={isCodeSent || Boolean(!values.email) || Boolean(errors.email)}
                  >
                    {isCountingDown
                        ? `00:${timer < 10 ? `0${timer}` : timer}`
                        : "Получить код"}
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
};

export default ResetPassword;
