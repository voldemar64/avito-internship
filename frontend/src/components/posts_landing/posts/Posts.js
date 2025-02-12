import SearchForm from "../search_form/SearchForm";
import PostsCardsList from "../posts_card_list/PostsCardsList";
import React from "react";

function Posts({ durationFilter, handleSearch, posts, addPosts, listLength, searchDone }) {

    return (
        <>
            <SearchForm
                durationFilter={durationFilter}
                handleSearch={handleSearch}
            />
            <PostsCardsList
                posts={posts}
                addPosts={addPosts}
                listLength={listLength}
                searchDone={searchDone}
            />
        </>
    )
}

export default Posts;