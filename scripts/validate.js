const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonSelector: "popup__submit-button_disabled",
  inputErrorSelector: "popup__input_not-valid"
};

//показать стили и текст ошибки
const showInputError = (formInput, config) => {
  const formError = document.querySelector(`#${formInput.id}-error`);
  formInput.classList.add(config.inputErrorSelector);
  formError.textContent = formInput.validationMessage;
}

//скрыть стили и текст ошибки
const hideInputError = (formInput, config) => {
  const formError = document.querySelector(`#${formInput.id}-error`);
  formInput.classList.remove(config.inputErrorSelector);
  formError.textContent = '';
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
const toggleButton = (formElement, inputs, config) => {
  const buttons = Array.from(formElement.querySelectorAll(config.submitButtonSelector));

  buttons.forEach((formButton) => {
    if (hasInvalidInput(inputs)) {
      formButton.classList.add(config.inactiveButtonSelector);
      formButton.disabled = true;
    } else {
      formButton.classList.remove(config.inactiveButtonSelector);
      formButton.disabled = false;
    }
  });
}

const setEventListeners = (formElement, config) => {
  const inputs = Array.from(formElement.querySelectorAll(config.inputSelector));
  
  toggleButton(formElement, inputs, config);
  
  inputs.forEach((formInput) => {
    formInput.addEventListener('input', () => {
      checkInputValidity(formInput, config);
      toggleButton(formElement, inputs, config);
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
  const popups = Array.from(popup.querySelectorAll(config.inputSelector));
  popups.forEach((elements) => {
    hideInputError (elements, config)
  })
}
