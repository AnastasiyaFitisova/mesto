const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonSelector: "popup__submit-button_disabled",
  inputErrorSelector: "popup__input_not-valid"
};

//показать стили и текст ошибки
const showInputError = (formInput, config) => {
  const inputError = document.querySelector(`#${formInput.id}-error`);
  formInput.classList.add(config.inputErrorSelector);
  inputError.textContent = formInput.validationMessage;
}

//скрыть стили и текст ошибки
const hideInputError = (formInput, config) => {
  const inputError = document.querySelector(`#${formInput.id}-error`);
  formInput.classList.remove(config.inputErrorSelector);
  inputError.textContent = '';
}

//проверка валидности инпутов
const checkInputValidity = (formInput, config) => {
  if (!formInput.validity.valid) {
    showInputError(formInput, config);
  } else {
    hideInputError(formInput, config);
  }
};

//проверка наличия не валидных инпутов
const hasInvalidInput = (inputs) => {
  return inputs.some((formInput) => {
  return !formInput.validity.valid;
});
}

//стили кнопки при невалидных ипутах
const toggleButton = (button, inputs, config) => {
  

    if (hasInvalidInput(inputs)) {
      button.classList.add(config.inactiveButtonSelector);
      button.disabled = true;
    } else {
      button.classList.remove(config.inactiveButtonSelector);
      button.disabled = false;
    }
  };


const setEventListeners = (formElement, config) => {
  const inputs = Array.from(formElement.querySelectorAll(config.inputSelector));
  const button = formElement.querySelector(config.submitButtonSelector);
  
  toggleButton(button, inputs, config);
  
  inputs.forEach((formInput) => {
    formInput.addEventListener('input', () => {
      checkInputValidity(formInput, config);
      toggleButton(button, inputs, config);
    });
  });
};

const enableValidation = (config) => {
  const forms = Array.from(document.querySelectorAll(config.formSelector));

  forms.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
  });
};

enableValidation(config); 

function deleteErrorInfo (config, popup) {
  const inputFields = Array.from(popup.querySelectorAll(config.inputSelector));
  inputFields.forEach((elements) => {
    hideInputError (elements, config)
  })
}
