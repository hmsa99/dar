const heroSlides = document.querySelectorAll('.hero-slider .slide');
const heroDots = document.querySelector('.hero-slider .dots');
const heroPrev = document.querySelector('.hero-slider .prev');
const heroNext = document.querySelector('.hero-slider .next');
const statsNumbers = document.querySelectorAll('.stat-card .number');

let heroIndex = 0;

function buildDots() {
  heroSlides.forEach((_, idx) => {
    const dot = document.createElement('span');
    if (idx === heroIndex) dot.classList.add('active');
    dot.addEventListener('click', () => switchHero(idx));
    heroDots.appendChild(dot);
  });
}

function updateDots() {
  heroDots.querySelectorAll('span').forEach((dot, idx) => {
    dot.classList.toggle('active', idx === heroIndex);
  });
}

function switchHero(index) {
  heroSlides[heroIndex].classList.remove('active');
  heroIndex = (index + heroSlides.length) % heroSlides.length;
  heroSlides[heroIndex].classList.add('active');
  updateDots();
}

function autoSlide() {
  switchHero(heroIndex + 1);
}

buildDots();
let heroTimer = setInterval(autoSlide, 6000);

heroPrev.addEventListener('click', () => {
  clearInterval(heroTimer);
  switchHero(heroIndex - 1);
  heroTimer = setInterval(autoSlide, 6000);
});

heroNext.addEventListener('click', () => {
  clearInterval(heroTimer);
  switchHero(heroIndex + 1);
  heroTimer = setInterval(autoSlide, 6000);
});

// Projects slider
const projectSlides = document.querySelectorAll('.projects-slider .project-slide');
const projectPrev = document.querySelector('.projects-section .project-controls .prev');
const projectNext = document.querySelector('.projects-section .project-controls .next');
let projectIndex = 0;

function switchProject(delta) {
  projectSlides[projectIndex].classList.remove('active');
  projectIndex = (projectIndex + delta + projectSlides.length) % projectSlides.length;
  projectSlides[projectIndex].classList.add('active');
}

projectPrev.addEventListener('click', () => switchProject(-1));
projectNext.addEventListener('click', () => switchProject(1));

// News slider
const newsCards = document.querySelectorAll('.news-slider .news-card');
const newsPrev = document.querySelector('.news-section .news-controls .prev');
const newsNext = document.querySelector('.news-section .news-controls .next');
let newsIndex = 0;

function switchNews(delta) {
  newsCards[newsIndex].classList.remove('active');
  newsIndex = (newsIndex + delta + newsCards.length) % newsCards.length;
  newsCards[newsIndex].classList.add('active');
}

newsPrev.addEventListener('click', () => switchNews(-1));
newsNext.addEventListener('click', () => switchNews(1));

// Counter animation
function animateNumber(element) {
  const target = parseInt(element.dataset.target, 10);
  let current = 0;
  const increment = Math.max(1, Math.floor(target / 120));

  const interval = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(interval);
    }
    element.textContent = current.toLocaleString('ar-EG');
  }, 20);
}

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateNumber(entry.target);
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });

statsNumbers.forEach((num) => observer.observe(num));
