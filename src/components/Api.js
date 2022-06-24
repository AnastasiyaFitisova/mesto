export class Api {
  constructor(url, token) {
    this._url = url;
    this._token = token;
    this._headers = {
        'Content-type': 'application/json',
        'Authorization': this._token
      }
    };
  
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })

    .then((res) => {
      if(res.ok) {
        return res.json();
      }

      return Promise.reject('Возникла ошибка');
    });

  };

  addCard(inputName, inputLink) {
    const body = {
      name: inputName,
      link: inputLink
    };

    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(body)
    })

    .then((res) => {
      if(res.ok) {
        return res.json();
      }

      return Promise.reject('Возникла ошибка');
    });

  };

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }

      return Promise.reject('Возникла ошибка');
    });
  }

  correctUserInfo(userName, userPosition) {
    const body = {
      name: userName,
      about: userPosition
    };

    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(body)
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }

      return Promise.reject('Возникла ошибка');
    });
  };

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }

      return Promise.reject('Возникла ошибка');
    });
  };

  setLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }

      return Promise.reject('Возникла ошибка');
    });
  };

  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }

      return Promise.reject('Возникла ошибка');
    });
  };

};