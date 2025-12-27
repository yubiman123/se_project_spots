const showInputError = (formEl, inputEl, errorMessage) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = errorMessage;
  inputEl.classList.add("modal__input_type_error");
};

const hideInputError = (formEl, inputEl) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  errorMsgEl.textContent = "";
  inputEl.classList.remove("modal__input_type_error");
};

const checkInputValidity = (formEl, inputEl) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage);
  } else {
    hideInputError(formEl, inputEl);
  }
};

const hasInvalidInput = (inputList) =>
  inputList.some((inputEl) => !inputEl.validity.valid);

const toggleButtonState = (inputList, buttonEl) => {
  buttonEl.disabled = hasInvalidInput(inputList);
};

const setEventListeners = (formEl) => {
  const inputList = Array.from(formEl.querySelectorAll(".modal__input"));
  const buttonEl = formEl.querySelector(".modal__submit-btn");

  toggleButtonState(inputList, buttonEl);

  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl);
      toggleButtonState(inputList, buttonEl);
    });
  });
};

function resetValidation(formEl) {
  const inputList = Array.from(formEl.querySelectorAll(".modal__input"));
  const buttonEl = formEl.querySelector(".modal__submit-btn");

  inputList.forEach((inputEl) => {
    hideInputError(formEl, inputEl);
  });

  buttonEl.disabled = true;
}

const enableValidation = () => {
  const formList = document.querySelectorAll(".modal__form");
  formList.forEach(setEventListeners);
};

enableValidation();