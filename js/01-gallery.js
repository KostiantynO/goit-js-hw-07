import { galleryItems } from './gallery-items.js';
const itemsCount = galleryItems.length;

// Gallery
const gallery = document.querySelector('.gallery');
const galleryMarkup = makeMarkup(galleryItems);
renderMarkup({ targetEl: gallery, markupToRender: galleryMarkup });

// Modal
const modalMarkup = `
<button class="back-btn" back-btn type="button">◀</button>
  <img data-idx="" src="" alt="" original-image>
  <p class="gallery-modal__description"><span class="gallery-modal__span" image-desc></span></p>
  <p class="gallery-modal__items-count"> <span class="gallery-modal__current-item" current-item>0</span>/${
    itemsCount - 1
  }</p>
<button class="next-btn" next-btn type="button">▶</button>
`;
const modalOptions = {
  className: 'gallery-modal',
  onShow: onShowCallback,
  onClose: onCloseCallback,
};
const modal = basicLightbox.create(modalMarkup, modalOptions);
const backBtn = modal?.element()?.querySelector('[back-btn]');
const origImg = modal?.element()?.querySelector('[original-image]');
const imgDesc = modal?.element()?.querySelector('[image-desc]');
const curItem = modal?.element()?.querySelector('[current-item]');
const nextBtn = modal?.element()?.querySelector('[next-btn]');

// onClickListener
gallery.addEventListener('click', onImageClick);

// gallery markup initial render
function makeMarkup(galleryItemsObjectsArray) {
  const bigString = galleryItemsObjectsArray
    .map(
      ({ preview, original, description }, idx) =>
        ` <li class="gallery__item">
            <a class="gallery__link" href="${original}">
              <img class="gallery__image" data-idx="${idx}" src="${preview}" data-source="${original}" alt="${description}">
            </a>
          </li>`,
    )
    .join('');
  return bigString;
}
function renderMarkup({ markupToRender, targetEl }) {
  targetEl.innerHTML = '';
  targetEl.insertAdjacentHTML('beforeend', markupToRender);
}

// on image click callback - open modal
function onImageClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') return;

  const {
    dataset: { idx, source },
    alt,
  } = event.target;

  if (origImg.idx !== idx) {
    updateImg({ idx, source, alt });
  }
  modal.show();
}

// // inner functions
function updateImg({ idx, source, alt }) {
  origImg.src = source;
  origImg.alt = alt;
  origImg.dataset.idx = idx;
  imgDesc.textContent = alt;
  curItem.textContent = idx;
}

function idx(arg) {
  const origIdx = parseInt(origImg.dataset.idx);
  let index = arg === 'next' ? origIdx + 1 : origIdx - 1;

  if (index < 0) {
    index = itemsCount - 1;
  }
  if (index >= itemsCount) {
    index = 0;
  }

  return index;
}

function onPrevBtnClick() {
  const prevIdx = idx();
  const { original, description: alt } = galleryItems[prevIdx];
  updateImg({ idx: prevIdx, source: original, alt });
}

function onNextBtnClick() {
  const nextIdx = idx('next');
  const { original, description: alt } = galleryItems[nextIdx];
  updateImg({ idx: nextIdx, source: original, alt });
}

// general modal ui callbacks
function onShowCallback() {
  nextBtn?.addEventListener('click', onNextBtnClick, { passive: true });
  backBtn?.addEventListener('click', onPrevBtnClick, { passive: true });
  document.addEventListener('keydown', onEscCloseModal, { passive: true });
  document.body.style.overflow = 'hidden';
}
function onCloseCallback() {
  nextBtn?.removeEventListener('click', onNextBtnClick, { passive: true });
  backBtn?.removeEventListener('click', onPrevBtnClick, { passive: true });
  document.removeEventListener('keydown', onEscCloseModal, { passive: true });
  document.body.style.overflow = '';
}
function onEscCloseModal({ code }) {
  code === 'Escape' && modal.close();
}
