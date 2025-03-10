export const BASE_URL = "https://auth.voldemar-avito.ru";

// Типы для данных, которые мы отправляем в запросах
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

// Тип для ответа с сервера
interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export async function register({name, surname, phone, email, password}: RegisterRequest): Promise<ApiResponse> {
  try {
    const res = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name, surname, phone, email, password}),
    });
    return handleRes(res);
  } catch (err) {
    console.log(`Не удалось зарегистрироваться: ${err}`);
    return { success: false, message: `Не удалось зарегистрироваться: ${err}` };
  }
}

export async function authorize({email, password}: LoginRequest): Promise<ApiResponse> {
  try {
    const res = await fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email, password}),
    });
    return handleRes(res);
  } catch (err) {
    console.log(`Не удалось авторизоваться: ${err}`);
    return { success: false, message: `Не удалось авторизоваться: ${err}` };
  }
}

export async function sendCode({email}: SendCodeRequest): Promise<ApiResponse> {
  try {
    const res = await fetch(`${BASE_URL}/send-code`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email}),
    });
    return handleRes(res);
  } catch (err) {
    console.log(`Не удалось подтвердить почту: ${err}`)
    return { success: false, message: `Не удалось подтвердить почту: ${err}`};
  }
}

export async function resetPassword({email, password, code}: ResetPasswordRequest): Promise<ApiResponse> {
  try {
    const res = await fetch(`${BASE_URL}/reset-password`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email, password, code}),
    });
    return handleRes(res);
  } catch (err) {
    console.log(`Не удалось сменить пароль: ${err}`);
    return { success: false, message: `Не удалось сменить пароль: ${err}` }
  }
}

// Обработка ответа
function handleRes(res: Response): Promise<ApiResponse> {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}
