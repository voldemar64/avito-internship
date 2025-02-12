import "./SearchForm.css"
import React from "react";
import { useLocation } from "react-router-dom";

function SearchForm({ durationFilter, handleSearch }) {
    const localStorageValue = localStorage.getItem('savedSearchValue');
    const localChecked = localStorage.getItem('savedCheck') === 'true';

    const [isActive, setIsActive] = React.useState(localChecked ?? false);
    const [value, setValue] = React.useState(localStorageValue ?? '');

    const pathName = useLocation()

    React.useEffect(() => {
        if (pathName.pathname === "/list") {
            localStorage.setItem('savedSearchValue', value)
            localStorage.setItem('savedCheck', isActive)
        }
    }, [pathName, value, isActive])

    React.useEffect(() => {
        if (pathName.pathname === "/list") {
            handleSearch(localStorageValue ?? '')
            durationFilter(localChecked ?? false)
        }
    }, [pathName])

    function handleSubmitForm(e) {
        e.preventDefault();
        handleSearch(value);
        durationFilter(isActive)
    }

    return (
        <section className="search-form">
            <form className="search-form__container"  onSubmit={(e) => handleSubmitForm(e)}>
                <input className="search-form__input"
                       placeholder="Объявление" value={value}
                       onChange={(e) => setValue(e.target.value)}
                />
                <button className="search-form__button"/>
            </form>
            <div className="search-form__toggle">
                <input type="checkbox" className={`search-form__checkbox${isActive ? " search-form__checkbox_on" : ""}`}
                       onClick={() => {
                           setIsActive(!isActive)
                           durationFilter(!isActive)
                       }}/>
                <label className="search-form__text">Короткометражки</label>
            </div>
        </section>
    )
}

export default SearchForm;