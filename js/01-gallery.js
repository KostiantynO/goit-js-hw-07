import { galleryItems } from './gallery-items.js';
const createGalleryMarkup = array =>
  array
    .map(
      ({ preview, original, description }, i) => `
    <li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          id="${'img' + i}"
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>`,
    )
    .join('');

const gallery = document.querySelector('.gallery');

const galleryMarkup = createGalleryMarkup(galleryItems);
gallery.insertAdjacentHTML('beforeend', galleryMarkup);

const modalMarkup = `
<div class="gallery-modal">
      <img class="gallery-modal__image" src="https://via.placeholder.com/640/480" alt="Description">
      <p class="gallery-modal__description"><span class="gallery-modal__span">Picture</span></p>
      <button class="back-btn gallery-modal__btn" type="button">◀</button>
      <button class="next-btn gallery-modal__btn" type="button">▶</button>
</div>
`;

const instance = basicLightbox.create(modalMarkup, {
  onClose: () => {
    document.removeEventListener('keydown', onEscCloseModal);
    backBtn.removeEventListener('click', onBackBtnClickShowPreviousImg);
    nextBtn.removeEventListener('click', onNextBtnClickShowNextImg);
  },
});

const galleryModal = instance.element().querySelector('.gallery-modal');
const originalImg = galleryModal.firstElementChild;
const span = galleryModal.querySelector('.gallery-modal__span');
const nextBtn = galleryModal.querySelector('.next-btn');
const backBtn = galleryModal.querySelector('.back-btn');

const getSrcForOriginalImg = ({ id, dataset: { source }, alt }) => {
  if (originalImg.id !== id) {
    originalImg.id = id;
    console.log('getSrcForOriginalImg ~ id', id);
    console.log('getSrcForOriginalImg ~ originalImg.id', originalImg.id);
  }
  originalImg.src = source;
  originalImg.alt = alt;
  originalImg.classList.add('current-img');
  span.textContent = alt;
};

const onEscCloseModal = e => e.code === 'Escape' && instance.close();

const onBackBtnClickShowPreviousImg = e => {
  const currentImg = document.getElementById(`${originalImg.id}`);
  const previousImg = document.getElementById(`${originalImg.id.slice(3) - 1}`);
  getSrcForOriginalImg(previousImg);
};
const onNextBtnClickShowNextImg = e => {};

const onModalOpen = e => {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  }

  const previewImg = e.target;
  getSrcForOriginalImg(previewImg);
  instance.show();

  window.addEventListener('keydown', onEscCloseModal);
  backBtn.addEventListener('click', onBackBtnClickShowPreviousImg);
  nextBtn.addEventListener('click', onNextBtnClickShowNextImg);
};

gallery.addEventListener('click', onModalOpen);
