import "./SearchForm.css";
import React from "react";
import { useLocation } from "react-router-dom";

function SearchForm({ postsTypeFilter, handleSearch }) {
    const localStorageValue = localStorage.getItem('savedSearchValue');
    const localType = localStorage.getItem('savedType');

    const [selectedType, setSelectedType] = React.useState(localType ?? '');
    const [value, setValue] = React.useState(localStorageValue ?? '');

    const pathName = useLocation();

    React.useEffect(() => {
        if (pathName.pathname === "/list") {
            localStorage.setItem('savedSearchValue', value);
            localStorage.setItem('savedType', selectedType);
        }
    }, [pathName, value, selectedType]);

    React.useEffect(() => {
        if (pathName.pathname === "/list") {
            handleSearch(localStorageValue ?? '');
            postsTypeFilter(localType ?? '');
        }
    }, [pathName]);

    function handleSubmitForm(e) {
        e.preventDefault();
        handleSearch(value);
        postsTypeFilter(selectedType);
    }

    return (
      <section className="search-form">
          <form className="search-form__container" onSubmit={(e) => handleSubmitForm(e)}>
              <input
                className="search-form__input"
                placeholder="Объявление"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <button className="search-form__button" />
          </form>
          <select
            className="search-form__select"
            value={selectedType}
            onChange={(e) => {
                setSelectedType(e.target.value);
                postsTypeFilter(e.target.value);
            }}
          >
              <option value="">Тип объявления</option>
              <option value="Авто">Авто</option>
              <option value="Недвижимость">Недвижимость</option>
              <option value="Услуги">Услуги</option>
          </select>
      </section>
    );
}

export default SearchForm;
