/* 西村直樹｜熱意の編集者 — site script (no dependencies) */
(function () {
  'use strict';

  /* footer year */
  var y = document.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());

  /* thanks page: absolute URL so FormSubmit can redirect back correctly */
  var next = document.getElementById('next-url');
  if (next) next.value = new URL('thanks.html', location.href).href;

  /* reveal on scroll */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items = document.querySelectorAll('.reveal');
  if (!reduce && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  /* form: inline validation */
  var form = document.getElementById('contact-form');
  if (!form) return;

  var fields = Array.prototype.slice.call(form.querySelectorAll('input[required], textarea[required]'));

  function setState(el, valid) {
    var wrap = el.closest('.field');
    if (!wrap) return;
    wrap.classList.toggle('invalid', !valid);
    el.setAttribute('aria-invalid', valid ? 'false' : 'true');
  }

  function validate(el) {
    var ok = el.checkValidity();
    if (el.tagName === 'TEXTAREA' && el.value.trim().length < 10) ok = false;
    setState(el, ok);
    return ok;
  }

  fields.forEach(function (el) {
    var evt = el.type === 'checkbox' ? 'change' : 'blur';
    el.addEventListener(evt, function () { validate(el); });
    el.addEventListener('input', function () {
      if (el.closest('.field').classList.contains('invalid')) validate(el);
    });
  });

  form.addEventListener('submit', function (ev) {
    var firstBad = null;
    fields.forEach(function (el) {
      if (!validate(el) && !firstBad) firstBad = el;
    });
    if (firstBad) {
      ev.preventDefault();
      firstBad.focus();
      firstBad.scrollIntoView({ block: 'center', behavior: reduce ? 'auto' : 'smooth' });
      return;
    }
    var btn = form.querySelector('button[type="submit"]');
    if (btn) { btn.disabled = true; btn.textContent = '送信しています…'; }
  });
})();
