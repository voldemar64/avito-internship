import PostCard from "../post_card/PostCard";
import Preloader from "../preloader/Preloader";
import "./PostsCardsList.css";
import React from "react";

interface PostsCardsListProps {
  posts: { _id: string; name: string; url: string; likes: string[]; owner: string; type: string }[]; // Типизация массива постов
  addPosts: () => void;
  onSave: (card: any) => void;
  onCardClick: (card: any) => void;
  onCardDelete: (card: any) => void;
  onEditButtonClick: (card: any) => void;
  listLength: number;
  searchDone: boolean;
}

const PostsCardsList: React.FC<PostsCardsListProps> = ({
                                                         posts,
                                                         addPosts,
                                                         onSave,
                                                         onCardClick,
                                                         onCardDelete,
                                                         onEditButtonClick,
                                                         listLength,
                                                         searchDone,
                                                       }) => {
  return (
      <section className="posts">
        {posts.length !== 0 ? (
            <ul className="cards">
              {posts
                  .map((card) => {
                    return (
                        <PostCard
                            key={card._id}
                            card={card}
                            onSave={onSave}
                            onCardClick={onCardClick}
                            onCardDelete={onCardDelete}
                            onEditButtonClick={onEditButtonClick}
                        />
                    );
                  })
                  .slice(0, listLength)}
            </ul>
        ) : (
            <></>
        )}
        {posts.length === 0 ? (
            searchDone ? (
                <p className="text">По Вашему запросу ничего не найдено</p>
            ) : (
                <p className="text">Введите название объявления в поисковой строке</p>
            )
        ) : (
            posts.length > listLength && <Preloader addPosts={addPosts} />
        )}
      </section>
  );
}

export default PostsCardsList;
