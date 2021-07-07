(function() {
    const hamburger = document.querySelector(".hamburger");
    const overlay = document.querySelector(".overlay");
    const body = document.querySelector("body");


    function toggleMenu() {
        body.classList.toggle("fancybox-active");
        body.classList.toggle("compensate-for-scrollbar");
        hamburger.classList.toggle("hamburger--active");
        overlay.classList.toggle("overlay--active");
    };

    hamburger.addEventListener("click", toggleMenu);

    let overlayItems = document.querySelectorAll(".overlay__link");
    for (let i = 0; i < overlayItems.length; i++) {
        overlayItems[i].addEventListener("click", toggleMenu);
    }


})()