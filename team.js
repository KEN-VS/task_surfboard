const openBlock = item => {
    const container = item.closest(".team__item");
    const contentWrap = container.find(".team__content-wrap");
    const contentBlock = contentWrap.find('.team__content');
    const reqHeight = contentBlock.height();

    container.addClass("activaited");
    contentWrap.height(reqHeight);
};

const closeEveryBlock = container => {
    const blocks = container.find(".team__content-wrap");
    const blocksContainer = container.find(".team__item");

    blocksContainer.removeClass("activaited");
    blocks.height(0);

}


$(".team__btn").click(e => {
    e.preventDefault();
    const $this = $(e.currentTarget);
    const container = $this.closest(".team");
    const elemContainer = $this.closest(".team__item");

    if (elemContainer.hasClass("activaited")) {
        closeEveryBlock(container);
    } else {
        closeEveryBlock(container);
        openBlock($this);
    }

});