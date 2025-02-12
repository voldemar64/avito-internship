export const BASE_URL = "http://localhost:5000";

export function register(name, surname, phone, email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      surname: surname,
      phone: phone,
      password: password,
      email: email,
    }),
  })
    .then(handleRes)
    .catch((err) => console.log(`не удалось зарегистрироваться: ${err}`));
}

export function authorize(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: password, email: email }),
  })
    .then(handleRes)
    .catch((err) => console.log(`не удалось авторизоваться: ${err}`));
}

export function sendCode(email) {
  return fetch(`${BASE_URL}/send-code`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email }),
  })
      .then(handleRes)
      .catch((err) => console.log(`не удалось подтвердить почту: ${err}`))
}

export function resetPassword(email, password, code) {
  return fetch(`${BASE_URL}/reset-password`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: password, email: email, code: code }),
  })
    .then(handleRes)
    .catch((err) => console.log(`не удалось сменить пароль: ${err}`))
}

export function checkToken(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(handleRes)
    .catch((err) => console.log(err));
}

function handleRes(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}
