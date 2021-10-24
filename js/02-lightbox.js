import { galleryItems } from './gallery-items.js';
// Change code below this line

const gallery = document.querySelector('.gallery');

const createGalleryMarkup = array =>
  array
    .map(
      ({ preview, original, description }, i) =>
        `<li class="gallery__item">
           <a class="gallery__link" href="${original}">
            <img class="gallery__image" src="${preview}" alt="${description}" />
           </a>
         </li>
        `,
    )
    .join('');

const galleryMarkup = createGalleryMarkup(galleryItems);
gallery.insertAdjacentHTML('beforeend', galleryMarkup);

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
