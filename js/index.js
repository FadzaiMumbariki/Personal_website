// ===========================
// NAVBAR SCROLL EFFECT
// ===========================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===========================
// ACTIVE NAV LINK ON SCROLL
// ===========================
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) {
      current = sec.getAttribute('id');
    }
  });
  navAnchors.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) {
      a.classList.add('active');
    }
  });
});

// ===========================
// HAMBURGER MENU
// ===========================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  // Animate bars
  const bars = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    bars[0].style.transform = 'translateY(7.5px) rotate(45deg)';
    bars[1].style.opacity = '0';
    bars[2].style.transform = 'translateY(-7.5px) rotate(-45deg)';
  } else {
    bars[0].style.transform = '';
    bars[1].style.opacity = '1';
    bars[2].style.transform = '';
  }
});

// Close menu on nav link click
navAnchors.forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const bars = hamburger.querySelectorAll('span');
    bars[0].style.transform = '';
    bars[1].style.opacity = '1';
    bars[2].style.transform = '';
  });
});

// ===========================
// TESTIMONIAL SLIDER
// ===========================
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');
let current = 0;
let autoSlide;

function showSlide(index) {
  testimonials.forEach((t, i) => {
    t.classList.toggle('active', i === index);
  });
  dots.forEach((d, i) => {
    d.classList.toggle('active', i === index);
  });
  current = index;
}

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const idx = parseInt(dot.getAttribute('data-index'));
    showSlide(idx);
    resetAutoSlide();
  });
});

function nextSlide() {
  const next = (current + 1) % testimonials.length;
  showSlide(next);
}

function resetAutoSlide() {
  clearInterval(autoSlide);
  autoSlide = setInterval(nextSlide, 5000);
}

autoSlide = setInterval(nextSlide, 5000);

// ===========================
// SCROLL-IN ANIMATION
// ===========================
const animateEls = document.querySelectorAll(
  '.service-card, .about-grid, .best-care-grid, .testimonial-wrapper, .about-text, .about-image-wrap'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.13 });

animateEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(32px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  observer.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
  // Trigger on elements already in view on load
  animateEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    }
  });
});

// Make visible class work
const style = document.createElement('style');
style.textContent = `.visible { opacity: 1 !important; transform: none !important; }`;
document.head.appendChild(style);