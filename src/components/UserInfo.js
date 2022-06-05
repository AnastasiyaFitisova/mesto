export class UserInfo {
  constructor({userName, userPosition}) {
    this._userName = document.querySelector(userName);
    this._userPosition = document.querySelector(userPosition);
  };

  getUserInfo() {
    this._userData = {
      name: this._userName.textContent,
      position: this._userPosition.textContent
    };

    return this._userData;
  };

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userPosition.textContent = data.position;
  };

};