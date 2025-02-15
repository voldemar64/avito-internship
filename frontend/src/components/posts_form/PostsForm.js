import "./PostsForm.css";
import "../register/Register.css";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function PostsFrom({ onSubmit, onEditSubmit, post, onExit }) {
  const currentUser = React.useContext(CurrentUserContext);
  let location = useLocation();


  const [selectedType, setSelectedType] = useState("");
  const [firstColumnFields, setFirstColumnFields] = useState({
    name: "",
    description: "",
    location: "",
    url: "",
  });

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

  const [isFirstColumnValid, setIsFirstColumnValid] = useState(false);
  const [disabledForm, setDisabledForm] = useState(true);

  useEffect(() => {
    if (location.pathname !== "http://localhost:3000/form") {
      onExit();
    }
  }, [location]);

  useEffect(() => {
    if (post) {
      setSelectedType(post.type);
      setIsFirstColumnValid(true);
      setFirstColumnFields({
        name: post.name,
        description: post.description,
        location: post.location,
        url: post.url || "",
      });
      if (post.type === "Авто") {
        setAutoFields({
          brand: post.brand,
          model: post.model,
          year: post.year,
          mileage: post.mileage,
        });
      } else if (post.type === "Недвижимость") {
        setRealEstateFields({
          propertyType: post.propertyType,
          area: post.area,
          rooms: post.rooms,
          price: post.price,
        });
      } else if (post.type === "Услуги") {
        setServicesFields({
          serviceType: post.serviceType,
          experience: post.experience,
          cost: post.cost,
          schedule: post.schedule,
        });
      }
    }
  }, [post]);

  useEffect(() => {
    setIsFirstColumnValid(firstColumnFields.name && firstColumnFields.description && firstColumnFields.location);
  }, [firstColumnFields]);

  useEffect(() => {
    const isFormValid = selectedType && isFirstColumnValid &&
      (selectedType === "Авто" ? autoFields.brand && autoFields.model && autoFields.year && autoFields.mileage :
        selectedType === "Недвижимость" ? realEstateFields.propertyType && realEstateFields.area && realEstateFields.rooms && realEstateFields.price :
          selectedType === "Услуги" ? servicesFields.serviceType && servicesFields.experience && servicesFields.cost && servicesFields.schedule :
            true);

    const isUrlValid = !firstColumnFields.url || /^https?:\/\/[^\s/$.?#].[^\s]*$/.test(firstColumnFields.url);

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
    firstColumnFields.url,
  ]);

  function handleSubmit(e) {
    e.preventDefault();
    const user_id = currentUser._id;

    const dataToSubmit = {
      name: firstColumnFields.name,
      description: firstColumnFields.description,
      location: firstColumnFields.location,
    };

    if (firstColumnFields.url) {
      dataToSubmit.url = firstColumnFields.url;
    }

    dataToSubmit.type = selectedType;
    dataToSubmit.owner = user_id;

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

    if (post) {
      const post_id = post._id;
      onEditSubmit(post_id, dataToSubmit);
    } else {
      console.log(dataToSubmit);
      onSubmit(dataToSubmit);
    }
  }

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
          defaultValue={autoFields.brand}
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
          defaultValue={autoFields.model}
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
          defaultValue={autoFields.year}
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
          defaultValue={autoFields.mileage}
          onChange={(e) => setAutoFields({ ...autoFields, mileage: e.target.value })}
        />
      </div>
    </div>
  );

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
          defaultValue={realEstateFields.propertyType}
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
          defaultValue={realEstateFields.area}
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
          defaultValue={realEstateFields.rooms}
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
          defaultValue={realEstateFields.price}
          onChange={(e) => setRealEstateFields({ ...realEstateFields, price: e.target.value })}
        />
      </div>
    </div>
  );

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
          defaultValue={servicesFields.serviceType}
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
          defaultValue={servicesFields.experience}
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
          defaultValue={servicesFields.cost}
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
          defaultValue={servicesFields.schedule}
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
                value={selectedType}
                onChange={(e) => {
                  setSelectedType(e.target.value);
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
                defaultValue={firstColumnFields.name}
                onChange={(e) => setFirstColumnFields({ ...firstColumnFields, name: e.target.value })}
              />
            </div>
            <div className="register__container">
              <label className="register__label">Описание</label>
              <input
                name="description"
                required
                type="text"
                className="register__input"
                defaultValue={firstColumnFields.description}
                onChange={(e) => setFirstColumnFields({ ...firstColumnFields, description: e.target.value })}
              />
            </div>
            <div className="register__container">
              <label className="register__label">Локация</label>
              <input
                name="location"
                required
                type="text"
                className="register__input"
                defaultValue={firstColumnFields.location}
                onChange={(e) => setFirstColumnFields({ ...firstColumnFields, location: e.target.value })}
              />
            </div>
            <div className="register__container">
              <label className="register__label">Фотография</label>
              <input
                name="url"
                type="text"
                className="register__input"
                defaultValue={firstColumnFields.url}
                onChange={(e) => setFirstColumnFields({ ...firstColumnFields, url: e.target.value })}
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
