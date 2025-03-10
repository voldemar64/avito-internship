import "./Profile.css";
import React, { useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../utils/formValidator";

interface ProfileProps {
  onSubmit: (data: {
    name: string;
    surname: string;
    email: string;
    phone: string;
  }) => void;
  signOut: () => void;
}

const Profile: React.FC<ProfileProps> = ({ onSubmit, signOut }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const [disabledForm, setDisabledForm] = React.useState(true);

  const validateName = (name: string) => {
    if (!name) return "Введите имя.";
    return "";
  };

  const validateSurname = (surname: string) => {
    if (!surname) return "Введите фамилию.";
    return "";
  };

  const validateEmail = (email: string) => {
    if (!email) return "Введите адрес электронной почты.";
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ? ""
        : "Введите корректный адрес электронной почты.";
  };

  const validatePhone = (phone: string) => {
    if (!phone) return "Введите номер телефона.";
    const phoneRegex = /^8\d{10}$/;
    return phoneRegex.test(phone)
        ? ""
        : "Введите номер телефона в формате 8XXXXXXXXXX.";
  };

  const { values, setValues, errors, handleChange, isValid } =
      useFormWithValidation({
        name: validateName,
        surname: validateSurname,
        email: validateEmail,
        phone: validatePhone,
      });

  useEffect(() => {
    setValues({
      name: currentUser.name,
      surname: currentUser.surname,
      email: currentUser.email,
      phone: currentUser.phone,
    });
  }, [currentUser]);

  useEffect(() => {
    if (
        values.name !== currentUser.name ||
        values.surname !== currentUser.surname ||
        values.email !== currentUser.email ||
        values.phone !== currentUser.phone
    ) {
      setDisabledForm(false);
    } else {
      setDisabledForm(true);
    }
  }, [values, currentUser]);

  function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault();
    if (isValid) {
      onSubmit({
        name: values.name,
        email: values.email,
        surname: values.surname,
        phone: values.phone,
      });
    }
  }

  return (
      <section className="profile">
        <form className="profile__form" onSubmit={handleSubmit}>
          <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
          <div className="profile__input-container">
            <label className="profile__label">Имя</label>
            <input
                name="name"
                className="profile__input"
                required
                type="text"
                defaultValue={currentUser.name}
                onChange={handleChange}
            />
            {errors.name && <span className="profile__error">{errors.name}</span>}
          </div>
          <div className="profile__input-container">
            <label className="profile__label">Фамилия</label>
            <input
                name="surname"
                className="profile__input"
                required
                type="text"
                defaultValue={currentUser.surname}
                onChange={handleChange}
            />
            {errors.surname && (
                <span className="profile__error">{errors.surname}</span>
            )}
          </div>
          <div className="profile__input-container">
            <label className="profile__label">E-mail</label>
            <input
                name="email"
                className="profile__input"
                required
                type="text"
                defaultValue={currentUser.email}
                onChange={handleChange}
            />
            {errors.email && (
                <span className="profile__error">{errors.email}</span>
            )}
          </div>
          <div className="profile__input-container">
            <label className="profile__label">Телефон</label>
            <input
                name="phone"
                className="profile__input"
                required
                type="text"
                defaultValue={currentUser.phone}
                onChange={handleChange}
            />
            {errors.phone && (
                <span className="profile__error">{errors.phone}</span>
            )}
          </div>
          <button
              className={`profile__submit${disabledForm || !isValid ? " profile__submit_disabled" : ""}`}
              type="submit"
              disabled={disabledForm || !isValid}
          >
            Редактировать
          </button>
        </form>
        <button className="profile__signout" onClick={signOut}>
          Выйти из аккаунта
        </button>
      </section>
  );
};

export default Profile;
