//profile information correction

let profileCorrectButton = document.querySelector('.profile__set-button');
let ModalWindow = document.querySelector('.popup');
let modalCloseButton = ModalWindow.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input-name');
let jobInput = formElement.querySelector('.popup__input-position');
let profileName = document.querySelector('.profile__name');
let profilePosition = document.querySelector('.profile__position')

function openModalWindow() {
    ModalWindow.classList.add('popup_activated');
    nameInput.value = profileName.textContent;
    jobInput.value = profilePosition.textContent;  
}
profileCorrectButton.addEventListener('click', openModalWindow);

function closeModalWindow() {
    ModalWindow.classList.remove('popup_activated');
}
modalCloseButton.addEventListener('click', closeModalWindow);
formElement.addEventListener('submit', closeModalWindow); 

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profilePosition.textContent = jobInput.value
}

formElement.addEventListener('submit', formSubmitHandler); 

//places cards

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

const cardsContainer = document.querySelector('.elements__cardholder');
const template = document.querySelector('.template');

function render() {
  const html = initialCards.map(getElement);
  cardsContainer.append(...html);
}

function getElement(item) {
  const getElementTemplate = template.content.cloneNode(true);

  const cardImage = getElementTemplate.querySelector('.card__image');
  cardImage.src = item.link;
  cardImage.alt = item.name;

  const cardSubtitle = getElementTemplate.querySelector('.card__subtitle');
  cardSubtitle.textContent = item.name;

  const cardLikeButton = getElementTemplate.querySelector('.card__like-button');
  cardLikeButton.addEventListener('click', likeButtonActiv);
  function likeButtonActiv() {
    cardLikeButton.classList.add('card__like-button_activated'); 
  }

  const cardDeleteButton = getElementTemplate.querySelector('.card__del-button');
  cardDeleteButton.addEventListener('click', HandleCardDelete);
  function HandleCardDelete(evt) {
    const element = evt.target.closest('.card');
    element.remove();
  }
  
  const imgModalWindow = document.querySelector('.popup_img-view');
  const bigImage = imgModalWindow.querySelector('.popup__image');
  const bigImgDescription = imgModalWindow.querySelector('.popup__place-description');
  const imgModalWindowClose = imgModalWindow.querySelector('.popup__close-button');
  
  function openImgModalWindow(item) {
    imgModalWindow.classList.add('popup_activated');
    bigImage.src = cardImage.src;
    bigImgDescription.textContent = cardSubtitle.textContent;
  }
  cardImage.addEventListener('click', openImgModalWindow);
   
  
  function closeImgModalWindow() {
    imageBigView.classList.remove('popup_activated');
  }
  imgModalWindowClose.addEventListener('click', closeImgModalWindow);

  return getElementTemplate;
}

render();

//add new cards

const cardAddButton = document.querySelector('.profile__add-button');
const cardModalWindow = document.querySelector('.popup_add-card');
const cardModalCloseButton = cardModalWindow.querySelector('.popup__close-button');

function openCardModalWindow() {
  cardModalWindow.classList.add('popup_activated');
}
cardAddButton.addEventListener('click', openCardModalWindow);
 

function closeCardModalWindow() {
  cardModalWindow.classList.remove('popup_activated');
}
cardModalCloseButton.addEventListener('click', closeCardModalWindow);

const FormSubmit = cardModalWindow.querySelector('.popup__content_add-card');

function handleAddCard(evt) {
  evt.preventDefault();
  evt.target.reset();
  const newPlaceName = cardModalWindow.querySelector('.popup__input-place').value;
  const newPlacePhoto = cardModalWindow.querySelector('.popup__input-link').value;
  const newPlaceCard = getElement({name: newPlaceName, link: newPlacePhoto});
  cardsContainer.prepend(newPlaceCard);
  closeCardModalWindow();
}

FormSubmit.addEventListener('submit', handleAddCard);