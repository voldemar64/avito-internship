import "./Profile.css";
import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({ onSubmit, signOut }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [userName, setUserName] = React.useState(currentUser.name);
  const [userEmail, setUserEmail] = React.useState(currentUser.email);
  const [userSurname, setUserSurname] = React.useState(currentUser.surname);
  const [userPhone, setUserPhone] = React.useState(currentUser.phone);
  const [disableForm, setDisabledForm] = React.useState(true);

  React.useEffect(() => {
    if (
      userName !== currentUser.name ||
      userEmail !== currentUser.email ||
      userSurname !== currentUser.surname ||
      userPhone !== currentUser.phone
    ) {
      setDisabledForm(false);
    } else {
      setDisabledForm(true);
    }
  }, [userName, userEmail, userSurname, userPhone]);

  function handleChangeName(evt) {
    setUserName(evt.target.value);
  }

  function handleChangeEmail(evt) {
    setUserEmail(evt.target.value);
  }

  function handleChangeSurname(evt) {
    setUserSurname(evt.target.value);
  }

  function handleChangePhone(evt) {
    setUserPhone(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit({
      name: userName,
      email: userEmail,
      surname: userSurname,
      phone: userPhone,
    });
  }

  return (
    <section className="profile">
      <form className="profile__form" onSubmit={handleSubmit}>
        <h2 className="profile__title">{`Привет, ${currentUser.name}`}</h2>
        <div className="profile__input-container">
          <label className="profile__label">Имя</label>
          <input
            className="profile__input"
            required
            type="text"
            value={userName}
            onChange={handleChangeName}
          />
        </div>
        <div className="profile__input-container">
          <label className="profile__label">Фамилия</label>
          <input
            className="profile__input"
            required
            type="text"
            value={userSurname}
            onChange={handleChangeSurname}
          />
        </div>
        <div className="profile__input-container">
          <label className="profile__label">E-mail</label>
          <input
            className="profile__input"
            required
            type="text"
            value={userEmail}
            onChange={handleChangeEmail}
          />
        </div>
        <div className="profile__input-container">
          <label className="profile__label">Телефон</label>
          <input
            className="profile__input"
            required
            type="text"
            value={userPhone}
            onChange={handleChangePhone}
          />
        </div>
        <button
          className={`profile__submit${disableForm ? " profile__submit_disabled" : ""}`}
          type="submit"
          disabled={disableForm}
        >
          Редактировать
        </button>
      </form>
      <button className="profile__signout" onClick={signOut}>
        Выйти из аккаунта
      </button>
    </section>
  );
}

export default Profile;
