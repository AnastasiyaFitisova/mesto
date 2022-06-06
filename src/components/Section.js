export class Section {
  constructor (renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  };

  renderItems(data) {
    data.forEach((item) => {
      this._renderer(item);
    });
  };

  addItem(item) {
    this._container.prepend(item);
  };

};