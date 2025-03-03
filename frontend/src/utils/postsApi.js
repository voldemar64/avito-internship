class PostsApi {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleRes(res) {
    if (res.ok) {
      if (res.status === 204) {
        return {};
      }
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getInitialPosts() {
    return fetch(`${this._baseUrl}/items`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      return this._handleRes(res);
    });
  }

  getSavedPosts(userId) {
    return fetch(`${this._baseUrl}/items/saved?userId=${userId}`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      return this._handleRes(res);
    });
  }

  addNewPost(data) {
    return fetch(`${this._baseUrl}/items`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => this._handleRes(res));
  }

  patchPost(post_id, data) {
    return fetch(`${this._baseUrl}/items/${post_id}`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      return this._handleRes(res);
    });
  }

  deletePost(id) {
    return fetch(`${this._baseUrl}/items/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._handleRes(res);
    });
  }

  likePost(post_id, userId) {
    return fetch(`${this._baseUrl}/items/${post_id}/likes`, {
      method: "PUT",
      headers: this._headers,
      body: JSON.stringify({ userId }),
    }).then((res) => this._handleRes(res));
  }

  dislikePost(post_id, userId) {
    return fetch(`${this._baseUrl}/items/${post_id}/likes`, {
      method: "DELETE",
      headers: this._headers,
      body: JSON.stringify({ userId }),
    }).then((res) => this._handleRes(res));
  }
}

const postsApi = new PostsApi("http://localhost:8080", {
  Accept: "application/json",
  "Content-Type": "application/json",
});

export default postsApi;
