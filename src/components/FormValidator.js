export class FormValidator {

  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._inputs = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    this._button = this._form.querySelector(this._config.submitButtonSelector);
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
    };
};

  //проверка наличия не валидных инпутов
  _hasInvalidInput() {
    return this._inputs.some((formInput) => {
      return !formInput.validity.valid;});
  };

  //стили кнопки при невалидных ипутах
  toggleButton() {
    
    if (this._hasInvalidInput()) {
      this._button.classList.add(this._config.inactiveButtonSelector);
      this._button.disabled = true;
    } else {
      this._button.classList.remove(this._config.inactiveButtonSelector);
      this._button.disabled = false;
    }
  };

  _setEventListeners() {
    this.toggleButton();
    this._inputs.forEach((formInput) => {
      formInput.addEventListener('input', () => {
        this._checkInputValidity(formInput);
        this.toggleButton();
      });
    });
  };

  deleteErrorInfo() {
    this._inputs.forEach((formInput) => {
      this._hideInputError (formInput);
    });
  };

  enableValidation() {
    this._setEventListeners();
  };

};


