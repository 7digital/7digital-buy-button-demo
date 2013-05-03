/// <reference path="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js" />
/// <reference path="http://underscorejs.org/underscore-min.js" />

/*global _, $, console, location*/
var CHART = {};

$.support.cors = true;
CHART.buildChart = function () {
    "use strict";
    
    var type = location.hash === "#release" ? "release" : "track",
        settings = {
            apiUrl: "http://api.7digital.com/1.2/" +
                type + "/chart?oauth_consumer_key=YOUR_KEY_HERE&imagesize=100",
            displayElement: $("#sidebar"),
            templateElement: $("#tpl-" + type + "-chart-list-item")
        };

    $('#sidebar').html("Loading the " + type + " chart....");

    $.get(settings.apiUrl, function (data) {
        if (data.status === "ok") {
            settings.displayElement.html("");
            _.each(data.chart.chartItem, function (chartItem) {
                var template = _.template(settings.templateElement.html());
                settings.displayElement.append(template(chartItem));
            });
        }
    }, "json").error(function (err, textStatus, errorThrown) {
        settings.displayElement.html("<p>An error occured : " + errorThrown + "</p>");
        throw "Could not load search from the api:";
    });
};

CHART.buildChart();