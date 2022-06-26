import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._form.querySelector('.popup__submit-button')
    this._inputs = Array.from(this._popup.querySelectorAll('.popup__input'));
  };

  _getInputValues() {
    this._formValues = {};
    this._inputs.forEach((input) => {
      this._formValues[input.name] = input.value
    });

    return this._formValues;
  };

  close() {
    super.close();
    this._form.reset();
  };

  isLoading(state, loadedText, loadingText) {
    if(state) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = loadedText;
    };
  };

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  };

};