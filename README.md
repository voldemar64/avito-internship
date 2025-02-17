﻿# Клон Авито: Веб-приложение для размещения и управления объявлениями

## [Сcылка на проект](https://www.voldemar-avito.ru)

## Описание проекта

Проект представляет собой клон Авито, реализованный с использованием технологий **M**ongoDB, **e**xpress.js, **R**eact и **N**ode.js(**MERN**). Приложение позволяет пользователям регистрироваться, авторизовываться, размещать, редактировать и просматривать объявления в трех категориях: недвижимость, авто и услуги. Реализована маршрутизация, форма для размещения и редактирования объявлений, фильтрация и поиск объявлений.

## Стек технологий

- **Node.js** v22.13.0
- **React** v19.0.0
- **React Router DOM** для роутинга
- **Express.js** для бэкенда
- **MongoDB** для хранения данных о пользователях и объявлениях
- **Webpack** для сборки
- **ESLint** и **Prettier** для обеспечения качества кода

## Структура проекта

Проект разделен на **три части**: 
  1. Клиентскую(фронтенд) 
  2. Серверную, отвечающую за систему авторизации(бэкенд) 
  3. Серверную, отвечающую за работу с объявлениями(бэкенд)


### Фронтенд

#### Директории

- `src/` — исходный код приложения
    - `components/` — компоненты React для отображения различных частей интерфейса
    - `contexts/` — контекст пользователя
    - `images/` — изображения
    - `utils/` — утилиты, например, функции валидации, работа с API
    - `vendor/` — шрифты и *normalize.css*
- файлы конфигураций babelrc, eslint и webpack

### Бэкенд(авторизация)
#### Архитектура проекта - `MVC(Model, View, Controller)`
#### Директории

- `controllers/` — функции, обрабатывающие `routes`
- `errors/` — кастомные ошибки(используются и в бэкенде объявлений)
- `middlewares/` — функции, обрабатывающие валидацию, логирование, ошибки, cors
- `models/` — модель `user` с валидацией
- `routes/` — роуты для бэкенда
- `app.js` — точка входа

### Бэкенд(объявления)
#### Архитектура проекта - `MVC(Model, View, Controller)`
#### Директории

- `controllers/` — функции, обрабатывающие `routes`
- `middlewares/` — функции, обрабатывающие валидацию логирование, ошибки, cors
- `models/` — модель `item` с валидацией
- `routes/` — роуты для бэкенда
- `app.js` — точка входа

### DevOps
#### Настройка виртуальной машины включала в себя:
- `pm2` — установка и запуск для корректной работы `Node.js`
- `domain` — создание и связка доменного имени с `ip` вм
- `nginx` — установка и создание конфигурации
- `https` — выпуск `SSL` сертификатов для шифрования и безопасного подключения
- `CORS` — кастомная настройка кроссдоменных запросов

### Подробнее о фронтенде
#### Выполнены функциональные требования:
  - **Размещение объявлений:** форма с несколькими шагами для размещения объявлений
  - **Список объявлений**: отображение всех размещённых объявлений
  - **Просмотр объявлений:** детальная карточка объявления с возможностью редактирования
  - **Редактирование объявлений:** изменение существующих объявлений с предзаполненными данными
  - **Авторизация: (Дополнительно)** авторизация пользователей для размещения и редактирования объявлений

#### Маршрутизация
  - `/form` — для размещение и редактирования объявлений
  - `/list` — для отображения списка объявлений
  - `/item/:id` — для просмотра конкретного объявления

#### Шаги формы

#### Основной шаг (для всех категорий)
  - **Категория объявления** (выпадающий список: Недвижимость, Авто, Услуги) (обязательное)
  - **Название** (обязательное)
  - **Описание** (обязательное)
  - **Локация** (обязательное)
  - **Фото** (необязательное)

#### Категорийный шаг
Зависит от выбранной категории для объявления:

**- Недвижимость:**
  - Тип недвижимости (например: квартира, дом, коттедж и т.д.) (выпадающий список, обязательное, строка)
  - Площадь (кв. м, обязательное, число)
  - Количество комнат (обязательное, число)
  - Цена (обязательное, число)

**- Авто:**
  - Марка (выпадающий список, обязательное, строка)
  - Модель (обязательное, строка)
  - Год выпуска (обязательное, число)
  - Пробег (км, обязательное, число)

**- Услуги:**
  - Тип услуги (например: ремонт, уборка, доставка) (выпадающий список, обязательное, строка)
  - Опыт работы (лет, обязательное, число)
  - Стоимость (обязательное, число)
  - График работы (обязательное, строка)

### Список объявлений
  - Изначальное количество объявлений на странице — 5
  - После размещения объявление отображается в списке на маршруте `/list`
  - На странице есть кнопка «Разместить объявление», которая ведёт на форму
  - Превью объявления в списке показывает фото (или заглушку, если фото нет), название, кнопки «Изменить» и «Удалить», если пользователь добавил это объявление
  - Есть кнопка «Открыть», которая ведёт на страницу объявления `/item/:id`, реализована через нажатие на фото
  - Реализован поиск объявления по названию
  - Реализована пагинация (на клиенте)
  - Реализована фильтрация по категории объявления
  
### Просмотр и редактирование
  - При клике на фото объявления в списке открывается подробная карточка со всем полями
  - Реализована возможность редактирования объявления: переход на `/form` с предзаполненными данными

### Сохранение данных
- При перезагрузке страницы данные для поиска сохраняются в черновик

## Установка

1. Клонируйте репозиторий, установите зависимости и запустите фронтенд проекта
2. Рекомендуется запускать локально только фронтенд, поскольку он завязан на работе удаленного бэкенда для удобной отладки и тестирования
```bash
git clone git@github.com:voldemar64/avito-internship.git
cd avito-internship
cd frontend
npm install
npm run start
