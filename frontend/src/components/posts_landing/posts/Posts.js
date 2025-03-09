import SearchForm from "../search_form/SearchForm";
import PostsCardsList from "../posts_card_list/PostsCardsList";
import React from "react";

function Posts({
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
}) {
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
