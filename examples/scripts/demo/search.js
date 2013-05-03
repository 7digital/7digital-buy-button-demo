function Search(settings) {
    this.settings = settings || {
        apiUrl: "http://api.7digital.com/1.2/track/search?oauth_consumer_key=YOUR_KEY_HERE&pagesize=50&imagesize=175&q=",
        displayElement: $("#sidebar"),
        templateElement: $("#tpl-track-list-item"),
        searchTextFieldElement: $("#searchquery"),
        defaultQuery: "great gig in the sky",
        searchResultItem: function(searchResult) {
            return searchResult;
        }
    };
    this.PageNum = 1;
}

Search.prototype.Setup = function () {
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

Search.prototype.RunSearch = function (query, pagenum) {
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
                var itemToPassToTemplate = settings.searchResultItem(searchResult);
                settings.displayElement.append(template(itemToPassToTemplate));
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

Search.prototype.LoadNext = function () {
    var settings = this.settings;
    var querytext = settings.searchTextFieldElement.val();
    this.PageNum += 1;
    this.RunSearch(querytext, this.PageNum);
};