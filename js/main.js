/* ═══════════════════════════════════════════════
   龙苑农庄官网 — 全局脚本
   功能：导航交互 / 轮播图 / 灯箱 / 动画 / 表单
   ═══════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── DOM Ready ───
  document.addEventListener('DOMContentLoaded', function () {
    initMobileMenu();
    initHeroCarousel();
    initNavScroll();
    initScrollAnimations();
    initBackToTop();
    initFormValidation();
    initLazyLoading();
    initSmoothScroll();
  });

  // ─── 1. Mobile Menu ───
  function initMobileMenu() {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('.nav-links');
    var links = document.querySelectorAll('.nav-links a');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      toggle.classList.toggle('active');
      nav.classList.toggle('open');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu on link click
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('active');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close menu on outside click
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !toggle.contains(e.target) && nav.classList.contains('open')) {
        toggle.classList.remove('active');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // ─── 2. Hero Carousel ───
  function initHeroCarousel() {
    var slides = document.querySelectorAll('.hero-slide');
    var dots = document.querySelectorAll('.hero-dot');
    var prev = document.querySelector('.hero-arrow--prev');
    var next = document.querySelector('.hero-arrow--next');
    if (slides.length === 0) return;

    var current = 0;
    var interval;
    var AUTOPLAY_DELAY = 5000;

    function goTo(index) {
      slides[current].classList.remove('active');
      if (dots.length) dots[current].classList.remove('active');
      current = ((index % slides.length) + slides.length) % slides.length;
      slides[current].classList.add('active');
      if (dots.length) dots[current].classList.add('active');
    }

    function nextSlide() { goTo(current + 1); }
    function prevSlide() { goTo(current - 1); }

    // Auto play
    function startAutoplay() {
      stopAutoplay();
      interval = setInterval(nextSlide, AUTOPLAY_DELAY);
    }

    function stopAutoplay() {
      if (interval) clearInterval(interval);
    }

    // Controls
    if (prev) prev.addEventListener('click', function () { prevSlide(); startAutoplay(); });
    if (next) next.addEventListener('click', function () { nextSlide(); startAutoplay(); });

    // Dots
    if (dots.length) {
      dots.forEach(function (dot, i) {
        dot.addEventListener('click', function () {
          goTo(i);
          startAutoplay();
        });
      });
    }

    // Pause on hover
    var hero = document.querySelector('.hero');
    if (hero) {
      hero.addEventListener('mouseenter', stopAutoplay);
      hero.addEventListener('mouseleave', startAutoplay);
    }

    // Touch swipe
    var touchStartX = 0;
    if (hero) {
      hero.addEventListener('touchstart', function (e) {
        touchStartX = e.touches[0].clientX;
        stopAutoplay();
      });
      hero.addEventListener('touchend', function (e) {
        var diff = touchStartX - e.changedTouches[0].clientX;
        if (diff > 50) nextSlide();
        if (diff < -50) prevSlide();
        startAutoplay();
      });
    }

    startAutoplay();
  }

  // ─── 3. Nav Scroll Effect ───
  function initNavScroll() {
    var nav = document.querySelector('.nav');
    if (!nav) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });

    // Check initial state
    if (window.scrollY > 50) nav.classList.add('scrolled');
  }

  // ─── 4. Scroll Animations (IntersectionObserver) ───
  function initScrollAnimations() {
    var animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .stagger-children');

    if (animatedElements.length === 0) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  }


  // ─── 6. Back to Top ───
  function initBackToTop() {
    var btn = document.querySelector('.back-to-top');
    if (!btn) {
      btn = document.createElement('button');
      btn.className = 'back-to-top';
      btn.setAttribute('aria-label', '回到顶部');
      btn.innerHTML = '↑';
      document.body.appendChild(btn);
    }

    window.addEventListener('scroll', function () {
      if (window.scrollY > 500) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ─── 7. Contact Form Validation ───
  function initFormValidation() {
    var form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var valid = true;
      var name = form.querySelector('[name="name"]');
      var phone = form.querySelector('[name="phone"]');
      var message = form.querySelector('[name="message"]');

      // Clear previous errors
      form.querySelectorAll('.form-error').forEach(function (el) { el.remove(); });
      form.querySelectorAll('.form-group input, .form-group textarea').forEach(function (el) {
        el.style.borderColor = '';
      });

      function showError(field, msg) {
        var error = document.createElement('span');
        error.className = 'form-error';
        error.style.cssText = 'color: #C9622E; font-size: 0.75rem; margin-top: 4px; display: block;';
        error.textContent = msg;
        field.parentNode.appendChild(error);
        field.style.borderColor = '#C9622E';
        valid = false;
      }

      // Name validation
      if (name && !name.value.trim()) {
        showError(name, '请输入您的姓名');
      }

      // Phone validation
      if (phone && phone.value.trim()) {
        var phonePattern = /^1[3-9]\d{9}$/;
        if (!phonePattern.test(phone.value.replace(/\s/g, ''))) {
          showError(phone, '请输入正确的手机号码');
        }
      }

      // Message validation
      if (message && !message.value.trim()) {
        showError(message, '请输入留言内容');
      }

      if (!valid) return;

      // Show success
      var successEl = form.querySelector('.form-success');
      if (successEl) {
        form.querySelector('.form-fields').style.display = 'none';
        successEl.classList.add('show');
      } else {
        alert('提交成功！感谢您的留言，我们会尽快与您联系。');
        form.reset();
      }
    });
  }

  // ─── 8. Lazy Loading Images ───
  function initLazyLoading() {
    // All images below hero already have loading="lazy" in HTML
    // This handles older browsers with custom implementation
    if (!('IntersectionObserver' in window)) return;

    var lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if (lazyImages.length === 0) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach(function (img) {
      observer.observe(img);
    });
  }

  // ─── 9. Smooth Scroll for Anchor Links ───
  function initSmoothScroll() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;
      var target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = 80; // nav height offset
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  }

})();
