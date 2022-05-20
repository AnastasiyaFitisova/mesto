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
  _showInputError(formInput) {
    const inputError = this._form.querySelector(`#${formInput.id}-error`);
    formInput.classList.add(this._config.inputErrorSelector);
    inputError.textContent = formInput.validationMessage;
  };
  
  //скрыть стили и текст ошибки
  _hideInputError(formInput) {
    const inputError = this._form.querySelector(`#${formInput.id}-error`);
    formInput.classList.remove(this._config.inputErrorSelector);
    inputError.textContent = '';
  };

  //проверка валидности инпутов
  _checkInputValidity(formInput) {
    if (!formInput.validity.valid) {
      this._showInputError(formInput);
    } else {
      this._hideInputError(formInput);
    }
};

  //проверка наличия не валидных инпутов
  _hasInvalidInput() {
    const inputs = Array.from(this._form.querySelectorAll(this._config.inputSelector))
    return inputs.some((formInput) => {
      return !formInput.validity.valid;});
  };

  //стили кнопки при невалидных ипутах
  toggleButton() {
    const button = this._form.querySelector(this._config.submitButtonSelector);
    if (this._hasInvalidInput()) {
      button.classList.add(this._config.inactiveButtonSelector);
      button.disabled = true;
    } else {
      button.classList.remove(this._config.inactiveButtonSelector);
      button.disabled = false;
    }
  };

  _setEventListeners() {
    this.toggleButton();
    const inputs = Array.from(this._form.querySelectorAll(this._config.inputSelector))
    inputs.forEach((formInput) => {
      formInput.addEventListener('input', () => {
        this._checkInputValidity(formInput);
        this.toggleButton();
      });
    });
  };

  deleteErrorInfo() {
    const inputs = Array.from(this._form.querySelectorAll(this._config.inputSelector))
    inputs.forEach((formInput) => {
      this._hideInputError (formInput)
    })
  };

  enableValidation() {

    this._setEventListeners();
    const _forms = Array.from(this._form.querySelectorAll(this._config.formSelector));
  
    _forms.forEach((formElement) => {
      formElement.addEventListener('submit', () => {
        this._setEventListeners();
      });
    }); 
  }
}

export {config, FormValidator};


