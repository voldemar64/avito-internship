interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
}

interface Post {
  _id?: string;
  name: string;
  description: string;
  location: string;
  url?: string;
  type: string;
  [key: string]: any; // Для других полей
}

class PostsApi {
  private readonly _baseUrl: string;
  private readonly _headers: HeadersInit;

  constructor(baseUrl: string, headers: HeadersInit) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  private async _handleRes(res: Response): Promise<ApiResponse> {
    if (res.ok) {
      if (res.status === 204) {
        return { success: true };
      }
      const data = await res.json();
      return { success: true, data };
    } else {
      const errorMessage = `Ошибка: ${res.status}`;
      return { success: false, message: errorMessage };
    }
  }

  private _getHeaders(): HeadersInit {
    const jwt = localStorage.getItem("jwt");
    return {
      Authorization: `Bearer ${jwt}`,
      ...this._headers,
    };
  }

  // Получить начальные посты
  public async getInitialPosts(): Promise<ApiResponse> {
    try {
      const res = await fetch(`${this._baseUrl}/items`, {
        method: "GET",
        headers: this._getHeaders(),
      });
      return this._handleRes(res);
    } catch (err) {
      console.log(`Не удалось получить начальные посты: ${err}`);
      return {
        success: false,
        message: `Не удалось получить начальные посты: ${err}`,
      };
    }
  }

  // Получить сохраненные посты
  public async getSavedPosts(userId: string): Promise<ApiResponse> {
    try {
      const res = await fetch(`${this._baseUrl}/items/saved?userId=${userId}`, {
        method: "GET",
        headers: this._getHeaders(),
      });
      return this._handleRes(res);
    } catch (err) {
      console.log(`Не удалось получить сохраненные посты: ${err}`);
      return {
        success: false,
        message: `Не удалось получить сохраненные посты: ${err}`,
      };
    }
  }

  // Добавить новый пост
  public async addNewPost(data: Post): Promise<ApiResponse> {
    try {
      const res = await fetch(`${this._baseUrl}/items`, {
        method: "POST",
        headers: this._getHeaders(),
        body: JSON.stringify(data),
      });
      return this._handleRes(res);
    } catch (err) {
      console.log(`Не удалось добавить новый пост: ${err}`);
      return {
        success: false,
        message: `Не удалось добавить новый пост: ${err}`,
      };
    }
  }

  // Обновить пост
  public async patchPost(post_id: string, data: Post): Promise<ApiResponse> {
    try {
      const res = await fetch(`${this._baseUrl}/items/${post_id}`, {
        method: "PATCH",
        headers: this._getHeaders(),
        body: JSON.stringify(data),
      });
      return this._handleRes(res);
    } catch (err) {
      console.log(`Не удалось обновить пост: ${err}`);
      return { success: false, message: `Не удалось обновить пост: ${err}` };
    }
  }

  // Удалить пост
  public async deletePost(id: string): Promise<ApiResponse> {
    try {
      const res = await fetch(`${this._baseUrl}/items/${id}`, {
        method: "DELETE",
        headers: this._getHeaders(),
      });
      return this._handleRes(res);
    } catch (err) {
      console.log(`Не удалось удалить пост: ${err}`);
      return { success: false, message: `Не удалось удалить пост: ${err}` };
    }
  }

  // Поставить лайк на пост
  public async likePost(post_id: string, userId: string): Promise<ApiResponse> {
    try {
      const res = await fetch(`${this._baseUrl}/items/${post_id}/likes`, {
        method: "PUT",
        headers: this._getHeaders(),
        body: JSON.stringify({ userId }),
      });
      return this._handleRes(res);
    } catch (err) {
      console.log(`Не удалось поставить лайк на пост: ${err}`);
      return {
        success: false,
        message: `Не удалось поставить лайк на пост: ${err}`,
      };
    }
  }

  // Снять лайк с поста
  public async dislikePost(
    post_id: string,
    userId: string,
  ): Promise<ApiResponse> {
    try {
      const res = await fetch(`${this._baseUrl}/items/${post_id}/likes`, {
        method: "DELETE",
        headers: this._getHeaders(),
        body: JSON.stringify({ userId }),
      });
      return this._handleRes(res);
    } catch (err) {
      console.log(`Не удалось снять лайк с поста: ${err}`);
      return {
        success: false,
        message: `Не удалось снять лайк с поста: ${err}`,
      };
    }
  }
}

const postsApi = new PostsApi("http://localhost:8080", {
  Accept: "application/json",
  "Content-Type": "application/json",
});

export default postsApi;
