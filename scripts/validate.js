//Элементы формы
const formElement = document.querySelector('.popup__form'); //форма
const formInput = formElement.querySelector('.popup__input'); //input

//Функции стилей и сообщения ошибки
const showInputError = (formElement, formInput, errorMessage) => {
  const formError = formElement.querySelector(`#${formInput.id}-error`);
  formInput.classList.add('popup__input_not-valid');
  formError.textContent = errorMessage;
}

const hideInputError = (formElement, formInput) => {
  const formError = formElement.querySelector(`#${formInput.id}-error`);
  formInput.classList.remove('popup__input_not-valid');
  formError.textContent = '';
}

const checkInputValidity = (formElement, formInput) => {
  if (!formInput.validity.valid) {
    showInputError(formElement, formInput, formInput.validationMessage);
  } else {
    hideInputError(formElement, formInput);
  }
};

formElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
});

formInput.addEventListener('input', function () {
  checkInputValidity();
});

const setEventListeners = (formElement) => {
  const inputs = Array.from(formElement.querySelectorAll('.form__input'));
  
  inputs.forEach((formInput) => {
    formInput.addEventListener('input', () => {
    checkInputValidity(formElement, formInput)
  });
});

};

const enableValidation = () => {
  const forms = Array.from(document.querySelectorAll('.form'));

  forms.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation(); 