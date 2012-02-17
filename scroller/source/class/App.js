/**
 * #require(core.polyfill.requestAnimationFrame)
 */
core.Class('p.scroller.App', {
    construct: function(settings) {
        var element = document.getElementById("content");
        new EasyScroller(element, {
            scrollingX: false,
            scrollingY: true,
            zooming: false
        });
    }
});
