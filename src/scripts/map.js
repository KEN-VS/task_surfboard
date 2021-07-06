(function() {
    let myMap;

    ymaps.ready(init);

    function init() {
        myMap = new ymaps.Map("map", {
            center: [55.752886, 37.582089],
            zoom: 14,
            controls: []
        });

        const myPlaceMark = new ymaps.Placemark([55.752004, 37.576133], {}, {
            draggable: false,
            iconLayout: 'default#image',
            iconImageHref: './img/mark.svg',
            iconImageSize: [44, 54],
            iconImageOffset: [-30, -50]

        });

        myMap.geoObjects.add(myPlaceMark);

        myMap.behaviors.disable('scrollZoom');

    }
})()