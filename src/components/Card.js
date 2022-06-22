export class Card {
  constructor(data, templateSelector, handleOpenCardImage, userID, handleDeleteClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleOpenCardImage = handleOpenCardImage;
    this._userID = userID;
    this._ownerId = data.owner._id;
    this._handleDeleteClick = handleDeleteClick;
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
    this._cardLikeButton.classList.toggle('card__like-button_activated');
  };

  handleCardDelete() {
    this._element.remove();
    this._element = null; 
  };

  _handleCardPhotoClick = () => {
    this._handleOpenCardImage({name: this._name, link: this._link});
  };

  _setEventListeners() {
    this._cardLikeButton = this._element.querySelector('.card__like-button');
    this._cardDelButton = this._element.querySelector('.card__del-button');
    this._cardImage = this._element.querySelector('.card__image');

    this._cardLikeButton.addEventListener('click', () => this._handleLikeClick());
    this._cardDelButton.addEventListener('click',() => this._handleDeleteClick(this));
    this._cardImage.addEventListener("click", this._handleCardPhotoClick);
  };

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._cardDelButton = this._element.querySelector('.card__del-button');
    if (this._ownerId === this._userId) {
      this._cardDelButton.classList.add('card__del-button_activated');
    };
    
    this._cardSubtitle = this._element.querySelector('.card__subtitle');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardSubtitle.textContent = this._name;
  
  return this._element; 
  };

};