(function() {

    const measureWidth = (item) => {
        let reqItemWidth = 0;
        const screenWidth = $(window).width();
        const container = item.closest(".assortment__list");
        const titleBlocks = container.find(".assortment__title");
        const titleWidthPhone = titleBlocks.width();
        const titleWidth = titleBlocks.width() * titleBlocks.length;
        const textContainer = item.find(".assortment__content");
        const paddingLeft = parseInt(textContainer.css("padding-left"));
        const paddingRight = parseInt(textContainer.css("padding-right"));


        const isPhones = window.matchMedia("(max-width: 480px)").matches;
        const isMobile = window.matchMedia("(max-width: 768px)").matches;

        if (isPhones) {
            reqItemWidth = screenWidth - titleWidthPhone;
        } else
        if (isMobile) {
            reqItemWidth = screenWidth - titleWidth;
        } else {
            reqItemWidth = 500
        }



        return {
            container: reqItemWidth,
            textContainer: reqItemWidth - paddingLeft - paddingRight
        }

    };

    const closeEveryItemInContainer = (container) => {
        const items = container.find(".assortment__item");
        const assortContainer = container.find(".assortment__container");
        items.removeClass("assortment__item--active");
        assortContainer.width(0);

    }

    const openItem = (item) => {
        const hiddenContainer = item.find(".assortment__container");
        const reqWidth = measureWidth(item);
        const textBlock = item.find(".assortment__content")


        item.addClass("assortment__item--active");

        hiddenContainer.width(reqWidth.container);
        textBlock.width(reqWidth.textContainer);

    }


    $(".assortment__title").on("click", (e) => {
        e.preventDefault();
        const $this = $(e.currentTarget);
        const item = $this.closest(".assortment__item");
        const itemOpened = item.hasClass("assortment__item--active");
        const container = $this.closest(".assortment__list");

        if (itemOpened) {
            closeEveryItemInContainer(container)
        } else {
            closeEveryItemInContainer(container)
            openItem(item);
        }

    })

})()