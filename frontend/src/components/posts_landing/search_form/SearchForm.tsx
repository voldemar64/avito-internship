import "./SearchForm.css";
import React from "react";
import { useLocation } from "react-router-dom";

interface SearchFormProps {
  postsTypeFilter: (type: string) => void;
  handleSearch: (searchValue: string) => void;
  enabled: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ postsTypeFilter, handleSearch, enabled }) => {
  const localStorageValue = localStorage.getItem("savedSearchValue");
  const localType = localStorage.getItem("savedType");

  const [selectedType, setSelectedType] = React.useState(localType ?? "");
  const [value, setValue] = React.useState(localStorageValue ?? "");

  const pathName = useLocation();

  const isMainPath = pathName.pathname === "/";
  const isListPath = pathName.pathname === "/list";
  const selectClassName = `search-form__select${isMainPath ? " search-form__select_type_dark" : ""}`;

  React.useEffect(() => {
    if (isListPath || isMainPath) {
      localStorage.setItem("savedSearchValue", value);
      localStorage.setItem("savedType", selectedType);
    }
  }, [pathName, value, selectedType]);

  React.useEffect(() => {
    if (isListPath) {
      handleSearch(localStorageValue ?? "");
      postsTypeFilter(localType ?? "");
    }
  }, [pathName]);

  function handleSubmitForm(e: React.FormEvent) {
    e.preventDefault();
    handleSearch(value);
    postsTypeFilter(selectedType);
  }

  return (
      <section className="search-form">
        <form
            className="search-form__container"
            onSubmit={(e) => handleSubmitForm(e)}
        >
          <input
              className="search-form__input"
              placeholder="Объявление"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              disabled={!enabled}
          />
          <button className="search-form__button" />
        </form>
        <select
            className={selectClassName}
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              postsTypeFilter(e.target.value);
            }}
            disabled={!enabled}
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
