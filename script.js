"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const sectionSignUp = document.querySelector(".section--sign-up");

///////////////////////////////////////
// Modal window

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

// Button scrolling
btnScrollTo.addEventListener("click", function (e) {
  const s1Coords = section1.getBoundingClientRect();

  section1.scrollIntoView({ behavior: "smooth" });
});

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    const scrollTo = document.querySelector(id);
    scrollTo.scrollIntoView({ behavior: "smooth" });
  }
});

// Tabbed component
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");

  // .1
  // if (clicked?.classList.contains("operations__tab")) {
  //   clicked.classList.add("operations__tab--active");
  // }

  // .2
  if (!clicked) return;

  // button
  tabs.forEach((tab) => {
    tab.classList.remove("operations__tab--active");
  });

  clicked.classList.add("operations__tab--active");

  // Content
  tabsContent.forEach((tab) => {
    tab.classList.remove("operations__content--active");
  });

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

// Fade out navigation
const navigation = document.querySelector(".nav");

const handleHover = function (amount, e) {
  if (e.target.classList.contains("nav__link")) {
    const hoveredLink = e.target;
    const img = hoveredLink.closest(".nav").querySelector(".nav__logo");
    const links = hoveredLink.closest(".nav").querySelectorAll(".nav__link");

    links.forEach((link) => {
      link.style.opacity = amount;
    });
    img.style.opacity = amount;

    if (amount === 0.5) {
      hoveredLink.style.opacity = 1;
    }
  }
};

navigation.addEventListener("mouseover", function (e) {
  handleHover(0.5, e);
});

navigation.addEventListener("mouseout", function (e) {
  handleHover(1, e);
});

// Sticky navigation
const header = document.querySelector(".header");
const navHeight = navigation.getBoundingClientRect().height;

const callback = function (entries) {
  if (entries[0].isIntersecting === false) {
    navigation.classList.add("sticky");
  } else {
    navigation.classList.remove("sticky");
  }
};
const options = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const scrollAmount = new IntersectionObserver(callback, options);
scrollAmount.observe(header);

// Reveal section
const allSections = document.querySelectorAll(".section");

const callbackReveal = function (entries, observer) {
  if (entries[0].isIntersecting) {
    entries[0].target.classList.remove("section--hidden");

    observer.unobserve(entries[0].target);
  }
};

const sectionReveal = new IntersectionObserver(callbackReveal, {
  root: null,
  threshold: 0.15,
});

allSections.forEach((section) => {
  sectionReveal.observe(section);

  // hide sections
  // section.classList.add("section--hidden");
});

// Lazy image
const images = document.querySelectorAll(".features__img");

const changeCallback = function (entries, observer) {
  if (entries[0].isIntersecting) {
    entries[0].target.setAttribute(
      "src",
      entries[0].target.getAttribute("data-src")
    );

    entries[0].target.addEventListener("load", function () {
      entries[0].target.classList.remove("lazy-img");
    });

    observer.unobserve(entries[0].target);
  }
};

const changeSrc = new IntersectionObserver(changeCallback, {
  root: null,
  threshold: 0,
  rootMargin: "-200px",
});

images.forEach((img) => {
  changeSrc.observe(img);
});

// Slider
// const slider = document.querySelector(".slider");
// slider.style.transform = "scale(0.3)";
// slider.style.overflow = "visible";

const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");

const dotContainer = document.querySelector(".dots");
const dots = document.querySelectorAll(".dots__dot");

let curSlide = 0;

// const goToSlide = function (slide) {
//   slides.forEach((s, i) => {
//     s.style.transform = `translateX(${(i - slide) * 100}%)`;
//   });
// };

// goToSlide(0);

// const createDots = function () {
//   slides.forEach((_, i) => {
//     dotContainer.insertAdjacentHTML(
//       "beforeend",
//       `<button class="dots__dot" data-slide="${i}"></button>`
//     );
//   });
// };
// createDots();

// const activateDot = function (slide) {
//   document.querySelectorAll(".dots__dot").forEach((dot) => {
//     dot.classList.remove("dots__dot--active");
//   });

//   document
//     .querySelector(`.dots__dot[data-slide="${slide}"]`)
//     .classList.add("dots__dot--active");
// };
// activateDot(0);

// // Right
// const nextSlide = function () {
//   if (curSlide === slides.length - 1) {
//     curSlide = 0;
//   } else {
//     curSlide += 1;
//   }

//   goToSlide(curSlide);
//   activateDot(curSlide);
// };
// btnRight.addEventListener("click", nextSlide);

// // Left
// const prevSlide = function () {
//   if (curSlide === 0) {
//     curSlide = slides.length - 1;
//   } else {
//     curSlide -= 1;
//   }

//   goToSlide(curSlide);
//   activateDot(curSlide);
// };
// btnLeft.addEventListener("click", prevSlide);

// document.addEventListener("keydown", function (e) {
//   if (e.key === "ArrowLeft") {
//     prevSlide();
//   }
//   if (e.key === "ArrowRight") {
//     nextSlide();
//   }
// });

// dotContainer.addEventListener("click", function (e) {
//   if (e.target.classList.contains("dots__dot")) {
//     const slide = e.target.dataset.slide;

//     goToSlide(slide);
//     activateDot(slide);
//   }
// });

//

slides.forEach((_, i) => {
  dotContainer.insertAdjacentHTML(
    "beforeend",
    `<button class="dots__dot" data-slide="${i}"></button>`
  );
});

const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${(i - slide) * 100}%)`;
  });
};

goToSlide(0);

const activateDot = function (num) {
  const dots = document.querySelectorAll(".dots__dot");
  dots.forEach((dot) => {
    dot.classList.remove("dots__dot--active");
  });

  const activeDot = document.querySelector(`.dots__dot[data-slide="${num}"]`);
  activeDot.classList.add("dots__dot--active");
};

activateDot(0);

// Right
const nextSlide = function () {
  if (curSlide === slides.length - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  goToSlide(curSlide);
  activateDot(curSlide);
};
btnRight.addEventListener("click", nextSlide);

// Left
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = slides.length - 1;
  } else {
    curSlide--;
  }

  goToSlide(curSlide);
  activateDot(curSlide);
};
btnLeft.addEventListener("click", prevSlide);

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") {
    prevSlide();
  }
  if (e.key === "ArrowRight") {
    nextSlide();
  }
});

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const clickedBtn = e.target;
    console.log(clickedBtn.dataset.slide);
    goToSlide(clickedBtn.dataset.slide);
    activateDot(clickedBtn.dataset.slide);
  }
});

///////////////////
