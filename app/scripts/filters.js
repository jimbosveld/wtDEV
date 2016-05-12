'use strict';

/* Filters */

angular.module('myApp.filters', []).
filter('interpolate', ['version',
    function(version) {
        return function(text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        }
    }
])
    .filter('monthToString', function(){
        var months = ["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december"];
        return function(month) {
            var month = month - 1;
            return months[month]
        }
    })
    .filter('yearToString', function(){
        var d = new Date();
        var y = d.getFullYear();
        return function(year) {
            if (year == y) {
                return 'van dit jaar'
            }
            else if (year == y - 1) {
                return 'van vorig jaar'
            }
            else {
                return 'van twee jaar geleden'
            }
        }
    })
    .filter('reverse', function() {
        return function(items) {
            return items.slice().reverse();
        };
    })
    .filter('capitalize', function() {
        return function(input, all) {
            return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
        }
    })
    .filter('showIndividual', function() {
        return function(items) {
            console.log(items)
        }
    });