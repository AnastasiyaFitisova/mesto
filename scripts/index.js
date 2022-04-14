//редактирование информации профиля

let profileCorrectButton = document.querySelector('.profile__set-button'); //кнопка редактировать профиль
let ProfileCorrectWindow = document.querySelector('.popup');
let ProfileCorrectCloseButton = ProfileCorrectWindow.querySelector('.popup__close-button');//кнопка закрытия popup
let ProfileformElement = ProfileCorrectWindow.querySelector('.popup__form');//форма редактирования
let nameInput = ProfileformElement.querySelector('.popup__input-name');//строка ввода имени
let jobInput = ProfileformElement.querySelector('.popup__input-position');//строка ввода профессии
let profileName = document.querySelector('.profile__name');
let profilePosition = document.querySelector('.profile__position')

//открытие формы редактирования
function OpenProfileCorrectWindow() {
  ProfileCorrectWindow.classList.add('popup_activated');
}
//присвоение первоначальных значений в input
function ProfileCorrectInput() {
  nameInput.value = profileName.textContent;
  jobInput.value = profilePosition.textContent;
  OpenProfileCorrectWindow();
}
//закрытие формы редактирования
function CloseProfileCorrectWindow() {
  ProfileCorrectWindow.classList.remove('popup_activated');
}
//submit формы редактирования
function ProfileformSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profilePosition.textContent = jobInput.value
}

profileCorrectButton.addEventListener('click', ProfileCorrectInput);
ProfileCorrectCloseButton.addEventListener('click', CloseProfileCorrectWindow);
ProfileformElement.addEventListener('submit', CloseProfileCorrectWindow);
ProfileformElement.addEventListener('submit', ProfileformSubmit); 


//добавление карточек
const cardsContainer = document.querySelector('.elements__cardholder');
const template = document.querySelector('.template');

function render() {
  const html = initialCards.map(createCards);
  cardsContainer.append(...html);
}

function createCards(item) {
  const getElementTemplate = template.content.cloneNode(true);

  const cardImage = getElementTemplate.querySelector('.card__image');
  cardImage.src = item.link;
  cardImage.alt = item.name;

  const cardSubtitle = getElementTemplate.querySelector('.card__subtitle');
  cardSubtitle.textContent = item.name;

  //лайк и удаление
  const cardLikeButton = getElementTemplate.querySelector('.card__like-button');//кнопка like
  const cardDeleteButton = getElementTemplate.querySelector('.card__del-button');//кнопка удадения карточки

  function likeButtonActiv(evt) {
    evt.target.classList.toggle('card__like-button_activated');
  }
  function handleCardDelete(evt) {
    const deletedElement = evt.target.closest('.card');
    deletedElement.remove();
  }

  cardDeleteButton.addEventListener('click', handleCardDelete);
  cardLikeButton.addEventListener('click', likeButtonActiv);

  //просмотр изображений
  const imageModalWindow = document.querySelector('.popup_img-view'); //popup просмотра изображения
  const bigImage = imageModalWindow.querySelector('.popup__image'); //изображение
  const bigImagegDescription = imageModalWindow.querySelector('.popup__place-description'); //описание изображения
  const imageModalWindowClose = imageModalWindow.querySelector('.popup__close-button');
  
  //открытие модального окна изображения
  function openImageModalWindow() {
    imageModalWindow.classList.add('popup_activated');
  }
  //получение изображения и описания
  function ImageModalWindowInput() {
    bigImage.src = cardImage.src;
    bigImage.alt = cardImage.alt;
    bigImagegDescription.textContent = cardSubtitle.textContent;
    openImageModalWindow();
  }
  //закрытие модального окна изображения
  function closeImageModalWindow() {
    imageModalWindow.classList.remove('popup_activated');
  }
  
  cardImage.addEventListener('click', ImageModalWindowInput);
  imageModalWindowClose.addEventListener('click', closeImageModalWindow);

  return getElementTemplate;
}
render();


//добавление новых карточек
const cardAddButton = document.querySelector('.profile__add-button');//кнопка добавления карточки
const cardModalWindow = document.querySelector('.popup_add-card');//форма для добавления карточки
const cardModalCloseButton = cardModalWindow.querySelector('.popup__close-button');//кнопка закрытия формы добавления карточки
const cardFormSubmit = cardModalWindow.querySelector('.popup__content_add-card');

//открытие формы добавления карточки
function openCardModalWindow() {
  cardModalWindow.classList.add('popup_activated');
}
//закрытие формы добавления карточки
function closeCardModalWindow() {
  cardModalWindow.classList.remove('popup_activated');
}
//получение input для карточки
function handleAddCard(evt) {
  evt.preventDefault();
  evt.target.reset();
  const newPlaceName = cardModalWindow.querySelector('.popup__input-place').value;
  const newPlacePhoto = cardModalWindow.querySelector('.popup__input-link').value;
  const newPlaceCard = createCards({name: newPlaceName, link: newPlacePhoto});
  cardsContainer.prepend(newPlaceCard);
  closeCardModalWindow();
}

cardAddButton.addEventListener('click', openCardModalWindow);
cardModalCloseButton.addEventListener('click', closeCardModalWindow);
cardFormSubmit.addEventListener('submit', handleAddCard);