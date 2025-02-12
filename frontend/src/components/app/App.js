import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Header from "../header/Header";
import Main from "../main_landing/main/Main";
import Footer from "../footer/Footer";
import Login from "../login/Login";
import Register from "../register/Register";
import ResetPassword from "../reset_password/ResetPassword";
import Profile from "../profile/Profile";
import NotFound from "../not_found/NotFound";
import InfoTooltip from "../infotooltip/InfoTooltip";
import SideBar from "../sidebar/SideBar";
import ProtectedRoute from "../protected_route/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import { useWindowWidth } from "../../utils/windowWidth";
import * as auth from "../../utils/auth";
import mainApi from "../../utils/mainApi";

import tick from "../../images/tick.svg";
import cross from "../../images/cross.svg";

function App() {
  const [isSideBarOpen, setIsSideBarOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [popupTitle, setPopupTitle] = React.useState("");
  const [popupPhoto, setPopupPhoto] = React.useState("");

  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [tokenChecked, setTokenChecked] = React.useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");

  React.useEffect(() => {
    if (token) {
      mainApi
        .getUserInfo()
        .then((res) => {
          if (res) {
            setTokenChecked(true);
            setLoggedIn(true);
            setCurrentUser(res);
            console.log(res.user);
          } else {
            setTokenChecked(false);
            handleSignOut();
          }
        })
        .catch((err) => {
          setTokenChecked(false);
          handleSignOut();
          console.log(`Не получается токен: ${err}`);
        });
    } else {
      setTokenChecked(false);
    }
  }, [token]);

  function handleRegister(name, surname, phone, email, password) {
    auth
      .register(name, surname, phone, email, password)
      .then((res) => {
        if (res) {
          setPopupTitle("Вы успешно зарегистрировались!");
          setPopupPhoto(tick);
          handleLogin(email, password);
        } else {
          setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
          setPopupPhoto(cross);
        }
      })
      .catch(() => {
        setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
        setPopupPhoto(cross);
      })
      .finally(setIsInfoTooltipOpen(true));
  }

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true);
          navigate("/");
        } else {
          setPopupTitle("Что-то пошло не так!:(");
          setPopupPhoto(cross);
          setIsInfoTooltipOpen(true);
        }
      })
      .catch(() => {
        setPopupTitle("Что-то пошло не так!:(");
        setPopupPhoto(cross);
        setIsInfoTooltipOpen(true);
      });
  }

  function sendCode(email) {
    auth
      .sendCode(email)
        .then((res) => {
          if (res) {
            setPopupTitle("Код отправлен!");
            setPopupPhoto(tick);
            setIsInfoTooltipOpen(true);
          } else {
            setPopupTitle("Код не отправлен!:(");
            setPopupPhoto(cross);
            setIsInfoTooltipOpen(true);
          }
        })
        .catch(() => {
          setPopupTitle("Что-то пошло не так!:(");
          setPopupPhoto(cross);
          setIsInfoTooltipOpen(true);
        })
  }

  function handleResetPassword(email, password, code) {
    auth
        .resetPassword(email, password, code)
        .then((res) => {
          if (res) {
            setPopupTitle("Пароль изменён!");
            setPopupPhoto(tick);
            navigate("/signin");
          } else {
            setPopupTitle("Что-то пошло не так!:(");
            setPopupPhoto(cross);
            setIsInfoTooltipOpen(true);
          }
        })
        .catch(() => {
          setPopupTitle("Что-то пошло не так!:(");
          setPopupPhoto(cross);
          setIsInfoTooltipOpen(true);
        })
        .finally(setIsInfoTooltipOpen(true));
  }

  function handleSignOut() {
    setTokenChecked(false);
    setLoggedIn(false);
    setCurrentUser({});
    localStorage.removeItem("jwt");
    navigate("/");
  }

  function handleEditProfile(user) {
    mainApi
      .patchUserInfo(user)
      .then((res) => {
        if (res) {
          setCurrentUser(res.user);
          setPopupTitle("Данные пользователя изменены");
          setPopupPhoto(tick);
          setIsInfoTooltipOpen(true);
        }
      })
      .catch((err) => {
        setPopupTitle(`произошла ошибка: ${err}`);
        setPopupPhoto(tick);
        setIsInfoTooltipOpen(true);
      });
  }

  function handleInfoTooltip() {
    setIsInfoTooltipOpen(false);
  }

  function handleOverlayClick(e) {
    if (e.target.classList.contains("popup")) {
      handleInfoTooltip();
    }
  }

  function handleSideBar() {
    setIsSideBarOpen(!isSideBarOpen);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        onSideBarOpen={handleSideBar}
        windowWidth={useWindowWidth}
        isLogged={loggedIn}
      />
      <main className="main">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/signin"
            element={<Login submit={handleLogin} loggedIn={loggedIn} />}
          />
          <Route
            path="/reset-password"
            element={<ResetPassword submit={handleResetPassword} sendCode={sendCode} loggedIn={loggedIn} />}
          />
          <Route
            path="/signup"
            element={<Register submit={handleRegister} loggedIn={loggedIn} />}
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                component={Profile}
                onSubmit={handleEditProfile}
                signOut={handleSignOut}
                loggedIn={loggedIn}
                tokenChecked={tokenChecked}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {location.pathname !== "/profile" && <Footer />}

      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={handleInfoTooltip}
        onOverlayClick={handleOverlayClick}
        title={popupTitle}
        photo={popupPhoto}
      />

      <SideBar isOpen={isSideBarOpen} onClose={handleSideBar} />
    </CurrentUserContext.Provider>
  );
}

export default App;
