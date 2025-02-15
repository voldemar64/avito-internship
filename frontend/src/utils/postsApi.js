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
            method: 'GET',
            headers: this._headers
        })
            .then(res => {
                return this._handleRes(res);
            })
    }

    addNewPost(id, data) {
        const dataToSend = {
            name: data.name,
            description: data.description,
            location: data.location,
            type: data.type,
            owner: id,
        };

        if (data.url) {
            dataToSend.url = data.url;
        }

        if (data.type === "Авто") {
            dataToSend.brand = data.brand;
            dataToSend.model = data.model;
            dataToSend.year = data.year;
            if (data.mileage) {
                dataToSend.mileage = data.mileage;
            }
        } else if (data.type === "Недвижимость") {
            dataToSend.propertyType = data.propertyType;
            dataToSend.area = data.area;
            dataToSend.rooms = data.rooms;
            dataToSend.price = data.price;
        } else if (data.type === "Услуги") {
            dataToSend.serviceType = data.serviceType;
            dataToSend.experience = data.experience;
            dataToSend.cost = data.cost;
            dataToSend.schedule = data.schedule;
        }

        return fetch(`${this._baseUrl}/items`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(dataToSend),
        })
          .then(res => this._handleRes(res))
    }


    patchPost(data) {
        return fetch(`${this._baseUrl}/items/${data._id}`, {
            method: 'PUT',
            headers:this._headers,
            body: JSON.stringify(data)
        })
            .then(res => {
                return this._handleRes(res);
            })
    }

    deletePost(id) {
        return fetch(`${this._baseUrl}/items/${id}`, {
            method: 'DELETE',
            headers:this._headers
        })
            .then(res => {
                return this._handleRes(res);
            })
    }
}

const postsApi = new PostsApi(
    'http://localhost:8080',
    {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
);

export default postsApi;