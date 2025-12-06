const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: ".modal__error_visible"
};

const newPostFormValidator = new FormValidator(validationConfig, addCardFormElement);
newPostFormValidator.enableValidation();

const editProfileFormValidator = new FormValidator(validationConfig, editProfileForm);
editProfileFormValidator.enableValidation();

function openModal(modal) {
  modal.classList.add("modal_is-opened");

  function handleEscape(evt) {
    if (evt.key === "Escape") closeModal(modal);
  }
  modal._handleEscape = handleEscape;
  document.addEventListener("keydown", handleEscape);

  if (!modal._handleOverlay) {
    function handleOverlayClick(evt) {
      if (evt.target === modal) closeModal(modal);
    }
    modal._handleOverlay = handleOverlayClick;
    modal.addEventListener("mousedown", handleOverlayClick);
  }
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");

  if (modal._handleEscape) {
    document.removeEventListener("keydown", modal._handleEscape);
    delete modal._handleEscape;
  }
}

function setCloseButton(modal) {
  const closeBtn = modal.querySelector(".modal__close-btn");
  closeBtn.addEventListener("click", () => closeModal(modal));
}

[editProfileModal, newPostModal, previewModal].forEach((modal) => {
  setCloseButton(modal);
});

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeBtnEl = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-button");

  cardTitleEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;

  cardLikeBtnEl.addEventListener("click", () => {
    cardLikeBtnEl.classList.toggle("card__like-btn_active");
  });

  cardDeleteBtnEl.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    previewModalImage.src = data.link;
    previewModalImage.alt = data.name;
    previewModalCaption.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

initialCards.forEach((item) => {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});

editProfileBtn.addEventListener("click", () => {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  openModal(editProfileModal);
});

newPostBtn.addEventListener("click", () => openModal(newPostModal));

editProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileNameEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editProfileDescriptionInput.value;

  editProfileFormValidator.resetValidation();
  closeModal(editProfileModal);
});

addCardFormElement.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const inputValues = { name: captionInput.value, link: linkInput.value };
  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);

  newPostFormValidator.resetValidation();

  closeModal(newPostModal);
});