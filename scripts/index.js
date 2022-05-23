import {initialCards} from './cards.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

//редактирование информации профиля
const profileCorrectButton = document.querySelector('.profile__set-button'); //кнопка редактировать профиль
const profileCorrectWindow = document.querySelector('.popup_correct-info');//попап редактирования профиля
const profileCorrectCloseButton = profileCorrectWindow.querySelector('.popup__close-button');//кнопка закрытия редактирования
const profileFormElement = profileCorrectWindow.querySelector('.popup__form');//форма редактирования
const nameInput = profileFormElement.querySelector('.popup__input_type_name');//строка ввода имени
const jobInput = profileFormElement.querySelector('.popup__input_type_position');//строка ввода профессии
const profileName = document.querySelector('.profile__name');
const profilePosition = document.querySelector('.profile__position');


const cardsContainer = document.querySelector('.elements__cardholder');//<ul> список карточек

//ручное добавление новых карточек
const cardAddButton = document.querySelector('.profile__add-button');//кнопка добавления карточки
const cardModalWindow = document.querySelector('.popup_add-card');//форма для добавления карточки
const cardModalCloseButton = cardModalWindow.querySelector('.popup__close-button');//кнопка закрытия формы добавления карточки
const cardFormContainer = cardModalWindow.querySelector('.popup__content_add-card');
const addCardFormElement = cardModalWindow.querySelector('.popup__form')

//просмотр изображений
const imageModalWindow = document.querySelector('.popup_img-view'); //popup просмотра изображения
const bigImage = imageModalWindow.querySelector('.popup__image'); //изображение
const bigImagegDescription = imageModalWindow.querySelector('.popup__place-description'); //описание изображения
const imageModalWindowClose = imageModalWindow.querySelector('.popup__close-button');

//создание экземпляров класса FormValidator

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonSelector: "popup__submit-button_disabled",
  inputErrorSelector: "popup__input_not-valid"
};

const profileForm = new FormValidator(config, profileFormElement);
const addCardForm = new FormValidator(config, addCardFormElement);

profileForm.enableValidation();
addCardForm.enableValidation();

//функции открытия и закрытия попап
function handleOpenPopup(popup) {
  popup.classList.add('popup_activated');
  document.addEventListener('keydown', closePopupOnEcs);
};

function handleClosePopup(popup) {
  popup.classList.remove('popup_activated');
  document.removeEventListener('keydown', closePopupOnEcs);
};

//закрытие попап нажатием на оверлей
function closePopupOnOverlay() {
  const overlays = Array.from(document.querySelectorAll('.popup'))

  overlays.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
        handleClosePopup(popup)
      }
    });
  });
};

closePopupOnOverlay();

//закрытие попап нажатием на Esc
function closePopupOnEcs(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_activated');
    handleClosePopup(openedPopup);
  };
};

//функции редактирования профиля
function openProfilePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profilePosition.textContent;
  handleOpenPopup(profileCorrectWindow);
};
function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profilePosition.textContent = jobInput.value
    handleClosePopup(profileCorrectWindow)
};

//функции загрузки карточек на страницу
function createCard(data) {
  const card = new Card(data, '.template', openFullSizeImage);
  const cardElement = card.generateCard();
  return cardElement;
};

function renderCard ({name, link}) {
  cardsContainer.prepend(createCard({name, link}));
}

function addInitialCards() {
  initialCards.forEach(renderCard);
};

addInitialCards();

//предзаполнение и открытие модального окна с увеличенным изображнием
function openFullSizeImage(item) {
  bigImage.src = item.link;
  bigImage.alt = item.name;
  bigImagegDescription.textContent = item.name;
  handleOpenPopup(imageModalWindow);
};
  
//функции ручного добавления новых карточек
function handleAddCard(evt) { 
  evt.preventDefault();
  const newPlaceName = cardModalWindow.querySelector('.popup__input_type_place').value;
  const newPlacePhoto = cardModalWindow.querySelector('.popup__input_type_link').value;
  renderCard({name: newPlaceName, link: newPlacePhoto})
  handleClosePopup(cardModalWindow);
  evt.target.reset();
};

//просмотр увеличенного изображения - закрытие
imageModalWindowClose.addEventListener('click', function() {
  handleClosePopup(imageModalWindow)
});

//слушатели риедктирования профиля
profileCorrectButton.addEventListener('click', function () {
  openProfilePopup();
  profileForm.deleteErrorInfo();
});
profileCorrectCloseButton.addEventListener('click', function() {
  handleClosePopup(profileCorrectWindow)
});
profileFormElement.addEventListener('submit', handleProfileFormSubmit);

//слушатели ручного добавления карточек
cardAddButton.addEventListener('click', function() {
  handleOpenPopup(cardModalWindow);
  addCardForm.deleteErrorInfo();
  addCardForm.toggleButton()
});
cardModalCloseButton.addEventListener('click', ()=>handleClosePopup(cardModalWindow));
cardFormContainer.addEventListener('submit', handleAddCard);