
const navbar = document.querySelector('.navbar');
const links = [...document.querySelectorAll('[data-nav]')];
const indicator = document.querySelector('.nav-indicator');
const sections = links.map(a => document.querySelector(a.getAttribute('href')));

function onScroll() {
  const y = window.scrollY;
  document.body.classList.toggle('scrolled', y > 10);

  const navBottom = navbar.getBoundingClientRect().bottom + window.scrollY;
  let activeIndex = sections.length - 1;
  for (let i = 0; i < sections.length; i++) {
    const rect = sections[i].getBoundingClientRect();
    const top = rect.top + window.scrollY;
    if (navBottom >= top && navBottom < top + rect.height) { activeIndex = i; break; }
  }
  links.forEach((a, i) => a.classList.toggle('active', i === activeIndex));

  const active = links[activeIndex];
  const r = active.getBoundingClientRect();
  const ul = active.parentElement.parentElement.getBoundingClientRect();
  const left = r.left - ul.left;
  indicator.style.width = r.width + 'px';
  indicator.style.transform = `translateX(${left}px)`;
}
window.addEventListener('scroll', onScroll);
window.addEventListener('resize', onScroll);
window.addEventListener('load', onScroll);

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
toggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Carousel
const track = document.querySelector('.track');
const slides = [...document.querySelectorAll('.slide')];
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
let index = 0;

function go(i) {
  index = (i + slides.length) % slides.length;
  track.style.transform = `translateX(-${index * 100}%)`;
}
next.addEventListener('click', () => go(index + 1));
prev.addEventListener('click', () => go(index - 1));

// Touch support
let startX = 0;
track.addEventListener('touchstart', e => startX = e.touches[0].clientX, { passive: true });
track.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - startX;
  if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
});

// Modal
const modal = document.getElementById('infoModal');
document.querySelector('[data-open-modal]').addEventListener('click', () => modal.showModal());

