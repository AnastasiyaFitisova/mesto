import { Popup } from './Popup.js'

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector,) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
  };

  submitConfirmation(action) {
    this._handleSubmit = action;
  };

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    });
    super.setEventListeners();
  };

}