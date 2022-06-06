import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { profileCorrectButton, profileFormElement, nameInput, jobInput, cardAddButton, CardFormElement, initialCards, config } from '../utils/constants.js';
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

const CardElementOnPage = new Section((item) => {
    const element = createCard(item);
    CardElementOnPage.addItem(element);
  }
  , '.elements__cardholder');

CardElementOnPage.renderItems(initialCards);

//добавление карточек на страницу через форму
const cardPopup = new PopupWithForm('.popup_add-card', {
  handleFormSubmit: (data) => {
    const inputs = { name: data.placename, link: data.imagelink };
    const handleCard = createCard(inputs);
    CardElementOnPage.addItem(handleCard);
    cardPopup.close();
  }
});

cardAddButton.addEventListener('click', () => {
  cardPopup.open();
  CardFormValidity.deleteErrorInfo();
  CardFormValidity.toggleButton();
});

cardPopup.setEventListeners();

//Валидация форм
const profileFormValidity = new FormValidator(config, profileFormElement);
const CardFormValidity = new FormValidator(config, CardFormElement);

profileFormValidity.enableValidation();
CardFormValidity.enableValidation();

//popup с изображением
const popupWithImg = new PopupWithImage('.popup_img-view');
popupWithImg.setEventListeners();
function openFullSizeImage({name, link}) {
  popupWithImg.open({name, link});
};

//редактирование информации профиля
const profilePopup = new PopupWithForm('.popup_correct-info', 
{handleFormSubmit: (data) => {
  profileInfo.setUserInfo({name: data.profilename, position: data.position});
  profilePopup.close();
}});

const profileInfo = new UserInfo({
  userName: '.profile__name', 
  userPosition: '.profile__position'});
  
profileCorrectButton.addEventListener('click', function() {
  const userData = profileInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.position;
  profilePopup.open();
  profileFormValidity.deleteErrorInfo();
});

profilePopup.setEventListeners();