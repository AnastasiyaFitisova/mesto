//редактирование информации профиля
const profileCorrectButton = document.querySelector('.profile__set-button'); //кнопка редактировать профиль
const profileCorrectWindow = document.querySelector('.popup_correct-info');//попап редактирования профиля
const profileCorrectCloseButton = profileCorrectWindow.querySelector('.popup__close-button');//кнопка закрытия редактирования
const profileFormElement = profileCorrectWindow.querySelector('.popup__form');//форма редактирования
const nameInput = profileFormElement.querySelector('.popup__input_type_name');//строка ввода имени
const jobInput = profileFormElement.querySelector('.popup__input_type_position');//строка ввода профессии
const profileName = document.querySelector('.profile__name');
const profilePosition = document.querySelector('.profile__position');

//ручное добавление новых карточек
const cardAddButton = document.querySelector('.profile__add-button');//кнопка добавления карточки
const cardModalWindow = document.querySelector('.popup_add-card');//форма для добавления карточки
const cardModalCloseButton = cardModalWindow.querySelector('.popup__close-button');//кнопка закрытия формы добавления карточки
const cardFormContainer = cardModalWindow.querySelector('.popup__content_add-card');
const addCardFormElement = cardModalWindow.querySelector('.popup__form')


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonSelector: "popup__submit-button_disabled",
  inputErrorSelector: "popup__input_not-valid"
};

export {profileCorrectButton, profileCorrectWindow, profileCorrectCloseButton, profileFormElement, nameInput, jobInput,
  profileName, profilePosition, cardAddButton, cardModalWindow, cardModalCloseButton, cardFormContainer, 
  addCardFormElement, initialCards, config}