class MainApi {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }


    _getResJson(response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(new Error(`Ошибка: ${response.status}`));
    }

      
  
  register(name, email, password) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
      body: JSON.stringify(name, email, password)
    })
      .then(response => {
        return this._getResJson(response);
      })
  };
  
  
  authorize(email, password) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
      body: JSON.stringify({ password, email })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          return data;
        }
      });
  };

  getPersonInfo(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    },
    }).then(response => {
        return this._getResJson(response);
    })
  };

patchPersonInfo({name, email}, token) {
    return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            name: name,
            email: email
        })
    }).then(response => {
        return this._getResJson(response);
    });
}


    getInitialCards(token) {
        return fetch(`${this._url}/movies`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }).then(response => {
            return this._getResJson(response);
        });
    }


    addCard(data, token) {
        return fetch(`${this._url}/movies`, {
            method: 'POST',
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              country: data.country,
              director: data.director,
              duration: data.duration,
              year: data.year,
              description: data.description,
              image: data.image,
              trailer: data.trailer,
              thumbnail: data.image,
              movieId: data.id,
              nameRU: data.nameRU,
              nameEN: data.nameEN,
            })
        })
            .then(response => {
                return this._getResJson(response);
            })
    }

    removeCard(id, token) {
        return fetch(`${this._url}/movies/${id}`, {
            method: 'DELETE',
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                if (response.ok) {
                    return Promise.resolve("done");
                }
                return Promise.reject(new Error(`Ошибка: ${response.status}`));
            })
    }

    checkToken(token) {
      return fetch(`${this._address}/users/me`, {
        headers: {
          Accept: "application/json",
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      }).then(this._checkResponse);
    }
    
}

export default new MainApi({url: `https://api.artem-diplomaproject.nomoredomains.club/`});
