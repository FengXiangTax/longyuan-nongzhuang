/* ═══════════════════════════════════════════════
   龙苑农庄官网 v2 — 优化增强脚本
   功能：强刺激数据墙数字滚动动画 + FAQ 折叠
   ═══════════════════════════════════════════════ */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initCountUp();
    initFaq();
  });

  // ─── 数字滚动动画（进入视口时从 0 递增） ───
  function initCountUp() {
    var els = document.querySelectorAll('[data-count]');
    if (!els.length || !('IntersectionObserver' in window)) {
      // 兜底：直接显示终值
      els.forEach(function (el) { el.textContent = el.getAttribute('data-count'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseFloat(el.getAttribute('data-count'));
        var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
        var duration = 1400;
        var start = null;

        function step(ts) {
          if (!start) start = ts;
          var progress = Math.min((ts - start) / duration, 1);
          // easeOutCubic
          var ease = 1 - Math.pow(1 - progress, 3);
          var current = target * ease;
          el.textContent = (decimals > 0)
            ? current.toFixed(decimals)
            : Math.floor(current).toLocaleString('en-US');
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            el.textContent = (decimals > 0)
              ? target.toFixed(decimals)
              : Math.floor(target).toLocaleString('en-US');
          }
        }
        requestAnimationFrame(step);
        observer.unobserve(el);
      });
    }, { threshold: 0.4 });

    els.forEach(function (el) { observer.observe(el); });
  }

  // ─── FAQ 折叠 ───
  function initFaq() {
    var items = document.querySelectorAll('.faq-item');
    items.forEach(function (item) {
      var q = item.querySelector('.faq-q');
      var a = item.querySelector('.faq-a');
      if (!q || !a) return;
      q.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');
        if (isOpen) {
          item.classList.remove('open');
          a.style.maxHeight = null;
        } else {
          item.classList.add('open');
          a.style.maxHeight = a.scrollHeight + 'px';
        }
      });
    });
  }
})();
