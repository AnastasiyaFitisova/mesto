//редактирование информации профиля
let profileCorrectButton = document.querySelector('.profile__set-button'); //кнопка редактировать профиль
let ProfileCorrectWindow = document.querySelector('.popup');
let ProfileCorrectCloseButton = ProfileCorrectWindow.querySelector('.popup__close-button');//кнопка закрытия popup
let ProfileformElement = ProfileCorrectWindow.querySelector('.popup__form');//форма редактирования
let nameInput = ProfileformElement.querySelector('.popup__input-name');//строка ввода имени
let jobInput = ProfileformElement.querySelector('.popup__input-position');//строка ввода профессии
let profileName = document.querySelector('.profile__name');
let profilePosition = document.querySelector('.profile__position')

//загрузка карточек
const cardsContainer = document.querySelector('.elements__cardholder');//<ul>
const template = document.querySelector('.template');//шаблон карточки

//ручное добавление новых карточек
const cardAddButton = document.querySelector('.profile__add-button');//кнопка добавления карточки
const cardModalWindow = document.querySelector('.popup_add-card');//форма для добавления карточки
const cardModalCloseButton = cardModalWindow.querySelector('.popup__close-button');//кнопка закрытия формы добавления карточки
const cardFormSubmit = cardModalWindow.querySelector('.popup__content_add-card');

//просмотр изображений - закрытие
const imageModalWindow = document.querySelector('.popup_img-view'); //popup просмотра изображения
const bigImage = imageModalWindow.querySelector('.popup__image'); //изображение
const bigImagegDescription = imageModalWindow.querySelector('.popup__place-description'); //описание изображения
const imageModalWindowClose = imageModalWindow.querySelector('.popup__close-button');

//функции корректирования информации профиля
function handleProfileCorrect() {
  ProfileCorrectWindow.classList.add('popup_activated');
}
function profileCorrectInput() {
  nameInput.value = profileName.textContent;
  jobInput.value = profilePosition.textContent;
  handleProfileCorrect();
}
function handleCloseProfileCorrect() {
  ProfileCorrectWindow.classList.remove('popup_activated');
}
function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profilePosition.textContent = jobInput.value
    handleCloseProfileCorrect()
}

//функции загрузки карточек на страницу
function render() {
  const html = initialCards.map(createCards) 
  renderCards(html);
}
function renderCards(cards) {
  cardsContainer.prepend(...cards);
}
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
  function handleOpenImageWindow() {
    imageModalWindow.classList.add('popup_activated');
  }
  function ImageModalWindowInput() {
    bigImage.src = cardImage.src;
    bigImage.alt = cardImage.alt;
    bigImagegDescription.textContent = cardSubtitle.textContent;
    handleOpenImageWindow();
  }

  cardImage.addEventListener('click', ImageModalWindowInput);
  
  return getElementTemplate;
}
render();

//функции лайк и удаление карточек
function handleLikeClick(evt) {
  evt.target.classList.toggle('card__like-button_activated');
}
function handleCardDelete(evt) {
  const deletedElement = evt.target.closest('.card');
  deletedElement.remove();
}

//функции ручного добавления новых карточек
function handleOopenCardWindow() {
  cardModalWindow.classList.add('popup_activated');
}
function handleCloseCardWindow() {
  cardModalWindow.classList.remove('popup_activated');
}
function handleAddCard(evt) {
  evt.preventDefault();
  evt.target.reset();
  const newPlaceName = cardModalWindow.querySelector('.popup__input-place').value;
  const newPlacePhoto = cardModalWindow.querySelector('.popup__input-link').value;
  const newPlaceCard = createCards({name: newPlaceName, link: newPlacePhoto});
  cardsContainer.prepend(newPlaceCard);
  handleCloseCardWindow();
}

//просмотр увеличенного изображения - закрытие
function handleCloseImageWindow() {
  imageModalWindow.classList.remove('popup_activated');
}

imageModalWindowClose.addEventListener('click', handleCloseImageWindow);

//слушатели риедктирования профиля
profileCorrectButton.addEventListener('click', profileCorrectInput);
ProfileCorrectCloseButton.addEventListener('click', handleCloseProfileCorrect);
ProfileformElement.addEventListener('submit', handleProfileFormSubmit);

//слушатели ручного добавления карточек
cardAddButton.addEventListener('click', handleOopenCardWindow);
cardModalCloseButton.addEventListener('click', handleCloseCardWindow);
cardFormSubmit.addEventListener('submit', handleAddCard);