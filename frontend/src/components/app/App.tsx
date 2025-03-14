import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

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
import authApi from "../../utils/authApi";
import mainApi from "../../utils/mainApi";
import postsApi from "../../utils/postsApi";

import tick from "../../images/tick.svg";
import cross from "../../images/cross.svg";

// Типы состояния
interface User {
    _id: string;
    name: string;
    surname: string;
    phone: string;
    email: string;
}

interface Post {
    _id: string;
    name: string;
    description: string;
    location: string;
    url?: string;
    type: string;
    likes: string[];
    [key: string]: any; // Для других полей
}

interface ApiResponse {
    success: boolean;
    message?: string;
    data?: any;
}


function App() {
    const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState<boolean>(false);
    const [popupTitle, setPopupTitle] = useState<string>("");
    const [popupPhoto, setPopupPhoto] = useState<string>("");

    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [tokenChecked, setTokenChecked] = useState<boolean>(false);

    const [searchDone, setSearchDone] = useState<boolean>(false);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [selectedEditPost, setSelectedEditPost] = useState<Post | null>(null);

    const [listLength, setListLength] = useState<number>(5);

    const [localApiPosts, setLocalApiPosts] = useState<Post[]>([]);
    const [savedPosts, setSavedPosts] = useState<Post[]>([]);
    const [savedFilteredPosts, setSavedFilteredPosts] = useState<Post[]>([]);
    const [apiFilteredPosts, setApiFilteredPosts] = useState<Post[]>([]);

    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem("jwt");

    useEffect(() => {
        if (token) {
            mainApi
                .getUserInfo()
                .then((res : ApiResponse) => {
                    if (res) {
                        setTokenChecked(true);
                        setCurrentUser(res.data);
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
                .then((res: ApiResponse) => {
                    localStorage.setItem("posts", JSON.stringify(res.data));
                    const allPosts = JSON.parse(localStorage.getItem("posts") || "[]");
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
                .then((res : ApiResponse) => {
                    const likedPosts = res.data.filter((post : Post) =>
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

    function handleRegister(name: string, surname: string, phone: string, email: string, password: string): void {
        authApi
            .register({ name, surname, phone, email, password })
            .then((res: ApiResponse) => {
                if (res.success) {
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
            .finally(() => setIsInfoTooltipOpen(true));
    }

    function handleLogin(email: string, password: string): void {
        authApi
            .authorize({ email, password })
            .then((res: ApiResponse) => {
                if (res.success) {
                    localStorage.setItem("jwt", res.data.token);
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

    function sendCode(email: string): void {
        authApi
            .sendCode({ email })
            .then((res: ApiResponse) => {
                if (res.success) {
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

    function handleResetPassword(email: string, password: string, code: string): void {
        authApi
            .resetPassword({ email, password, code })
            .then((res: ApiResponse) => {
                if (res.success) {
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
            .finally(() => setIsInfoTooltipOpen(true));
    }

    function handleSignOut(): void {
        setTokenChecked(false);
        setLoggedIn(false);
        setCurrentUser(null);
        setLocalApiPosts([]);
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

    function handleEditProfile(user: User): void {
        mainApi
            .patchUserInfo(user)
            .then((res: ApiResponse) => {
                if (res.success) {
                    setCurrentUser(res.data);
                    setPopupTitle("Данные пользователя изменены");
                    setPopupPhoto(tick);
                    setIsInfoTooltipOpen(true);
                }
            })
            .catch((err: string) => {
                setPopupTitle(`произошла ошибка: ${err}`);
                setPopupPhoto(cross);
                setIsInfoTooltipOpen(true);
            });
    }

    function postsTypeFilter(type: string): void {
        const path = location.pathname;
        const filteredPosts =
            path === "/list" || path === "/"
                ? JSON.parse(localStorage.getItem("filteredPosts") || "[]")
                : JSON.parse(localStorage.getItem("savedFilteredPosts") || "[]");

        if (type !== "" && filteredPosts) {
            const posts = filteredPosts.filter((i: Post) => i.type === type);
            path === "/list" || path === "/"
                ? setApiFilteredPosts(posts)
                : setSavedFilteredPosts(posts);
        } else {
            path === "/list" || path === "/"
                ? setApiFilteredPosts(filteredPosts)
                : setSavedFilteredPosts(filteredPosts);
        }
    }

    function handleSearch(input: string): void {
        const path = location.pathname;
        if ((path === "/list" || path === "/") && localApiPosts) {
            const filteredSearch =
                input === ""
                    ? localApiPosts
                    : localApiPosts.filter((i: Post) => {
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
                    : savedPosts.filter((i: Post) => {
                        const inputs = input.toLowerCase();
                        const name = i.name.toLowerCase();
                        return name.includes(inputs);
                    });

            localStorage.setItem("savedFilteredPosts", JSON.stringify(filteredSearch));

            setSavedFilteredPosts(filteredSearch || savedPosts);
            setSearchDone(input !== "");
        } else {
            console.log("Нет данных для поиска");
        }
    }

    function handleAddPost(card: Post): void {
        postsApi
            .addNewPost(card)
            .then((res : ApiResponse) => {
                if (res.success) {
                    localStorage.setItem(
                        "posts",
                        JSON.stringify([res.data, ...localApiPosts]),
                    );
                    const allPosts = JSON.parse(localStorage.getItem("posts") || "[]");
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

    function handleEditPost(card_id: string, card: Post): void {
        postsApi
            .patchPost(card_id, card)
            .then((res : ApiResponse) => {
                if (res.success) {
                    const updatedPosts = localApiPosts.map((post: Post) =>
                        post._id === res.data._id ? res.data : post,
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

    function handleItemDelete(card: Post): void {
        postsApi
            .deletePost(card._id)
            .then(() => {
                setLocalApiPosts((cards: Post[]) =>
                    cards.filter((c: Post) => c._id !== card._id),
                );
                setApiFilteredPosts((cards: Post[]) =>
                    cards.filter((c: Post) => c._id !== card._id),
                );
            })
            .catch((err: string) => {
                console.log(`карточка не удаляется: ${err}`);
            });
    }

    function handlePostLike(post: Post): void {
        const liked = savedPosts.some((i: Post) => post._id === i._id);

        if (!liked) {
            postsApi
                .likePost(post._id, currentUser!._id)
                .then((res : ApiResponse) => {
                    const newSavedPosts = [...savedFilteredPosts, res.data];

                    setSavedPosts(newSavedPosts);
                    setSavedFilteredPosts(newSavedPosts);
                    setLocalApiPosts((state: Post[]) =>
                        state.map((p: Post) => (p._id === res.data._id ? res.data : p)),
                    );
                    setApiFilteredPosts((state: Post[]) =>
                        state.map((p: Post) => (p._id === res.data._id ? res.data : p)),
                    );

                    localStorage.setItem("savedPosts", JSON.stringify(newSavedPosts));
                    localStorage.setItem(
                        "savedFilteredPosts",
                        JSON.stringify(newSavedPosts),
                    );
                })
                .catch((err: string) => console.error(`Ошибка при лайке: ${err}`));
        } else {
            handlePostDislike(post);
        }
    }

    function handlePostDislike(post: Post): void {
        postsApi
            .dislikePost(post._id, currentUser!._id)
            .then((res : ApiResponse) => {
                const newSavedPosts = savedPosts.filter(
                    (i: Post) => i._id !== res.data._id,
                );

                setSavedPosts(newSavedPosts);
                setSavedFilteredPosts(newSavedPosts);
                setLocalApiPosts((state: Post[]) =>
                    state.map((p: Post) => (p._id === res.data._id ? res.data : p)),
                );
                setApiFilteredPosts((state: Post[]) =>
                    state.map((p: Post) => (p._id === res.data._id ? res.data : p)),
                );

                localStorage.setItem("savedPosts", JSON.stringify(newSavedPosts));
                localStorage.setItem(
                    "savedFilteredPosts",
                    JSON.stringify(newSavedPosts),
                );
            })
            .catch((err: string) => console.error(`Ошибка при дизлайке: ${err}`));
    }

    function addPosts(): void {
        setListLength((prev) => prev + 5);
    }

    function handleInfoTooltip(): void {
        setIsInfoTooltipOpen(false);
    }

    function handleOverlayClick(e: React.MouseEvent): void {
        if ((e.target as HTMLElement).classList.contains("popup")) {
            handleInfoTooltip();
        }
    }

    function handleItemClick(item: Post): void {
        setSelectedPost(item);
        navigate(`/list/${item._id}`);
    }

    function handleEditButtonClick(item: Post): void {
        setSelectedEditPost(item);
        navigate("/form");
    }

    function handleSideBar(): void {
        setIsSideBarOpen(!isSideBarOpen);
    }


  return (
    <CurrentUserContext.Provider value={currentUser!}>
      <Header
        onSideBarOpen={handleSideBar}
        windowWidth={useWindowWidth}
        isLogged={loggedIn}
      />
      <main className="main">
        <Routes>
          <Route
            path="/"
            element={
              <Main
                isLogged={loggedIn}
                postsTypeFilter={postsTypeFilter}
                handleSearch={handleSearch}
              />
            }
          />
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
                enabled={loggedIn}
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
                onEditButtonClick={handleEditButtonClick}
                listLength={listLength}
                searchDone={searchDone}
                enabled={loggedIn}
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
