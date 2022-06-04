import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { profileCorrectButton, profileCorrectWindow, profileCorrectCloseButton, profileFormElement, nameInput, jobInput,
  profileName, profilePosition, cardAddButton, cardModalWindow, cardModalCloseButton, cardFormContainer, 
  addCardFormElement, initialCards, config } from '../utils/constants.js';
import { Section } from '../components/Section.js';
import '../pages/index.css';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js'
 

//добавление карточек на страницу
function createCard(data) {
  const card = new Card(data, '.template', openFullSizeImage);
  const cardElement = card.generateCard()
  return cardElement;
};

const addElementOnPage = new Section({
  data: initialCards,
  renderer: (item) => {
    const element = createCard(item)
    addElementOnPage.addEItem(element)
  }
}, '.elements__cardholder');

addElementOnPage.renderItems()

//добавление карточек на страницу через форму

const cardPopup = new PopupWithForm ('.popup_add-card', handleAddCard)


function handleAddCard (item) { 
  evt.preventDefault();
  const handleCard = createCard(item)
  addElementOnPage.addEItem(handleCard)
  cardPopup.close()
};


cardAddButton.addEventListener('click', () => {
  cardPopup.open();
  addCardForm.deleteErrorInfo();
  addCardForm.toggleButton()
});

cardPopup.setEventListeners()

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
