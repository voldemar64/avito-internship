import SearchForm from "../search_form/SearchForm";
import PostsCardsList from "../posts_card_list/PostsCardsList";
import React from "react";

function SavedPosts({
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

export default SavedPosts;
