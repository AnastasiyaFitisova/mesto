import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._submitBtn = this._popup.querySelector('.popup__submit-button')
  };

  _getInputValues() {
    this._inputs = Array.from(this._popup.querySelectorAll('.popup__input'));
    this._formValues = {};
    this._inputList.forEach((input) => {this._formValues[input.name] = input.value});
    return this._formValues;
  };

  close() {
    super.close();
    this._popup.querySelector('.popup__form').reset();
  };

  setEventListeners() {
    super.setEventListeners();
    this._submitBtn.addEventListener('submit', () => {this._handleFormSubmit(this._getInputValue())})
  };

}