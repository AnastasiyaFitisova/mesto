const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonSelector: "popup__submit-button_disabled",
  inputErrorSelector: "popup__input_not-valid"
};

class FormValidator {

  constructor(config, form) {
    this._config = config;
    this._form = form;
  };

  //показать стили и текст ошибки
  _showInputError = (formInput) => {
    const inputError = this._form.querySelector(`#${formInput.id}-error`);
    formInput.classList.add(this._config.inputErrorSelector);
    inputError.textContent = formInput.validationMessage;
  };
  
  //скрыть стили и текст ошибки
  _hideInputError = (formInput) => {
    const inputError = this._form.querySelector(`#${formInput.id}-error`);
    formInput.classList.remove(this._config.inputErrorSelector);
    inputError.textContent = '';
  };

  //проверка валидности инпутов
  _checkInputValidity = (formInput) => {
  if (!formInput.validity.valid) {
    showInputError(formInput);
  } else {
    hideInputError(formInput);
  }
};

  //проверка наличия не валидных инпутов
  _hasInvalidInput = (inputs) => {
    return inputs.some((formInput) => {
      return !formInput.validity.valid;
    });
  };

  //стили кнопки при невалидных ипутах
  _toggleButton = () => {
    const button = this._form.querySelector(this._config.submitButtonSelector);
    if (hasInvalidInput(inputs)) {
      button.classList.add(this._config.inactiveButtonSelector);
      button.disabled = true;
    } else {
      button.classList.remove(this._config.inactiveButtonSelector);
      button.disabled = false;
    }
  };

  _setEventListeners = () => {
    const inputs = Array.from(this._form.querySelectorAll(this._config.inputSelector));
   
    this._toggleButton();
    
    inputs.forEach((formInput) => {
      formInput.addEventListener('input', () => {
        this._checkInputValidity(formInput);
        this._toggleButton();
      });
    });
  };

  _deleteErrorInfo = () => {
    const inputFields = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    inputFields.forEach((formInput) => {
      hideInputError (formInput)
    })
  };

  enableValidation = () => {
    const forms = Array.from(this._form.querySelectorAll(this._config.formSelector));
  
    forms.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners();
    });
  }; 

}

export {config, FormValidator};


