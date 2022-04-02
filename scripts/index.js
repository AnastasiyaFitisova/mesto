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

