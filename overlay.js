const hamburger = document.querySelector(".hamburger");
const overlay = document.querySelector(".overlay");

function toggleMenu() {
    hamburger.classList.toggle("hamburger--active");
    overlay.classList.toggle("overlay--active");
    blockScroll()
};

hamburger.addEventListener("click", toggleMenu);