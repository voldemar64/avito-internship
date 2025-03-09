import React from "react";
import AboutProject from "../about_project/AboutProject";
import Search from "../search/Search";
import Benefits from "../benefits/Benefits";
import Sources from "../sources/Sources";
import Conversation from "../conversation/Conversation";
import MassMedia from "../mass_media/MassMedia";
import AboutMe from "../about_me/AboutMe";
import Cities from "../cities/Cities";

function Main({ loggedIn, postsTypeFilter, handleSearch }) {
  return (
    <>
      <AboutProject />
      <Search
        loggedIn={loggedIn}
        postsTypeFilter={postsTypeFilter}
        handleSearch={handleSearch}
      />
      <Benefits />
      <Sources />
      <Conversation />
      <MassMedia />
      <AboutMe />
      <Cities />
    </>
  );
}

export default Main;
