export class Card {

  constructor(data, templateSelector, handleOpenCardImage) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleOpenCardImage = handleOpenCardImage;
  };

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);

    return cardElement;
  };

  _handleLikeClick() {
    this._element.querySelector('.card__like-button').classList.toggle('card__like-button_activated');
  };

  _handleCardDelete() {
    this._element.remove();
    this._element = null;
  };

  _handleCardPhotoClick = () => {
    this._handleOpenCardImage({name: this._name, link: this._link});
  };

  _setEventListeners() {
    this._element.querySelector('.card__like-button').addEventListener('click', () => this._handleLikeClick());
    this._element.querySelector('.card__del-button').addEventListener('click',() => this._handleCardDelete());
    this._element.querySelector('.card__image').addEventListener("click", this._handleCardPhotoClick)
  };

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;
    this._element.querySelector('.card__subtitle').textContent = this._name;
  
  return this._element; 
  };

};





