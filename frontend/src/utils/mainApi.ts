interface User {
  _id: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
}

class MainApi {
  private _baseUrl: string;
  private _headers: HeadersInit;

  constructor(baseUrl: string, headers: HeadersInit) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  private async _handleRes(res: Response): Promise<User> {
    if (res.ok) {
      return res.json();
    } else {
      const errorMessage = `Ошибка: ${res.status}`;
    }
  }

  private _getHeaders(): HeadersInit {
    const jwt = localStorage.getItem("jwt");
    return {
      Authorization: `Bearer ${jwt}`,
      ...this._headers,
    };
  }

  // Получение информации о пользователе
  public async getUserInfo(): Promise<User> {
    try {
      const res = await fetch(`${this._baseUrl}/users/me`, {
        headers: this._getHeaders(),
      });
      return this._handleRes(res);
    } catch (err) {
      console.log(`Не удалось получить информацию о пользователе: ${err}`);
      return { success: false, message: `Не удалось получить информацию о пользователе: ${err}` };
    }
  }

  // Обновление информации о пользователе
  public async patchUserInfo({ name, surname, phone, email }: { name: string, surname: string, phone: string, email: string }): Promise<ApiResponse> {
    try {
      const res = await fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._getHeaders(),
        body: JSON.stringify({ name, surname, phone, email }),
      });
      return this._handleRes(res);
    } catch (err) {
      console.log(`Не удалось обновить информацию о пользователе: ${err}`);
      return { success: false, message: `Не удалось обновить информацию о пользователе: ${err}` };
    }
  }

  // Обновление аватара
  public async patchAvatar(data: { avatar: string }): Promise<User> {
    try {
      const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._getHeaders(),
        body: JSON.stringify({ avatar: data.avatar }),
      });
      return this._handleRes(res);
    } catch (err) {
      console.log(`Не удалось обновить аватар: ${err}`);
    }
  }
}

const api = new MainApi("https://auth.voldemar-avito.ru", {
  Accept: "application/json",
  "Content-Type": "application/json",
});

export default api;
