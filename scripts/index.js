//редактирование информации профиля
let profileCorrectButton = document.querySelector('.profile__set-button'); //кнопка редактировать профиль
let profileCorrectWindow = document.querySelector('.popup_correct-info');//попап редактирования профиля
let profileCorrectCloseButton = profileCorrectWindow.querySelector('.popup__close-button');//кнопка закрытия редактирования
let profileFormElement = profileCorrectWindow.querySelector('.popup__form');//форма редактирования
let nameInput = profileFormElement.querySelector('.popup__input_type_name');//строка ввода имени
let jobInput = profileFormElement.querySelector('.popup__input_type_position');//строка ввода профессии
let profileName = document.querySelector('.profile__name');
let profilePosition = document.querySelector('.profile__position');

//загрузка карточек
const cardsContainer = document.querySelector('.elements__cardholder');//<ul>
const template = document.querySelector('.template');//шаблон карточки

//ручное добавление новых карточек
const cardAddButton = document.querySelector('.profile__add-button');//кнопка добавления карточки
const cardModalWindow = document.querySelector('.popup_add-card');//форма для добавления карточки
const cardModalCloseButton = cardModalWindow.querySelector('.popup__close-button');//кнопка закрытия формы добавления карточки
const cardFormSubmit = cardModalWindow.querySelector('.popup__content_add-card');

//просмотр изображений
const imageModalWindow = document.querySelector('.popup_img-view'); //popup просмотра изображения
const bigImage = imageModalWindow.querySelector('.popup__image'); //изображение
const bigImagegDescription = imageModalWindow.querySelector('.popup__place-description'); //описание изображения
const imageModalWindowClose = imageModalWindow.querySelector('.popup__close-button');

//функции открытия и закрытия попап
function handleOpenPopup(popup) {
  popup.classList.add('popup_activated');
  deleteErrorInfo (config, popup);
};

function handleClosePopup(popup) {
  popup.classList.remove('popup_activated');
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
  const openPopup = document.querySelector('.popup_activated');
  if (evt.key === "Escape") {
    handleClosePopup(openPopup);
  };
};

document.addEventListener('keydown', closePopupOnEcs);

//функции редактирования профиля
function profileCorrectInput() {
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
function render() {
  const html = initialCards.map(createCards) 
  renderCards(html);
};
function renderCards(cards) {
  cardsContainer.prepend(...cards);
};
function createCards(item){
  const getElementTemplate = template.content.cloneNode(true);
  const cardImage = getElementTemplate.querySelector('.card__image');//изображение места
  const cardSubtitle = getElementTemplate.querySelector('.card__subtitle');//название места

  cardSubtitle.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

  const cardLikeButton = getElementTemplate.querySelector('.card__like-button');//кнопка like
  const cardDeleteButton = getElementTemplate.querySelector('.card__del-button');//кнопка удаления карточки

  cardDeleteButton.addEventListener('click', handleCardDelete);
  cardLikeButton.addEventListener('click', handleLikeClick);

//просмотр увеличенного изображения - открытие
  function ImageModalWindowInput() {
    bigImage.src = cardImage.src;
    bigImage.alt = cardImage.alt;
    bigImagegDescription.textContent = cardSubtitle.textContent;
    handleOpenPopup(imageModalWindow);
  };

  cardImage.addEventListener('click', ImageModalWindowInput);
  
  return getElementTemplate;
};
render();

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
  evt.target.reset();
  const newPlaceName = cardModalWindow.querySelector('.popup__input_type_place').value;
  const newPlacePhoto = cardModalWindow.querySelector('.popup__input_type_link').value;
  const newPlaceCard = createCards({name: newPlaceName, link: newPlacePhoto});
  cardsContainer.prepend(newPlaceCard);
  handleClosePopup(cardModalWindow);
};

//просмотр увеличенного изображения - закрытие
imageModalWindowClose.addEventListener('click', ()=>handleClosePopup(imageModalWindow));

//слушатели риедктирования профиля
profileCorrectButton.addEventListener('click', profileCorrectInput);
profileCorrectCloseButton.addEventListener('click', ()=>handleClosePopup(profileCorrectWindow));
profileFormElement.addEventListener('submit', handleProfileFormSubmit);

//слушатели ручного добавления карточек
cardAddButton.addEventListener('click', ()=>handleOpenPopup(cardModalWindow));
cardModalCloseButton.addEventListener('click', ()=>handleClosePopup(cardModalWindow));
cardFormSubmit.addEventListener('submit', handleAddCard);