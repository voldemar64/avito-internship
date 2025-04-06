interface User {
  _id?: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
}

// Тип для ответа с сервера
interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
}

class MainApi {
  private readonly _baseUrl: string;
  private readonly _headers: HeadersInit;

  constructor(baseUrl: string, headers: HeadersInit) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  private async _handleRes(res: Response): Promise<ApiResponse> {
    if (res.ok) {
      const data = await res.json();
      return { success: true, data };
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
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
  public async getUserInfo(): Promise<ApiResponse> {
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
  public async patchUserInfo({ name, surname, phone, email }: User): Promise<ApiResponse> {
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
}

const api = new MainApi("http://localhost:5000", {
  "Accept": "application/json",
  "Content-Type": "application/json",
});

export default api;
