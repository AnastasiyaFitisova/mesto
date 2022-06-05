import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._bigImage = this._popup.querySelector('.popup__image');
    this._bigImageDescription = this._popup.querySelector('.popup__place-description');
  };

  open({name, link}) {
    super.open();
    this._bigImageDescription = name;
    this._bigImage.src = link;
    this._bigImage.alt = name;
  };

};