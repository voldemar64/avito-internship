interface RegisterRequest {
  name: string;
  surname: string;
  phone: string;
  email: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface SendCodeRequest {
  email: string;
}

interface ResetPasswordRequest {
  email: string;
  password: string;
  code: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
}

class AuthApi {
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

  // Регистрация нового пользователя
  public async register({
    name,
    surname,
    phone,
    email,
    password,
  }: RegisterRequest): Promise<ApiResponse> {
    try {
      const res = await fetch(`${this._baseUrl}/signup`, {
        method: "POST",
        headers: this._getHeaders(),
        body: JSON.stringify({ name, surname, phone, email, password }),
      });
      return this._handleRes(res);
    } catch (err) {
      console.log(`Не удалось зарегистрироваться: ${err}`);
      return {
        success: false,
        message: `Не удалось зарегистрироваться: ${err}`,
      };
    }
  }

  // Авторизация пользователя
  public async authorize({
    email,
    password,
  }: LoginRequest): Promise<ApiResponse> {
    try {
      const res = await fetch(`${this._baseUrl}/signin`, {
        method: "POST",
        headers: this._getHeaders(),
        body: JSON.stringify({ email, password }),
      });
      return this._handleRes(res);
    } catch (err) {
      console.log(`Не удалось авторизоваться: ${err}`);
      return { success: false, message: `Не удалось авторизоваться: ${err}` };
    }
  }

  // Отправка кода на почту
  public async sendCode({ email }: SendCodeRequest): Promise<ApiResponse> {
    try {
      const res = await fetch(`${this._baseUrl}/send-code`, {
        method: "POST",
        headers: this._getHeaders(),
        body: JSON.stringify({ email }),
      });
      return this._handleRes(res);
    } catch (err) {
      console.log(`Не удалось подтвердить почту: ${err}`);
      return {
        success: false,
        message: `Не удалось подтвердить почту: ${err}`,
      };
    }
  }

  // Сброс пароля
  public async resetPassword({
    email,
    password,
    code,
  }: ResetPasswordRequest): Promise<ApiResponse> {
    try {
      const res = await fetch(`${this._baseUrl}/reset-password`, {
        method: "POST",
        headers: this._getHeaders(),
        body: JSON.stringify({ email, password, code }),
      });
      return this._handleRes(res);
    } catch (err) {
      console.log(`Не удалось сменить пароль: ${err}`);
      return { success: false, message: `Не удалось сменить пароль: ${err}` };
    }
  }
}

const authApi = new AuthApi("http://localhost:5000", {
  Accept: "application/json",
  "Content-Type": "application/json",
});

export default authApi;
