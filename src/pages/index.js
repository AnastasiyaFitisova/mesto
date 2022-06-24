import '../pages/index.css';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { profileCorrectButton, profileFormElement, nameInput, jobInput, cardAddButton, CardFormElement, config } from '../utils/constants.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';

const api = new Api ('https://mesto.nomoreparties.co/v1/cohort-43', 
'8636da29-c732-4db2-9071-001062507334');

//добавление карточек на страницу
const cardElementOnPage = new Section((cards) => {
  const element = createCard(cards);
  cardElementOnPage.addItem(element);
}
, '.elements__cardholder');

const createCard = (data) => {
  const card = new Card(
    data, 
    '.template',  
    openFullSizeImage,
    userId,
    (item) => {
      delPopup.open();
      delPopup.submitConfirmation(() => {
        api.deleteCard(item._id)
        .then(() => {
          card.handleCardDelete();
          delPopup.close();
        })
        .catch((err) => {
          console.log(err);
        });
      });
    },
    (item) => {
      api.setLike(item._id)
      .then((res) => {
        card.setCardLike(res);
      })
      .catch((err) => {
        console.log(err);
      })
    }, 
    (item) => {
      api.deleteLike(item._id)
      .then((res) => {
        card.setCardDislike(res);
      })
      .catch((err) => {
        console.log(err);
      })
    });
  const cardElement = card.generateCard();
  return cardElement;
};

api.getInitialCards()
.then((cards) => {
  cardElementOnPage.renderItems(cards);
})
.catch((err) => {
  console.log(err);
});


//создание карточки через форму
cardAddButton.addEventListener('click', () => {
  cardPopup.open();
  cardFormValidity.deleteErrorInfo();
  cardFormValidity.toggleButton();
});

const cardPopup = new PopupWithForm('.popup_add-card', {
  handleFormSubmit: (data) => {
    api.addCard(data.placename, data.imagelink)
    .then((data) => {
      const handleCards = createCard(data)
      cardElementOnPage.addItem(handleCards);
      cardPopup.close();
    })
    .catch((err) => {
      console.log(err);
    }); 
  }
});

cardPopup.setEventListeners();

//удаление карточки
const delPopup = new PopupWithConfirmation ('.popup_card-del');

delPopup.setEventListeners();

//popup с изображением
const popupWithImg = new PopupWithImage('.popup_img-view');

popupWithImg.setEventListeners();

function openFullSizeImage({name, link}) {
  popupWithImg.open({name, link});
};

//информация профиля
const profileInfo = new UserInfo({
  userName: '.profile__name', 
  userPosition: '.profile__position',
  userAvatar: '.profile__avatar'
});

let userId = null;

api.getUserInfo()
.then((data) => {
  profileInfo.setUserInfo(data);
  userId = data._id; 
})
.catch((err) => {
  console.log(err);
});

//предзаполение формы профиля
profileCorrectButton.addEventListener('click', function() {
  const userData = profileInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.about;
  profilePopup.open();
  profileFormValidity.deleteErrorInfo();
});

//редактирование формы профиля
const profilePopup = new PopupWithForm('.popup_correct-info', 
{handleFormSubmit: (data) => {
  api.correctUserInfo(data.profilename, data.position)
  .then((data) => {
    profileInfo.setUserInfo(data)
    profilePopup.close();
  })
  .catch((err) => {
    console.log(err);
  });
}});

profilePopup.setEventListeners();

//Валидация форм
const profileFormValidity = new FormValidator(config, profileFormElement);
const cardFormValidity = new FormValidator(config, CardFormElement);

profileFormValidity.enableValidation();
cardFormValidity.enableValidation();
