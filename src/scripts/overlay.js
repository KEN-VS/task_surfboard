(function() {
    const hamburger = document.querySelector(".hamburger");
    const overlay = document.querySelector(".overlay");


    function toggleMenu() {
        hamburger.classList.toggle("hamburger--active");
        overlay.classList.toggle("overlay--active");
    };

    hamburger.addEventListener("click", toggleMenu);

    let overlayItems = document.querySelectorAll(".overlay__link");
    for (let i = 0; i < overlayItems.length; i++) {
        overlayItems[i].addEventListener("click", toggleMenu);
    }


})()