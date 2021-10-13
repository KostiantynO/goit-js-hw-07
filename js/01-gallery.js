import { galleryItems } from './gallery-items.js';
const createGalleryMarkup = array =>
  array
    .map(
      ({ preview, original, description }) => `
    <li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>
    `,
    )
    .join('');

const gallery = document.querySelector('.gallery');

const galleryMarkup = createGalleryMarkup(galleryItems);
gallery.insertAdjacentHTML('beforeend', galleryMarkup);

const modalMarkup = `
<div class="gallery-modal">
      <img class="gallery-modal__image" src="https://via.placeholder.com/640/480" alt="Description">
      <p class="gallery-modal__description"><span class="gallery-modal__span">Picture</span></p>
</div>
`;

const instance = basicLightbox.create(modalMarkup, {
  onClose: () => window.removeEventListener('keydown', onEscCloseModal),
});

const galleryModal = instance.element().querySelector('.gallery-modal');
const getSrcForOriginalImg = ({ dataset: { source }, alt }) => {
  const originalImg = galleryModal.firstElementChild;
  const span = galleryModal.querySelector('.gallery-modal__span');

  originalImg.src = source;
  originalImg.alt = alt;
  span.textContent = alt;
};

const onEscCloseModal = e => e.code === 'Escape' && instance.close();

const onModalOpen = e => {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  }

  const previewImg = e.target;
  getSrcForOriginalImg(previewImg);
  instance.show();
  window.addEventListener('keydown', onEscCloseModal);
};

gallery.addEventListener('click', onModalOpen);
