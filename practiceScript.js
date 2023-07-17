"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const navBtnContainer = document.querySelector(".nav__links");
const nav = document.querySelector(".nav");
const allLazyImages = document.querySelectorAll(".features__img");
const operationBtnsContainer = document.querySelector(
  ".operations__tab-container"
);
const allOperationBtns = document.querySelectorAll(".operations__tab");
const allOperationContents = document.querySelectorAll(".operations__content");
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;
const btnRight = document.querySelector(".slider__btn--right");
const btnLeft = document.querySelector(".slider__btn--left");
const allSlides = document.querySelectorAll(".slide");
let slideNum = 0;
const allDots = document.querySelectorAll(".dots__dot");
const dotsContainer = document.querySelector(".dots");
const allSections = document.querySelectorAll(".section");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => {
  btn.addEventListener("click", openModal);
});

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

///////////////////////////////////////////////////////////////////
// Smooth buttons
navBtnContainer.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav__link")) {
    const goTOSection = document.querySelector(e.target.getAttribute("href"));
    goTOSection.scrollIntoView({ behavior: "smooth" });
  }
});

// Navigation buttons hover
const changeOpacity = function (amount, e) {
  if (e.target.classList.contains("nav__link")) {
    const btn = e.target;
    const allButtons = btn.closest(".nav").querySelectorAll(".nav__link");
    const navImage = btn.closest(".nav").querySelector(".nav__logo");
    allButtons.forEach((btn) => {
      btn.style.opacity = amount;
    });
    navImage.style.opacity = amount;
    if (amount === 0.5) {
      btn.style.opacity = 1;
    }
  }
};
nav.addEventListener("mouseover", function (e) {
  changeOpacity(0.5, e);
});
nav.addEventListener("mouseout", function (e) {
  changeOpacity(1, e);
});

// Lazy images
const changeImageCB = function (entries, observer) {
  if (entries[0].isIntersecting) {
    const target = entries[0].target;
    const mainSrc = target.getAttribute("data-src");
    target.setAttribute("src", mainSrc);
    target.classList.remove("lazy-img");
    observer.unobserve(target);
  }
};
const changeImage = new IntersectionObserver(changeImageCB, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});
allLazyImages.forEach((img) => {
  changeImage.observe(img);
});

// Operation
operationBtnsContainer.addEventListener("click", function (e) {
  const btn = e.target.closest(".operations__tab");
  if (!btn) return;
  const tab = btn.dataset.tab;
  const activeTab = document.querySelector(`.operations__content--${tab}`);
  // Btn
  allOperationBtns.forEach((btn) => {
    btn.classList.remove("operations__tab--active");
  });
  btn.classList.add("operations__tab--active");
  // Content
  allOperationContents.forEach((content) => {
    content.classList.remove("operations__content--active");
  });
  activeTab.classList.add("operations__content--active");
});

// Sticky navigation
const showNavCB = function (entries) {
  if (entries[0].isIntersecting) {
    nav.classList.remove("sticky");
  } else {
    nav.classList.add("sticky");
  }
};
const showNav = new IntersectionObserver(showNavCB, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
showNav.observe(header);

// Slider component
const changeSlide = function (slide) {
  allSlides.forEach((s, i) => {
    s.style.transform = `translateX(${(i - slide) * 100}%)`;
  });
};

// Initial condition
changeSlide(0);
const nextSlide = function () {
  if (slideNum === allSlides.length - 1) {
    slideNum = 0;
  } else {
    slideNum++;
  }
  changeSlide(slideNum);
  activeDot(slideNum);
};
const prevSlide = function () {
  if (slideNum !== 0) {
    slideNum--;
  } else {
    slideNum = allSlides.length - 1;
  }
  changeSlide(slideNum);
  activeDot(slideNum);
};
// Right
btnRight.addEventListener("click", nextSlide);
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") {
    nextSlide();
  }
});
// Left
btnLeft.addEventListener("click", prevSlide);
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") {
    prevSlide();
  }
});
// Create dots
allSlides.forEach((_, i) => {
  dotsContainer.insertAdjacentHTML(
    "beforeend",
    `
    <button class="dots__dot" data-slide="${i}"></button>
    `
  );
});
const activeDot = function (slideNumber) {
  allDots.forEach((dot) => {
    dot.classList.remove("dots__dot--active");
  });
  const active = document.querySelector(
    `.dots__dot[data-slide="${slideNumber}"]`
  );
  active.classList.add("dots__dot--active");
};
activeDot(0);
dotsContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    changeSlide(e.target.dataset.slide);
    activeDot(e.target.dataset.slide);
  }
});

// Section reveal
allSections.forEach((section) => {
  section.classList.add("section--hidden");
});

const revealCB = function (entries, observer) {
  if (entries[0].isIntersecting) {
    entries[0].target.classList.remove("section--hidden");
    observer.unobserve(entries[0].target);
  }
};
const revealSection = new IntersectionObserver(revealCB, {
  root: null,
  threshold: 0.15,
});
allSections.forEach((section) => {
  revealSection.observe(section);
});
