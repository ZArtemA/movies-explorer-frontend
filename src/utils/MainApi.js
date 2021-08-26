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

      
  
  register = (name, email, password) => {
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
  
  
  authorize = (email, password) => {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: this._headers,
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

  getPersonInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
    }).then(response => {
        return this._getResJson(response);
    })
  };

patchPersonInfo({name, email}) {
    return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
            name: name,
            email: email
        })
    }).then(response => {
        return this._getResJson(response);
    });
}


    getInitialCards() {
        return fetch(`${this._url}/movies`, {
            headers: this._headers,
        }).then(response => {
            return this._getResJson(response);
        });
    }


    addCard({ name, link }) {
        return fetch(`${this._address}/v1/${this._groupID}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(response => {
                return this._getResJson(response);
            })
    }

    removeCard(_id) {
        return fetch(`${this._address}/v1/${this._groupID}/cards/${_id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(response => {
                if (response.ok) {
                    return Promise.resolve("done");
                }
                return Promise.reject(new Error(`Ошибка: ${response.status}`));
            })
    }
    
}

export default new MainApi({
    url: `https://api.artem-diplomaproject.nomoredomains.club/`,
    headers: {
        Accept: "application/json",
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    });
