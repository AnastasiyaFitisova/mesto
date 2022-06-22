export class UserInfo {
  constructor({userName, userPosition, userAvatar}) {
    this._userName = document.querySelector(userName);
    this._userPosition = document.querySelector(userPosition);
    this._userAvatar = document.querySelector(userAvatar);
  };
  
  getUserInfo() {
    this._userData = {
      name: this._userName.textContent,
      about: this._userPosition.textContent,
      avatar: this._userAvatar.src,
    };

    return this._userData;
  };
  

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userPosition.textContent = data.about;
    this._userAvatar.src = data.avatar;
  };

};