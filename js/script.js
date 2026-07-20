/* ============================================
   NEW DNYANESHWARI GUEST HOUSE & VILLA — script.js
   ============================================ */
document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Header scroll state ---------- */
  var header = document.querySelector('.site-header');
  function onScroll () {
    if (!header) return;
    if (window.scrollY > 40) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var navList = document.querySelector('.nav-list');
  if (toggle && navList) {
    toggle.addEventListener('click', function () {
      navList.classList.toggle('is-open');
    });
    document.querySelectorAll('.has-dropdown > .nav-link').forEach(function (link) {
      link.addEventListener('click', function (e) {
        if (window.innerWidth <= 760) {
          e.preventDefault();
          link.parentElement.classList.toggle('is-open');
        }
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el, i) {
      el.style.setProperty('--i', i % 6);
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Hero auto slider ---------- */
  var heroSlides = document.querySelectorAll('.hero-slide');
  var heroDotsWrap = document.querySelector('.hero-dots');
  if (heroSlides.length) {
    var heroIndex = 0;
    if (heroDotsWrap) {
      heroSlides.forEach(function (_, i) {
        var b = document.createElement('button');
        if (i === 0) b.classList.add('is-active');
        b.addEventListener('click', function () { showHero(i); resetHeroTimer(); });
        heroDotsWrap.appendChild(b);
      });
    }
    function showHero (i) {
      heroSlides.forEach(function (s) { s.classList.remove('is-active'); });
      heroDotsWrap && heroDotsWrap.querySelectorAll('button').forEach(function (b) { b.classList.remove('is-active'); });
      heroSlides[i].classList.add('is-active');
      heroDotsWrap && heroDotsWrap.children[i] && heroDotsWrap.children[i].classList.add('is-active');
      heroIndex = i;
    }
    var heroTimer;
    function resetHeroTimer () {
      clearInterval(heroTimer);
      heroTimer = setInterval(function () {
        showHero((heroIndex + 1) % heroSlides.length);
      }, 5200);
    }
    resetHeroTimer();
  }

  /* ---------- Auto-sliding photo panels (self-playing) ----------
     Used for the About Us photo panel AND every Digital Menu food-photo
     panel. Each .about-slider on the page runs completely independently,
     so a page can have many of them (e.g. one per menu category). */
  document.querySelectorAll('.about-slider').forEach(function (aboutSlider) {
    var aSlides = aboutSlider.querySelectorAll('.slide');
    var aProgress = aboutSlider.querySelector('.about-slider-progress i');
    var aBadge = aboutSlider.querySelector('.about-slider-badge');
    var aIndex = 0;
    var duration = 4200;
    var elapsed = 0;
    var tickMs = 40;

    function paintAbout (i) {
      aSlides.forEach(function (s) { s.classList.remove('is-active'); });
      aSlides[i].classList.add('is-active');
      if (aBadge) aBadge.textContent = aSlides[i].dataset.caption || '';
      aIndex = i;
      elapsed = 0;
    }
    if (aSlides.length) paintAbout(0);

    setInterval(function () {
      elapsed += tickMs;
      if (aProgress) aProgress.style.width = Math.min(100, (elapsed / duration) * 100) + '%';
      if (elapsed >= duration) {
        paintAbout((aIndex + 1) % aSlides.length);
      }
    }, tickMs);
  });

  /* ---------- Inner-page hero auto slider (same idea as the home hero) ---------- */
  document.querySelectorAll('.page-hero').forEach(function (pageHero) {
    var pSlides = pageHero.querySelectorAll('.page-hero-slide');
    if (!pSlides.length) return;
    var pIndex = 0;
    setInterval(function () {
      pSlides[pIndex].classList.remove('is-active');
      pIndex = (pIndex + 1) % pSlides.length;
      pSlides[pIndex].classList.add('is-active');
    }, 4800);
  });

  /* ---------- Testimonial slider (in-line, auto-sliding) ---------- */
  document.querySelectorAll('.testimonial-track').forEach(function (track) {
    var originalSlides = Array.prototype.slice.call(track.children);
    if (!originalSlides.length) return;
    // Duplicate the set once so the track can loop seamlessly.
    originalSlides.forEach(function (s) { track.appendChild(s.cloneNode(true)); });
    var total = originalSlides.length;
    var index = 0;

    function step () {
      return track.children[0].getBoundingClientRect().width;
    }
    function render (animate) {
      track.style.transition = animate ? 'transform .7s var(--ease)' : 'none';
      track.style.transform = 'translateX(-' + (index * step()) + 'px)';
    }
    track.addEventListener('transitionend', function () {
      if (index >= total) { index = 0; render(false); }
    });
    window.addEventListener('resize', function () { render(false); });

    render(false);
    setInterval(function () { index++; render(true); }, 3200);
  });

  /* ---------- Room detail thumbnail switcher ---------- */
  var thumbBtns = document.querySelectorAll('.room-thumbs button');
  var mainImg = document.querySelector('.room-gallery-main img');
  if (thumbBtns.length && mainImg) {
    thumbBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        thumbBtns.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        mainImg.src = btn.querySelector('img').src;
      });
    });
  }

  /* ---------- Gallery filter ---------- */
  var filterBtns = document.querySelectorAll('.gallery-filters button');
  var galleryItems = document.querySelectorAll('.gallery-item');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      var f = btn.dataset.filter;
      galleryItems.forEach(function (item) {
        var show = f === 'all' || item.dataset.category === f;
        item.style.display = show ? '' : 'none';
      });
    });
  });

  /* ---------- Gallery lightbox ---------- */
  var lightbox = document.querySelector('.lightbox');
  if (lightbox && galleryItems.length) {
    var lbImg = lightbox.querySelector('img');
    var lbCap = lightbox.querySelector('figcaption');
    var visibleItems = function () { return Array.prototype.slice.call(galleryItems).filter(function (i) { return i.style.display !== 'none'; }); };
    var lbIndex = 0;

    function openLb (item) {
      var list = visibleItems();
      lbIndex = list.indexOf(item);
      paintLb();
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
    function paintLb () {
      var list = visibleItems();
      var item = list[lbIndex];
      if (!item) return;
      var img = item.querySelector('img');
      lbImg.src = img.src;
      lbCap.textContent = img.alt || '';
    }
    galleryItems.forEach(function (item) {
      item.addEventListener('click', function () { openLb(item); });
    });
    var closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn && closeBtn.addEventListener('click', function () {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
    });
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) {
        lightbox.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
    var prevBtn = lightbox.querySelector('.lightbox-nav.prev');
    var nextBtn = lightbox.querySelector('.lightbox-nav.next');
    prevBtn && prevBtn.addEventListener('click', function () {
      var list = visibleItems();
      lbIndex = (lbIndex - 1 + list.length) % list.length;
      paintLb();
    });
    nextBtn && nextBtn.addEventListener('click', function () {
      var list = visibleItems();
      lbIndex = (lbIndex + 1) % list.length;
      paintLb();
    });
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') { lightbox.classList.remove('is-open'); document.body.style.overflow = ''; }
      if (e.key === 'ArrowLeft') prevBtn && prevBtn.click();
      if (e.key === 'ArrowRight') nextBtn && nextBtn.click();
    });
  }

  /* ---------- Contact form (static demo — no backend) ---------- */
  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var success = document.querySelector('.form-success');
      if (success) success.classList.add('is-visible');
      form.reset();
    });
  }

});
