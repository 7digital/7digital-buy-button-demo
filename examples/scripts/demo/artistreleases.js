var url = $.url(location.href.toLowerCase()),
    artistId = url.param("artistid");

function ArtistReleasesDemo() {
    this.settings = {
        apiUrl: "http://api.7digital.com/1.2/artist/releases?oauth_consumer_key=YOUR_KEY_HERE&pagesize=50&imagesize=175&type=album&artistId=",
        artistDetailsUrl: "http://api.7digital.com/1.2/artist/details?oauth_consumer_key=YOUR_KEY_HERE&imagesize=200&artistId=",
        displayElement: $("#sidebar"),
        templateElement: $("#tpl-artist-release-item"),
        $artistTemplate: $("#tpl-artist")
    };

    this.PageNum = 1;
}

ArtistReleasesDemo.prototype.RunSearch = function (query, pagenum) {
    var settings = this.settings;
    $.support.cors = true;

    $.get(settings.artistDetailsUrl + query + "&page=" + pagenum, function(artistDetails) {
        var artistTemplate = _.template(settings.$artistTemplate.html());
        var $artist = $($(artistDetails).find("artist"));
        var artist = {
            image: $artist.find("image").text(),
            name: $artist.find("name").text()
        };
        var artistHtml = artistTemplate(artist);
        $("#artist").html(artistHtml);
    });

    $.get(settings.apiUrl + query, function(data) {
        settings.displayElement.html("");
        var template = _.template(settings.templateElement.html());
        _.each(data.releases.release, function(release) {
            settings.displayElement.append(template(release));
        }, this);

        document.blocky.setup();
    }, "json")
        .error(function(err, textStatus, errorThrown) {
            settings.displayElement.html("<p>An error occured : " + errorThrown + "</p>");
            throw "Could not load search from the api:";
        });
    return this;
};

ArtistReleasesDemo.prototype.LoadNext = function() {
    this.PageNum += 1;
    this.RunSearch(artistId, this.PageNum);
};

var artistReleasesDemo = new ArtistReleasesDemo().RunSearch(artistId, 1);

$(window).scroll(function () {
    if ($(window).scrollTop() + $(window).height() == $(document).height()) {
        artistReleasesDemo.LoadNext();
    }
});