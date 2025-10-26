const initialCards = [
  { name: "Golden Gate Bridge", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg" },
  { name: "Val Thorens", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg" },
  { name: "Restaurant terrace", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg" },
  { name: "An outdoor cafe", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg" },
  { name: "A very long bridge, over the forest and through the trees", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg" },
  { name: "Tunnel with morning light", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg" },
  { name: "Mountain house", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg" },
];

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

const modals = {
  editProfile: document.querySelector("#edit-profile-modal"),
  newPost: document.querySelector("#new-post-modal"),
  preview: document.querySelector("#preview-modal")
};

const forms = {
  editProfile: modals.editProfile.querySelector(".modal__form"),
  newPost: modals.newPost.querySelector(".modal__form")
};

const inputs = {
  editProfile: {
    name: modals.editProfile.querySelector("#profile-name-input"),
    description: modals.editProfile.querySelector("#profile-description-input")
  },
  newPost: {
    link: modals.newPost.querySelector("#card-image-input"),
    caption: modals.newPost.querySelector("#image-caption-input")
  }
};

const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");
const previewImage = modals.preview.querySelector(".modal__image");
const previewCaption = modals.preview.querySelector(".modal__caption");

function openModal(modal) { modal.classList.add("modal_is-opened"); }
function closeModal(modal) { modal.classList.remove("modal_is-opened"); }

function setModalCloseHandler(modal) {
  modal.querySelector(".modal__close-btn").addEventListener("click", () => closeModal(modal));
}

function createCard({ name, link }) {
  const card = cardTemplate.cloneNode(true);
  const img = card.querySelector(".card__image");
  const title = card.querySelector(".card__title");
  const likeBtn = card.querySelector(".card__like-btn");
  const deleteBtn = card.querySelector(".card__delete-button");

  img.src = link;
  img.alt = name;
  title.textContent = name;

  likeBtn.addEventListener("click", () => likeBtn.classList.toggle("card__like-btn_active"));
  deleteBtn.addEventListener("click", () => card.remove());
  img.addEventListener("click", () => {
    previewImage.src = link;
    previewImage.alt = name;
    previewCaption.textContent = name;
    openModal(modals.preview);
  });

  return card;
}

document.querySelector(".profile__edit-btn").addEventListener("click", () => {
  inputs.editProfile.name.value = profileNameEl.textContent;
  inputs.editProfile.description.value = profileDescriptionEl.textContent;
  openModal(modals.editProfile);
});
document.querySelector(".profile__add-btn").addEventListener("click", () => openModal(modals.newPost));

Object.values(modals).forEach(setModalCloseHandler);

forms.editProfile.addEventListener("submit", e => {
  e.preventDefault();
  profileNameEl.textContent = inputs.editProfile.name.value;
  profileDescriptionEl.textContent = inputs.editProfile.description.value;
  closeModal(modals.editProfile);
});

forms.newPost.addEventListener("submit", e => {
  e.preventDefault();
  cardsList.prepend(createCard({
    name: inputs.newPost.caption.value,
    link: inputs.newPost.link.value
  }));
  forms.newPost.reset();
  closeModal(modals.newPost);
});

initialCards.forEach(item => cardsList.append(createCard(item)));