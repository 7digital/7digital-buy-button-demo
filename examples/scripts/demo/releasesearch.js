function ReleaseSearchDemo() {
    this.settings = {
        apiUrl: "http://api.7digital.com/1.2/release/search?oauth_consumer_key=YOUR_KEY_HERE&type=album&pagesize=50&imagesize=175&q=",
        displayElement: $("#sidebar"),
        templateElement: $("#tpl-release-search-item"),
        searchTextFieldElement: $("#searchquery"),
        defaultQuery: "in rainbows"
    };
    this.PageNum = 1;
}

ReleaseSearchDemo.prototype.Setup = function() {
    var settings = this.settings,
        that = this;
    settings.searchTextFieldElement.val(settings.defaultQuery);
    settings.searchTextFieldElement.keyup(function (event) {
        var querytext = event.currentTarget.value;
        settings.displayElement.html("");
        that.PageNum = 1;
        if (querytext !== "") {
            $(event.currentTarget).attr('class', 'pleasewait');
            that.RunSearch(querytext, that.PageNum);
        }
    });
    return this;
};

ReleaseSearchDemo.prototype.RunSearch = function (query, pagenum) {
    var settings = this.settings,
       template = _.template(settings.templateElement.html());
    
    if (query == "" || query == undefined) {
        query = settings.defaultQuery;
    }

    if (pagenum === undefined) {
        pagenum = 1;
    }

    $.support.cors = true;
    $.get(settings.apiUrl + query + "&page=" + pagenum, function (data) {
        if (data.status == "ok") {
            _.each(data.searchResults.searchResult, function (searchResult) {
                settings.displayElement.append(template(searchResult));
            }, this);
            settings.searchTextFieldElement.attr('class', '');
            document.blocky.setup();
        }
    }, "json")
    .error(function (err, textStatus, errorThrown) {
        settings.displayElement.html("<p>An error occured : " + errorThrown + "</p>");
        throw "Could not load search from the api:";
    });
    return this;
};

ReleaseSearchDemo.prototype.LoadNext = function () {
    var settings = this.settings;
    var querytext = settings.searchTextFieldElement.val();
    this.PageNum += 1;
    this.RunSearch(querytext, this.PageNum);
};

var releaseSearchDemo = new ReleaseSearchDemo().Setup().RunSearch("", 1);

$(window).scroll(function () {
    if ($(window).scrollTop() + $(window).height() == $(document).height()) {
        releaseSearchDemo.LoadNext();
    }
});