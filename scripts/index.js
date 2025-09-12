const editProfileBtn = document.querySelector(".profile__edit-btn");
const newPostBtn = document.querySelector(".profile__add-btn");

const editProfileModal = document.querySelector("#edit-profile-modal");
const newPostModal = document.querySelector("#new-post-modal");

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

const editProfileNameInput = editProfileModal.querySelector("#profile-name-input");
const editProfileDescriptionInput = editProfileModal.querySelector("#profile-description-input");
const editProfileForm = editProfileModal.querySelector(".modal__form");

const addCardFormElement = newPostModal.querySelector(".modal__form");
const linkInput = newPostModal.querySelector("#card-image-input");
const captionInput = newPostModal.querySelector("#image-caption-input");

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

function setModalCloseHandler(modal) {
  const closeBtn = modal.querySelector(".modal__close-btn");
  closeBtn.addEventListener("click", () => closeModal(modal));
}


editProfileBtn.addEventListener("click", () => {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  openModal(editProfileModal);
});

setModalCloseHandler(editProfileModal);


newPostBtn.addEventListener("click", () => openModal(newPostModal));
setModalCloseHandler(newPostModal);


// Create the form submission handler
function handleAddCardSubmit(evt) {
  // Prevent default browser behavior
  evt.preventDefault();

  // Log both input values to the console
  console.log("Image link:", linkInput.value);
  console.log("Caption:", captionInput.value);

  // Close the modal
  closeModal(newPostModal);
}

// Create the submit listener
addCardFormElement.addEventListener('submit', handleAddCardSubmit);


function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileNameEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editProfileDescriptionInput.value;
  closeModal(editProfileModal);
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);