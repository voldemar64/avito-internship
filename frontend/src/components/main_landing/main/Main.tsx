import React from "react";
import AboutProject from "../about_project/AboutProject";
import Search from "../search/Search";
import Benefits from "../benefits/Benefits";
import Sources from "../sources/Sources";
import Conversation from "../conversation/Conversation";
import MassMedia from "../mass_media/MassMedia";
import AboutMe from "../about_me/AboutMe";
import Cities from "../cities/Cities";

interface MainProps {
  isLogged: boolean;
  postsTypeFilter: (type: string) => void;
  handleSearch: (value: string) => void;
}

const Main: React.FC<MainProps> = ({
  isLogged,
  postsTypeFilter,
  handleSearch,
}) => {
  return (
    <>
      <AboutProject />
      <Search
        isLogged={isLogged}
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
};

export default Main;
