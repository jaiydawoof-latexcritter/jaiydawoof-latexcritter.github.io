(function () {
  const gallery  = document.getElementById('gallery');
  const empty    = document.getElementById('empty-state');
  const lightbox = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lb-img');
  const lbClose  = document.getElementById('lb-close');
  const lbPrev   = document.getElementById('lb-prev');
  const lbNext   = document.getElementById('lb-next');
  let   current  = 0;

  document.getElementById('year').textContent = new Date().getFullYear();

  // Build gallery
  if (!PHOTOS || PHOTOS.length === 0) {
    empty.style.display = 'block';
  } else {
    PHOTOS.forEach(function (photo, i) {
      const item = document.createElement('div');
      item.className = 'masonry-item';

      const img = new Image();
      img.alt = photo.alt || '';
      img.loading = 'lazy';
      img.onload = function () { img.classList.add('loaded'); };
      img.src = photo.src;
      img.addEventListener('click', function () { openLightbox(i); });

      item.appendChild(img);
      gallery.appendChild(item);
    });
  }

  // Lightbox controls
  function openLightbox(index) {
    current = index;
    lbImg.src = PHOTOS[current].src;
    lbImg.alt = PHOTOS[current].alt || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  function showPrev() {
    current = (current - 1 + PHOTOS.length) % PHOTOS.length;
    lbImg.src = PHOTOS[current].src;
    lbImg.alt = PHOTOS[current].alt || '';
  }

  function showNext() {
    current = (current + 1) % PHOTOS.length;
    lbImg.src = PHOTOS[current].src;
    lbImg.alt = PHOTOS[current].alt || '';
  }

  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', showPrev);
  lbNext.addEventListener('click', showNext);

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   showPrev();
    if (e.key === 'ArrowRight')  showNext();
  });
})();
