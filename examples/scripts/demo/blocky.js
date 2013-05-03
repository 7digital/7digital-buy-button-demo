(function () {
    document.blocky = new Blocky();
})();

function Blocky() { }

Blocky.prototype.setup = function() {
    $(".info-fadein").hover(function (e) {
        var albumtext = e.currentTarget.children[1];
        $(albumtext).fadeIn();
    }, function (e) {
        var albumtext = e.currentTarget.children[1];
        $(albumtext).fadeOut();
    });
};