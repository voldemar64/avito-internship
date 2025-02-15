import "./PostsForm.css";
import "../register/Register.css";
import { useForm } from "../../utils/formValidator";
import React, { useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function PostsFrom({ onSubmit }) {
  const currentUser = React.useContext(CurrentUserContext);

  const validateUrl = (url) => {
    if (!url) return ""; // Поле не обязательное
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlRegex.test(url) ? "" : "Введите корректный URL.";
  };

  // Логика валидации формы
  const { values, handleChange } = useForm({
    url: validateUrl,
  });

  // Стейт для выбранного типа объявления
  const [selectedType, setSelectedType] = useState("");

  // Стейты для полей второго столбца
  const [autoFields, setAutoFields] = useState({
    brand: "",
    model: "",
    year: "",
    mileage: "",
  });

  const [realEstateFields, setRealEstateFields] = useState({
    propertyType: "",
    area: "",
    rooms: "",
    price: "",
  });

  const [servicesFields, setServicesFields] = useState({
    serviceType: "",
    experience: "",
    cost: "",
    schedule: "",
  });

  const [isFirstColumnValid, setIsFirstColumnValid] = React.useState(false);
  const [disabledForm, setDisabledForm] = useState(true);

  useEffect(() => {
    setIsFirstColumnValid(values.name && values.description && values.location && values.type);
  }, [
    values.name,
    values.description,
    values.location,
    values.type,
  ])

  // useEffect для отслеживания изменений всех полей формы
  useEffect(() => {
    const isFormValid = isFirstColumnValid &&
      (selectedType === "Авто" ? autoFields.brand && autoFields.model && autoFields.year && autoFields.mileage :
        selectedType === "Недвижимость" ? realEstateFields.propertyType && realEstateFields.area && realEstateFields.rooms && realEstateFields.price :
          selectedType === "Услуги" ? servicesFields.serviceType && servicesFields.experience && servicesFields.cost && servicesFields.schedule :
            true);

    const isUrlValid = !values.url || /^https?:\/\/[^\s/$.?#].[^\s]*$/.test(values.url);

    if (isFormValid && isUrlValid) {
      setDisabledForm(false);
    } else {
      setDisabledForm(true);
    }
  }, [
    isFirstColumnValid,
    selectedType,
    autoFields,
    realEstateFields,
    servicesFields,
    values.url,
  ]);

  // Функция для обработки отправки формы
  function handleSubmit(e) {
    e.preventDefault();

    const dataToSubmit = {
      name: values.name,
      description: values.description,
      location: values.location,
      type: values.type,
    };

    // Отправляем URL только если он был заполнен
    if (values.url) {
      dataToSubmit.url = values.url;
    }

    // Добавляем данные для выбранного типа объявления
    if (selectedType === "Авто") {
      dataToSubmit.brand = autoFields.brand;
      dataToSubmit.model = autoFields.model;
      dataToSubmit.year = autoFields.year;
      dataToSubmit.mileage = autoFields.mileage || '';
    } else if (selectedType === "Недвижимость") {
      dataToSubmit.propertyType = realEstateFields.propertyType;
      dataToSubmit.area = realEstateFields.area;
      dataToSubmit.rooms = realEstateFields.rooms;
      dataToSubmit.price = realEstateFields.price;
    } else if (selectedType === "Услуги") {
      dataToSubmit.serviceType = servicesFields.serviceType;
      dataToSubmit.experience = servicesFields.experience;
      dataToSubmit.cost = servicesFields.cost;
      dataToSubmit.schedule = servicesFields.schedule;
    }

    onSubmit(currentUser._id, dataToSubmit);
  }

  // Рендеринг полей для каждого типа объявления
  const renderFieldsForType = () => {
    switch (selectedType) {
      case "Авто":
        return renderAutoFields();
      case "Недвижимость":
        return renderRealEstateFields();
      case "Услуги":
        return renderServicesFields();
      default:
        return null;
    }
  };

  // Поля для типа "Авто"
  const renderAutoFields = () => (
    <div className="register__column">
      <h3 className="register__column-title">Детали:</h3>
      <div className="register__container">
        <label className="register__label">Марка</label>
        <select
          name="brand"
          required
          className={`register__input register__input_type_select ${!isFirstColumnValid ? 'register__input_inactive' : ''}`}
          disabled={!isFirstColumnValid}
          value={autoFields.brand}
          onChange={(e) => setAutoFields({ ...autoFields, brand: e.target.value })}
        >
          <option value="">Выберите марку</option>
          <option value="BMW">BMW</option>
          <option value="Mercedes">Mercedes</option>
          <option value="Audi">Audi</option>
          <option value="Toyota">Toyota</option>
          <option value="Honda">Honda</option>
          <option value="Nissan">Nissan</option>
        </select>
      </div>
      <div className="register__container">
        <label className="register__label">Модель</label>
        <input
          name="model"
          required
          type="text"
          className={`register__input ${!isFirstColumnValid ? 'register__input_inactive' : ''}`}
          disabled={!isFirstColumnValid}
          value={autoFields.model}
          onChange={(e) => setAutoFields({ ...autoFields, model: e.target.value })}
        />
      </div>
      <div className="register__container">
        <label className="register__label">Год выпуска</label>
        <input
          name="year"
          required
          type="number"
          className={`register__input ${!isFirstColumnValid ? 'register__input_inactive' : ''}`}
          disabled={!isFirstColumnValid}
          value={autoFields.year}
          onChange={(e) => setAutoFields({ ...autoFields, year: e.target.value })}
        />
      </div>
      <div className="register__container">
        <label className="register__label">Пробег</label>
        <input
          name="mileage"
          type="number"
          className={`register__input ${!isFirstColumnValid ? 'register__input_inactive' : ''}`}
          disabled={!isFirstColumnValid}
          value={autoFields.mileage}
          onChange={(e) => setAutoFields({ ...autoFields, mileage: e.target.value })}
        />
      </div>
    </div>
  );

  // Поля для типа "Недвижимость"
  const renderRealEstateFields = () => (
    <div className="register__column">
      <h3 className="register__column-title">Детали:</h3>
      <div className="register__container">
        <label className="register__label">Тип недвижимости</label>
        <select
          name="propertyType"
          required
          className={`register__input register__input_type_select ${!isFirstColumnValid ? 'register__input_inactive' : ''}`}
          disabled={!isFirstColumnValid}
          value={realEstateFields.propertyType}
          onChange={(e) => setRealEstateFields({ ...realEstateFields, propertyType: e.target.value })}
        >
          <option value="">Выберите тип</option>
          <option value="Квартира">Квартира</option>
          <option value="Дом">Дом</option>
          <option value="Коттедж">Коттедж</option>
        </select>
      </div>
      <div className="register__container">
        <label className="register__label">Площадь (кв. м)</label>
        <input
          name="area"
          required
          type="number"
          className={`register__input ${!isFirstColumnValid ? 'register__input_inactive' : ''}`}
          disabled={!isFirstColumnValid}
          value={realEstateFields.area}
          onChange={(e) => setRealEstateFields({ ...realEstateFields, area: e.target.value })}
        />
      </div>
      <div className="register__container">
        <label className="register__label">Количество комнат</label>
        <input
          name="rooms"
          required
          type="number"
          className={`register__input ${!isFirstColumnValid ? 'register__input_inactive' : ''}`}
          disabled={!isFirstColumnValid}
          value={realEstateFields.rooms}
          onChange={(e) => setRealEstateFields({ ...realEstateFields, rooms: e.target.value })}
        />
      </div>
      <div className="register__container">
        <label className="register__label">Цена</label>
        <input
          name="price"
          required
          type="number"
          className={`register__input ${!isFirstColumnValid ? 'register__input_inactive' : ''}`}
          disabled={!isFirstColumnValid}
          value={realEstateFields.price}
          onChange={(e) => setRealEstateFields({ ...realEstateFields, price: e.target.value })}
        />
      </div>
    </div>
  );

  // Поля для типа "Услуги"
  const renderServicesFields = () => (
    <div className="register__column">
      <h3 className="register__column-title">Детали:</h3>
      <div className="register__container">
        <label className="register__label">Тип услуги</label>
        <select
          name="serviceType"
          required
          className={`register__input register__input_type_select ${!isFirstColumnValid ? 'register__input_inactive' : ''}`}
          disabled={!isFirstColumnValid}
          value={servicesFields.serviceType}
          onChange={(e) => setServicesFields({ ...servicesFields, serviceType: e.target.value })}
        >
          <option value="">Выберите тип</option>
          <option value="Ремонт">Ремонт</option>
          <option value="Уборка">Уборка</option>
          <option value="Доставка">Доставка</option>
        </select>
      </div>
      <div className="register__container">
        <label className="register__label">Опыт работы (лет)</label>
        <input
          name="experience"
          required
          type="number"
          className={`register__input ${!isFirstColumnValid ? 'register__input_inactive' : ''}`}
          disabled={!isFirstColumnValid}
          value={servicesFields.experience}
          onChange={(e) => setServicesFields({ ...servicesFields, experience: e.target.value })}
        />
      </div>
      <div className="register__container">
        <label className="register__label">Стоимость</label>
        <input
          name="cost"
          required
          type="number"
          className={`register__input ${!isFirstColumnValid ? 'register__input_inactive' : ''}`}
          disabled={!isFirstColumnValid}
          value={servicesFields.cost}
          onChange={(e) => setServicesFields({ ...servicesFields, cost: e.target.value })}
        />
      </div>
      <div className="register__container">
        <label className="register__label">График работы</label>
        <input
          name="schedule"
          required
          type="text"
          className={`register__input ${!isFirstColumnValid ? 'register__input_inactive' : ''}`}
          disabled={!isFirstColumnValid}
          value={servicesFields.schedule}
          onChange={(e) => setServicesFields({ ...servicesFields, schedule: e.target.value })}
        />
      </div>
    </div>
  );

  return (
    <section className="register register_type_big">
      <h2 className="register__title">Введите данные объявления</h2>
      <form className="register__form" onSubmit={handleSubmit}>
        <div className="register__columns">
          <div className="register__column">
            <h3 className="register__column-title">Общая информация:</h3>
            <div className="register__container">
              <label className="register__label">Тип объявления</label>
              <select
                name="type"
                required
                className="register__input register__input_type_select"
                onChange={(e) => {
                  handleChange(e);
                  setSelectedType(e.target.value);
                  // Очищаем поля второго столбца при изменении типа
                  setAutoFields({
                    brand: "",
                    model: "",
                    year: "",
                    mileage: "",
                  });
                  setRealEstateFields({
                    propertyType: "",
                    area: "",
                    rooms: "",
                    price: "",
                  });
                  setServicesFields({
                    serviceType: "",
                    experience: "",
                    cost: "",
                    schedule: "",
                  });
                }}
              >
                <option value="">Выберите тип</option>
                <option value="Авто">Авто</option>
                <option value="Недвижимость">Недвижимость</option>
                <option value="Услуги">Услуги</option>
              </select>
            </div>
            <div className="register__container">
              <label className="register__label">Название</label>
              <input
                name="name"
                required
                type="text"
                className="register__input"
                onChange={handleChange}
              />
            </div>
            <div className="register__container">
              <label className="register__label">Описание</label>
              <input
                name="description"
                required
                type="text"
                className="register__input"
                onChange={handleChange}
              />
            </div>
            <div className="register__container">
              <label className="register__label">Локация</label>
              <input
                name="location"
                required
                type="text"
                className="register__input"
                onChange={handleChange}
              />
            </div>
            <div className="register__container">
              <label className="register__label">Фотография</label>
              <input
                name="url"
                type="text"
                className="register__input"
                onChange={handleChange}
              />
            </div>
          </div>
          {renderFieldsForType()}
        </div>
        <button
          className={`register__button ${disabledForm ? "register__button_disabled" : ""}`}
          type="submit"
          disabled={disabledForm}
        >
          Выложить объявление
        </button>
      </form>
    </section>
  );
}

export default PostsFrom;
