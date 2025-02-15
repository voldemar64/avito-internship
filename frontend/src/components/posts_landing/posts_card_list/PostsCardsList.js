import PostCard from "../post_card/PostCard";
import Preloader from "../preloader/Preloader";
import "./PostsCardsList.css";
import React from "react";

function PostsCardList({posts, addPosts, onCardClick, onCardDelete, onEditButtonClick, listLength, searchDone }) {

    return (
        <section className="movies">
            {posts.length !== 0 ?
                <ul className="cards">
                    {posts.map((card) => {
                        return (
                            <PostCard
                              key={card._id}
                              card={card}
                              onCardClick={onCardClick}
                              onCardDelete={onCardDelete}
                              onEditButtonClick={onEditButtonClick} />
                        )
                    }).slice(0, listLength)
                    }
                </ul>
                : <></>
            }
            {posts.length === 0 ? (searchDone ? <p className="text">По Вашему запросу ничего не найдено</p>
                    : <p className="text">Введите название объявления в поисковой строке</p>) :
                (posts.length > listLength) &&
                <Preloader addPosts={addPosts}/>}
        </section>

    )
}

export default PostsCardList;