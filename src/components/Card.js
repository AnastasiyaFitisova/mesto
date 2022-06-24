export class Card {
  constructor(data, templateSelector, handleOpenCardImage, userId, handleDeleteClick, handlelikeClick, handleDislikeClick) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._cardId = data._id;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._handleOpenCardImage = handleOpenCardImage;
    this._handleDeleteClick = handleDeleteClick;
    this._handlelikeClick = handlelikeClick;
    this._handleDislikeClick = handleDislikeClick;
  };

  //шаблон карточки
  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);

    return cardElement;
  };

  //удаление карточки
  handleCardDelete() {
    this._element.remove();
    this._element = null; 
  };

  //клик по изображению
  _handleCardPhotoClick = () => {
    this._handleOpenCardImage({name: this._name, link: this._link});
  };

  //клик по кнопке лайк
  setCardLike(data) {
    this._cardLikeButton.classList.add('card__like-button_activated');
    this._likes = data.likes;
    this._counter.textContent = String(this._likes.length);
  };

  setCardDislike(data) {
    this._cardLikeButton.classList.remove('card__like-button_activated');
    this._likes = data.likes;
    this._counter.textContent = String(this._likes.length);
  };

  _isLiked = () => this._likes.some((card) => card._id === this._ownerId);
 
  _handleLikeButtonClick = () => {
    if (this._isLiked()) {
      this._handleDislikeClick(this._data);
    } else {
      this._handlelikeClick(this._data);
    }
  }

  //создание карточки по шаблону
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    //отображение кнопки удаления карточки
    if (this._ownerId === this._userId) {
      this._cardDelButton.classList.add('card__del-button_activated');
    };

    //количество лайков карточки
    this._counter = this._element.querySelector('.card__like-counter');
    this._counter.textContent = this._likes.length;

    //отображение своего лайка
    if (this._isLiked()) {
      this.setCardLike
    };

    //заполнение карточки данными
    this._cardSubtitle = this._element.querySelector('.card__subtitle');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardSubtitle.textContent = this._name;

  return this._element; 
  };

  _setEventListeners() {
    this._cardLikeButton = this._element.querySelector('.card__like-button');
    this._cardDelButton = this._element.querySelector('.card__del-button');
    this._cardImage = this._element.querySelector('.card__image');

    this._cardLikeButton.addEventListener('click', this._handleLikeButtonClick);
    this._cardDelButton.addEventListener('click',() => this._handleDeleteClick(this._data));
    this._cardImage.addEventListener("click", this._handleCardPhotoClick);
  };
};