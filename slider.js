const buttonLeft = document.querySelector('#sliderLeft');
const buttonRight = document.querySelector("#sliderRight");
const prodList = document.querySelector('.products');
const prodItems = document.querySelectorAll('.products__item');

let prodItemsWidth = getComputedStyle(prodItems[0]).width
let step = parseInt(prodItemsWidth);
const minRight = 0;
let maxRight = (prodItems.length - 1) * step;

let currentRight = 0;
let currentStep = 0;
const prodListStyles = getComputedStyle(prodList);
const initialTrans = `${prodListStyles['transition-property']} ${prodListStyles["transition-duration"]}`;

prodList.style.right = currentRight;

function updateSlider() {
    prodList.style.transition = 'none';
    let prodItemsWidth = getComputedStyle(prodItems[0]).width
    step = parseInt(prodItemsWidth);
    maxRight = (prodItems.length - 1) * step;
    currentRight = step * currentStep;
    prodList.style.right = `${currentRight}px`;
}

window.addEventListener("resize", updateSlider);

buttonRight.addEventListener('click', e => {
    e.preventDefault();
    prodList.style.transition = initialTrans;

    if (currentRight == maxRight) {
        currentRight = minRight;
        prodList.style.right = `${currentRight}px`;
        currentStep = 0;
        return;
    }

    if (currentRight < maxRight) {
        currentRight += step;
        prodList.style.right = `${currentRight}px`;
        currentStep++;
    }

})

buttonLeft.addEventListener('click', e => {
    e.preventDefault();
    prodList.style.transition = initialTrans;

    if (currentRight == minRight) {
        currentRight = maxRight;
        prodList.style.right = `${currentRight}px`;
        currentStep = prodItems.length - 1;
        return;
    }

    if (currentRight > minRight) {
        currentRight -= step;
        prodList.style.right = `${currentRight}px`;
        currentStep--;

    }

})