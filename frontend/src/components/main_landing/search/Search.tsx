import "./Search.css";
import SearchForm from "../../posts_landing/search_form/SearchForm";
import React from "react";
import { useNavigate } from "react-router-dom";

interface SearchProps {
    isLogged: boolean;
    postsTypeFilter: (type: string) => void;
    handleSearch: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({ isLogged, postsTypeFilter, handleSearch }) => {
    const navigate = useNavigate();

    function handleSearchWithRedirect(value: string) {
        navigate("/list");
        handleSearch(value);
    }

    return (
        <section className="search">
            <h3 className="search__title">Давай найдем то, что ищешь!</h3>
            {!isLogged && (
                <div className="search__overlay">
                    <span className="overlay__icon">🔒</span>
                    <p className="overlay__text">
                        Поиск заблокирован для не авторизованных пользователей
                    </p>
                </div>
            )}
            <SearchForm
                postsTypeFilter={postsTypeFilter}
                handleSearch={handleSearchWithRedirect}
                enabled={isLogged}
            />
        </section>
    );
};

export default Search;
