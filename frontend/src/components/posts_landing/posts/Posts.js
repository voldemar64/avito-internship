import SearchForm from "../search_form/SearchForm";
import PostsCardsList from "../posts_card_list/PostsCardsList";
import React from "react";

function Posts({
  postsTypeFilter,
  handleSearch,
  posts,
  addPosts,
  onCardClick,
  onCardDelete,
  onEditButtonClick,
  listLength,
  searchDone,
}) {
  return (
    <>
      <SearchForm
        postsTypeFilter={postsTypeFilter}
        handleSearch={handleSearch}
      />
      <PostsCardsList
        posts={posts}
        addPosts={addPosts}
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
