import "@babel/polyfill";
import { showAlert } from "./alerts";

export const createSlides = async () => {
  try {
    const slides = document.querySelectorAll(".slide");
    let curSlide = 0;

    const btnRight = document.querySelector(".slider__btn--right");
    const btnLeft = document.querySelector(".slider__btn--left");

    const dotContainer = document.querySelector(".dots");

    const createDots = function () {
      slides.forEach((_, i) => {
        dotContainer.insertAdjacentHTML(
          "beforeend",
          `<button class="dots__dot" data-slide=${i}></button>`
        );
      });
    };
    createDots();

    const activeDot = function (active) {
      document.querySelectorAll(".dots__dot").forEach((dot) => {
        dot.classList.remove("dots__dot--active");
      });
      document
        .querySelector(`.dots__dot[data-slide="${active}"]`)
        .classList.add("dots__dot--active");
    };

    const goToSlide = function (loc) {
      slides.forEach((slide, i) => {
        slide.style.transform = `translateX(${(i - loc) * 100}%)`;
      });
      activeDot(loc);
    };

    const moveSlide = function () {
      curSlide += slides.length + this;
      curSlide %= slides.length;
      goToSlide(curSlide);
    };
    const moveLeft = moveSlide.bind(-1);
    const moveRight = moveSlide.bind(1);

    goToSlide(0);

    btnRight.addEventListener("click", moveRight);
    btnLeft.addEventListener("click", moveLeft);

    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") moveLeft();
      else if (e.key === "ArrowRight") moveRight();
    });

    const dots = document.querySelectorAll(".dots__dot");

    dotContainer.addEventListener("click", function (e) {
      if (e.target.classList.contains("dots__dot")) {
        curSlide = e.target.dataset.slide;
        goToSlide(curSlide);
      }
    });
  } catch (err) {
    showAlert("error", "Logout Failed, Try again!");
  }
};
