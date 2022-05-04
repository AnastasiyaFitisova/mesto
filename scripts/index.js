//редактирование информации профиля
const profileCorrectButton = document.querySelector('.profile__set-button'); //кнопка редактировать профиль
const profileCorrectWindow = document.querySelector('.popup_correct-info');//попап редактирования профиля
const profileCorrectCloseButton = profileCorrectWindow.querySelector('.popup__close-button');//кнопка закрытия редактирования
const profileFormElement = profileCorrectWindow.querySelector('.popup__form');//форма редактирования
const nameInput = profileFormElement.querySelector('.popup__input_type_name');//строка ввода имени
const jobInput = profileFormElement.querySelector('.popup__input_type_position');//строка ввода профессии
const profileName = document.querySelector('.profile__name');
const profilePosition = document.querySelector('.profile__position');

//загрузка карточек
const cardsContainer = document.querySelector('.elements__cardholder');//<ul>
const template = document.querySelector('.template');//шаблон карточки

//ручное добавление новых карточек
const cardAddButton = document.querySelector('.profile__add-button');//кнопка добавления карточки
const cardModalWindow = document.querySelector('.popup_add-card');//форма для добавления карточки
const cardModalCloseButton = cardModalWindow.querySelector('.popup__close-button');//кнопка закрытия формы добавления карточки
const cardFormContainer = cardModalWindow.querySelector('.popup__content_add-card');

//просмотр изображений
const imageModalWindow = document.querySelector('.popup_img-view'); //popup просмотра изображения
const bigImage = imageModalWindow.querySelector('.popup__image'); //изображение
const bigImagegDescription = imageModalWindow.querySelector('.popup__place-description'); //описание изображения
const imageModalWindowClose = imageModalWindow.querySelector('.popup__close-button');

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
function getInitialInput() {
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
function renderCard ({name, link}) {
  cardsContainer.prepend(createCard({name, link}));
}
function addInatialCards() {
  initialCards.forEach(renderCard);
};

function createCard(item){
  const cardTemplate = template.content.cloneNode(true);
  const cardImage = cardTemplate.querySelector('.card__image');//изображение места
  const cardSubtitle = cardTemplate.querySelector('.card__subtitle');//название места

  cardSubtitle.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

  const cardLikeButton = cardTemplate.querySelector('.card__like-button');//кнопка like
  const cardDeleteButton = cardTemplate.querySelector('.card__del-button');//кнопка удаления карточки

  cardDeleteButton.addEventListener('click', handleCardDelete);
  cardLikeButton.addEventListener('click', handleLikeClick);

//просмотр увеличенного изображения - открытие
  function getImageInput() {
    bigImage.src = cardImage.src;
    bigImage.alt = cardImage.alt;
    bigImagegDescription.textContent = cardSubtitle.textContent;
    handleOpenPopup(imageModalWindow);
  };

  cardImage.addEventListener('click', getImageInput);
  
  return cardTemplate;
};

addInatialCards();

//функции лайк и удаление карточек
function handleLikeClick(evt) {
  evt.target.classList.toggle('card__like-button_activated');
};
function handleCardDelete(evt) {
  const deletedElement = evt.target.closest('.card');
  deletedElement.remove();
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
  getInitialInput();
  deleteErrorInfo(config, profileCorrectWindow);
});
profileCorrectCloseButton.addEventListener('click', function() {
  handleClosePopup(profileCorrectWindow)
});
profileFormElement.addEventListener('submit', handleProfileFormSubmit);

//слушатели ручного добавления карточек
cardAddButton.addEventListener('click', function() {
  handleOpenPopup(cardModalWindow);
  deleteErrorInfo(config, cardModalWindow);
  const button = cardModalWindow.querySelector('.popup__submit-button')
  const inputs = Array.from(cardModalWindow.querySelectorAll('.popup__input'))
  toggleButton(button, inputs, config)
});
cardModalCloseButton.addEventListener('click', ()=>handleClosePopup(cardModalWindow));
cardFormContainer.addEventListener('submit', handleAddCard);