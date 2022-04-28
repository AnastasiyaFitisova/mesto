function enableValidation(formObj) {
  const form = document.querySelector(formObj.formSelector);

  const inputs = document.querySelectorAll(formObj.inputSelector);
  inputs.forEach((element) => {
    element.addEventListener('input', (evt) => handleInputAdd(evt, form, formObj))
  })

  const formList = Array.from(document.querySelectorAll(formObj.formSelector));
  formList.forEach((element) => {
    element.addEventListener('submit', (evt) => handleFormSubmit(evt, form, formObj))
    handleInputAdd(element);
  });

  form.addEventListener('submit', (evt) => handleFormSubmit(evt, form));

  toggleButton(form, formObj);
}

//функция работы с состоянием кнопки
function toggleButton(form, formObj) {
  const button = document.querySelector(formObj.buttonSelector);
  button.disabled = !form.checkValidity();
  button.classList.toggle('popup__submit-button_disabled', !form.checkValidity());
}

//функции изменения стиля инпута
const showInputError = (element) => {
  element.classList.add('popup__input_not-valid');
  
};
const hideInputError = (element) => {
  element.classList.remove('popup__input_not-valid');
};

//сабмит формы
function handleFormSubmit(evt, form) {
  evt.preventDefault();
}

//вызов или удаление стилей и сообщений об ошибках
function handleInputAdd(evt, form, formObj) {
  const input = evt.target;
  const error = document.querySelector(`#${input.id}-error`);
  
  if (input.validity.valid) {
    error.textContent = '';
    hideInputError(input)
  } else {
    error.textContent = input.validationMessage;
    showInputError(input)
  }

  toggleButton(form, formObj);
}

enableValidation ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  buttonSelector: '.popup__submit-button',
});