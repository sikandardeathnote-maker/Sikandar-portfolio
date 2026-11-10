/* Sikandar Khan portfolio: vanilla JS */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');
  var topBtn = document.getElementById('top');
  var links = menu.querySelectorAll('a');

  // Mobile menu
  function setMenu(open) {
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
  }
  burger.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
  links.forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  // Active nav link
  var sections = document.querySelectorAll('main section[id]');
  function markActive() {
    var y = window.scrollY + 120, current = 'home';
    sections.forEach(function (s) { if (s.offsetTop <= y) current = s.id; });
    links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + current); });
    topBtn.classList.toggle('show', window.scrollY > 600);
  }
  window.addEventListener('scroll', markActive, { passive: true });
  markActive();

  // Scroll reveal
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Back to top and footer year
  topBtn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  document.getElementById('year').textContent = new Date().getFullYear();
})();
