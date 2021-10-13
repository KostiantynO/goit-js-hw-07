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

const onModalOpen = e => {
  e.preventDefault();
};
gallery.addEventListener('click', onModalOpen);
