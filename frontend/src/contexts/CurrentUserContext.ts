import React from "react";

// Типизация данных текущего пользователя
interface CurrentUser {
    _id: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
}

// Создание контекста с типом CurrentUser
export const CurrentUserContext = React.createContext<CurrentUser | undefined>(undefined);
