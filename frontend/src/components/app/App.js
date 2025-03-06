import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Header from "../header/Header";
import Main from "../main_landing/main/Main";
import Footer from "../footer/Footer";
import Login from "../login/Login";
import Register from "../register/Register";
import ResetPassword from "../reset_password/ResetPassword";
import Profile from "../profile/Profile";
import Posts from "../posts_landing/posts/Posts";
import SavedPosts from "../posts_landing/saved_posts/SavedPosts";
import Post from "../post/Post";
import PostsForm from "../posts_form/PostsForm";
import NotFound from "../not_found/NotFound";
import InfoTooltip from "../infotooltip/InfoTooltip";
import SideBar from "../sidebar/SideBar";
import ProtectedRoute from "../protected_route/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import { useWindowWidth } from "../../utils/windowWidth";
import * as auth from "../../utils/auth";
import mainApi from "../../utils/mainApi";
import postsApi from "../../utils/postsApi";

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

  const [searchDone, setSearchDone] = React.useState(false);
  const [selectedPost, setSelectedPost] = React.useState(null);
  const [selectedEditPost, setSelectedEditPost] = React.useState(null);

  const [listLength, setListLength] = React.useState(5);

  const [localApiPosts, setLocalApiPosts] = React.useState([]);
  const [savedPosts, setSavedPosts] = React.useState([]);
  const [savedFilteredPosts, setSavedFilteredPosts] = React.useState([]);
  const [apiFilteredPosts, setApiFilteredPosts] = React.useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    if (token) {
      mainApi
        .getUserInfo()
        .then((res) => {
          if (res) {
            setTokenChecked(true);
            setCurrentUser(res);
            setLoggedIn(true);
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

  useEffect(() => {
    if (loggedIn) {
      postsApi
        .getInitialPosts()
        .then((posts) => {
          localStorage.setItem("posts", JSON.stringify(posts));
          const allPosts = JSON.parse(localStorage.getItem("posts"));
          setLocalApiPosts(allPosts);
          setApiFilteredPosts(allPosts);
        })
        .catch((err) => console.log(`Ошибка при получении объявлений: ${err}`));
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn && currentUser && currentUser._id) {
      postsApi
        .getSavedPosts(currentUser._id)
        .then((posts) => {
          const likedPosts = posts.filter((post) =>
            post.likes.includes(currentUser._id),
          );

          localStorage.setItem("savedPosts", JSON.stringify(likedPosts));
          localStorage.setItem(
            "savedFilteredPosts",
            JSON.stringify(likedPosts),
          );

          setSavedPosts(likedPosts);
          setSavedFilteredPosts(likedPosts);
        })
        .catch((err) =>
          console.log(`Ошибка при получении сохранённых объявлений: ${err}`),
        );
    }
  }, [loggedIn, currentUser]);

  useEffect(() => {
    if (selectedEditPost && location.pathname !== "/form") {
      setSelectedEditPost(null);
    }
  }, [location.pathname]);

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
      });
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
    setLocalApiPosts([]);
    setSavedFilteredPosts([]);
    setSavedFilteredPosts([]);
    setApiFilteredPosts([]);
    localStorage.removeItem("posts");
    localStorage.removeItem("filteredPosts");
    localStorage.removeItem("savedPosts");
    localStorage.removeItem("savedFilteredPosts");
    localStorage.removeItem("savedType");
    localStorage.removeItem("savedSearchValue");
    localStorage.removeItem("jwt");
    navigate("/");
  }

  function handleEditProfile(user) {
    mainApi
      .patchUserInfo(user)
      .then((res) => {
        if (res) {
          setCurrentUser(res);
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

  function postsTypeFilter(type) {
    const path = location.pathname;
    const filteredPosts =
      path === "/list"
        ? JSON.parse(localStorage.getItem("filteredPosts"))
        : JSON.parse(localStorage.getItem("savedFilteredPosts"));

    if (type !== "" && filteredPosts) {
      const posts = filteredPosts.filter((i) => i.type === type);
      path === "/list"
        ? setApiFilteredPosts(posts)
        : setSavedFilteredPosts(posts);
    } else {
      path === "/list"
        ? setApiFilteredPosts(filteredPosts)
        : setSavedFilteredPosts(filteredPosts);
    }
  }

  function handleSearch(input) {
    const path = location.pathname;
    if (path === "/list" && localApiPosts) {
      const filteredSearch =
        input === ""
          ? localApiPosts
          : localApiPosts.filter((i) => {
              const inputs = input.toLowerCase();
              const name = i.name.toLowerCase();
              return name.includes(inputs);
            });

      localStorage.setItem("filteredPosts", JSON.stringify(filteredSearch));

      setApiFilteredPosts(filteredSearch || localApiPosts);
      setSearchDone(input !== "");
    } else if (path === "/saved-list" && savedPosts) {
      const filteredSearch =
        input === ""
          ? savedPosts
          : savedPosts.filter((i) => {
              const inputs = input.toLowerCase();
              const name = i.name.toLowerCase();
              return name.includes(inputs);
            });

      localStorage.setItem(
        "savedFilteredPosts",
        JSON.stringify(filteredSearch),
      );

      setSavedFilteredPosts(filteredSearch || savedPosts);
      setSearchDone(input !== "");
    } else {
      console.log("Нет данных для поиска");
    }
  }

  function handleAddPost(card) {
    postsApi
      .addNewPost(card)
      .then((newItem) => {
        if (newItem) {
          localStorage.setItem(
            "posts",
            JSON.stringify([newItem, ...localApiPosts]),
          );
          const allPosts = JSON.parse(localStorage.getItem("posts"));
          setLocalApiPosts(allPosts);

          setApiFilteredPosts(allPosts);
          setPopupTitle("Пост добавлен!");
          setPopupPhoto(tick);
          setIsInfoTooltipOpen(true);
        } else {
          setPopupTitle("Пост не добавился!:(");
          setPopupPhoto(cross);
          setIsInfoTooltipOpen(true);
        }
      })
      .catch(() => {
        setPopupTitle("Пост не добавился!:(");
        setPopupPhoto(cross);
        setIsInfoTooltipOpen(true);
      });

    navigate("/list");
  }

  function handleEditPost(card_id, card) {
    postsApi
      .patchPost(card_id, card)
      .then((newItem) => {
        if (newItem) {
          const updatedPosts = localApiPosts.map((post) =>
            post._id === newItem._id ? newItem : post,
          );

          localStorage.setItem("posts", JSON.stringify(updatedPosts));
          setLocalApiPosts(updatedPosts);
          setApiFilteredPosts(updatedPosts);

          setPopupTitle("Пост обновлён!");
          setPopupPhoto(tick);
          setIsInfoTooltipOpen(true);
        } else {
          setPopupTitle("Пост не обновился!:(");
          setPopupPhoto(cross);
          setIsInfoTooltipOpen(true);
        }
      })
      .catch(() => {
        setPopupTitle("Пост не обновился!:(");
        setPopupPhoto(cross);
        setIsInfoTooltipOpen(true);
      });

    navigate("/list");
  }

  function handleItemDelete(card) {
    postsApi
      .deletePost(card._id)
      .then(() => {
        setLocalApiPosts((cards) =>
          cards.filter((c) => c._id !== card._id && c),
        );
        setApiFilteredPosts((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(`карточка не удаляется: ${err}`);
      });
  }

  function handlePostLike(post) {
    const liked = savedPosts.some((i) => post._id === i._id);

    if (!liked) {
      postsApi
        .likePost(post._id, currentUser._id)
        .then((updatedPost) => {
          const newSavedPosts = [...savedFilteredPosts, updatedPost];

          setSavedPosts(newSavedPosts);
          setSavedFilteredPosts(newSavedPosts);
          setLocalApiPosts((state) =>
            state.map((p) => (p._id === updatedPost._id ? updatedPost : p)),
          );
          setApiFilteredPosts((state) =>
            state.map((p) => (p._id === updatedPost._id ? updatedPost : p)),
          );

          localStorage.setItem("savedPosts", JSON.stringify(newSavedPosts));
          localStorage.setItem(
            "savedFilteredPosts",
            JSON.stringify(newSavedPosts),
          );
        })
        .catch((err) => console.error(`Ошибка при лайке: ${err}`));
    } else {
      handlePostDislike(post);
    }
  }

  function handlePostDislike(post) {
    postsApi
      .dislikePost(post._id, currentUser._id)
      .then((updatedPost) => {
        const newSavedPosts = savedPosts.filter(
          (i) => i._id !== updatedPost._id,
        );

        setSavedPosts(newSavedPosts);
        setSavedFilteredPosts(newSavedPosts);
        setLocalApiPosts((state) =>
          state.map((p) => (p._id === updatedPost._id ? updatedPost : p)),
        );
        setApiFilteredPosts((state) =>
          state.map((p) => (p._id === updatedPost._id ? updatedPost : p)),
        );

        localStorage.setItem("savedPosts", JSON.stringify(newSavedPosts));
        localStorage.setItem(
          "savedFilteredPosts",
          JSON.stringify(newSavedPosts),
        );
      })
      .catch((err) => console.error(`Ошибка при дизлайке: ${err}`));
  }

  function addPosts() {
    setListLength(listLength + 5);
  }

  function handleInfoTooltip() {
    setIsInfoTooltipOpen(false);
  }

  function handleOverlayClick(e) {
    if (e.target.classList.contains("popup")) {
      handleInfoTooltip();
    }
  }

  function handleItemClick(item) {
    setSelectedPost(item);
    navigate(`/list/${item._id}`);
  }

  function handleEditButtonClick(item) {
    setSelectedEditPost(item);
    navigate("/form");
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
            element={
              <ResetPassword
                submit={handleResetPassword}
                sendCode={sendCode}
                loggedIn={loggedIn}
              />
            }
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
          <Route
            path="/list"
            element={
              <ProtectedRoute
                component={Posts}
                postsTypeFilter={postsTypeFilter}
                handleSearch={handleSearch}
                posts={apiFilteredPosts}
                addPosts={addPosts}
                onSave={handlePostLike}
                onCardClick={handleItemClick}
                onCardDelete={handleItemDelete}
                onEditButtonClick={handleEditButtonClick}
                listLength={listLength}
                searchDone={searchDone}
                loggedIn={loggedIn}
                tokenChecked={tokenChecked}
              />
            }
          />
          <Route
            path="/saved-list"
            element={
              <ProtectedRoute
                component={SavedPosts}
                postsTypeFilter={postsTypeFilter}
                handleSearch={handleSearch}
                posts={savedFilteredPosts}
                addPosts={addPosts}
                onSave={handlePostLike}
                onCardClick={handleItemClick}
                onCardDelete={handleItemDelete}
                listLength={listLength}
                searchDone={searchDone}
                loggedIn={loggedIn}
                tokenChecked={tokenChecked}
              />
            }
          />
          <Route
            path="/form"
            element={
              <ProtectedRoute
                component={PostsForm}
                onSubmit={handleAddPost}
                onEditSubmit={handleEditPost}
                post={selectedEditPost}
                loggedIn={loggedIn}
                tokenChecked={tokenChecked}
              />
            }
          />
          <Route
            path="/list/:id"
            element={
              <ProtectedRoute
                component={Post}
                post={selectedPost}
                onCardDelete={handleItemDelete}
                onEditButtonClick={handleEditButtonClick}
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
