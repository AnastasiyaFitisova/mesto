import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { profileCorrectButton, profileFormElement, nameInput, jobInput, cardAddButton, addCardFormElement, 
  cardName, cardLink, initialCards, config } from '../utils/constants.js';
import { Section } from '../components/Section.js';
import '../pages/index.css';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
 
//добавление карточек на страницу
function createCard(data) {
  const card = new Card(data, '.template', openFullSizeImage);
  const cardElement = card.generateCard();
  return cardElement;
};

const addElementOnPage = new Section({
  data: initialCards,
  renderer: (item) => {
    const element = createCard(item);
    addElementOnPage.addItem(element);
  }
}, '.elements__cardholder');

addElementOnPage.renderItems();

//добавление карточек на страницу через форму
const cardPopup = new PopupWithForm('.popup_add-card', 
{handleFormSubmit: handleAddCard});

function handleAddCard() { 
  const handleCard = createCard({name: cardName.value, link: cardLink.value});
  addElementOnPage.addItem(handleCard);
  cardPopup.close();
};

cardAddButton.addEventListener('click', () => {
  cardPopup.open();
  addCardForm.deleteErrorInfo();
  addCardForm.toggleButton();
});

cardPopup.setEventListeners();

//Валидация форм
const profileForm = new FormValidator(config, profileFormElement);
const addCardForm = new FormValidator(config, addCardFormElement);

profileForm.enableValidation();
addCardForm.enableValidation();

//popup с изображением
const popupWithImg = new PopupWithImage('.popup_img-view');
popupWithImg.setEventListeners();
function openFullSizeImage({name, link}) {
  popupWithImg.open({name, link});
};

//редактирование информации профиля
const profilePopup = new PopupWithForm('.popup_correct-info', 
{handleFormSubmit: submitUserInfo});

const profileInfo = new UserInfo({
  userName: '.profile__name', 
  userPosition: '.profile__position'});

function submitUserInfo() {
  profileInfo.setUserInfo({name: nameInput.value, position: jobInput.value});
  profilePopup.close();
};
  
profileCorrectButton.addEventListener('click', function() {
  const userData = profileInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.position;
  profilePopup.open();
  profileForm.deleteErrorInfo();
});

profilePopup.setEventListeners();