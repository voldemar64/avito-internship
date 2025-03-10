import SearchForm from "../search_form/SearchForm";
import PostsCardsList from "../posts_card_list/PostsCardsList";
import React from "react";

interface PostsProps {
    postsTypeFilter: (type: string) => void;
    handleSearch: (searchValue: string) => void;
    posts: { _id: string; name: string; url: string; likes: string[]; owner: string; type: string }[]; // Типизация массива постов
    addPosts: () => void;
    onSave: (card: any) => void;
    onCardClick: (card: any) => void;
    onCardDelete: (card: any) => void;
    onEditButtonClick: (card: any) => void;
    listLength: number;
    searchDone: boolean;
    enabled: boolean;
}

const Posts: React.FC<PostsProps> = ({
                                         postsTypeFilter,
                                         handleSearch,
                                         posts,
                                         addPosts,
                                         onSave,
                                         onCardClick,
                                         onCardDelete,
                                         onEditButtonClick,
                                         listLength,
                                         searchDone,
                                         enabled,
                                     }) => {
    return (
        <>
            <SearchForm
                postsTypeFilter={postsTypeFilter}
                handleSearch={handleSearch}
                enabled={enabled}
            />
            <PostsCardsList
                posts={posts}
                addPosts={addPosts}
                onSave={onSave}
                onCardClick={onCardClick}
                onCardDelete={onCardDelete}
                onEditButtonClick={onEditButtonClick}
                listLength={listLength}
                searchDone={searchDone}
            />
        </>
    );
}

export default Posts;
