var url = $.url(location.href),
    releaseId = url.param("releaseId"),
    releaseTitle = url.param("releaseTitle");

$("head > title").html(releaseTitle);
$("#title").html("More like "+releaseTitle);

function MoreLikeThisDemo() {
    this.settings = {
        apiUrl: "http://api.7digital.com/1.2/release/recommend?oauth_consumer_key=YOUR_KEY_HERE&type=album&pagesize=50&imagesize=175&releaseId=",
        displayElement: $("#sidebar"),
        templateElement: $("#tpl-release-search-item"),
    };

    this.PageNum = 1;
}

MoreLikeThisDemo.prototype.RunSearch = function(query, pagenum) {
    var settings = this.settings;
    $.support.cors = true;
    $.get(settings.apiUrl + query + "&page=" + pagenum, function (data) {
        var template = _.template(settings.templateElement.html());
        _.each($(data).find("recommendedItem > release"), function (release) {
            var $release = $(release);
            var recommendation = {
                id: $release.attr("id"),
                image: $release.find("image").text(),
                artist: {
                    appearsAs: $release.find("artist").find("appearsAs").text(),
                    id: $release.find("artist").attr("id"),
                },
                title: $release.find("title").text(),
                type: $release.find("type").text(),
                price: {
                    formattedPrice: $release.find("price").find("formattedPrice").text()
                }
            };
            settings.displayElement.append(template(recommendation));
        }, this);
        document.blocky.setup();
    })
    .error(function (err, textStatus, errorThrown) {
        settings.displayElement.html("<p>An error occured : " + errorThrown + "</p>");
        throw "Could not load search from the api:";
    });
    return this;
};

MoreLikeThisDemo.prototype.LoadNext = function() {
    this.PageNum += 1;
    this.RunSearch(releaseId, this.PageNum);
};

var moreLikeThisDemo = new MoreLikeThisDemo().RunSearch(releaseId, 1);

$(window).scroll(function () {
    if ($(window).scrollTop() + $(window).height() == $(document).height()) {
        moreLikeThisDemo.LoadNext();
    }
});