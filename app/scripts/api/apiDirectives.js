'use strict';

/* Directives */

angular.module('myApp.directives', [])
.directive('wtDonut', function(){
        return {
            restrict: 'E',
            scope: {
                wtCircleNumber: '@',
                ngDash: '@',
                wtDonutTitle: '@',
                wnFillColor: '@'
            },
            link: function(scope, element, attrs) {
                attrs.$observe('wtCircleNumber', function(value) {
                    if (value <= 1 )
                    {    attrs.$set('wnFillColor', '#grade1');}
                    else if (value <= 2 && value > 1)
                        {attrs.$set('wnFillColor', '#grade2');}
                    else if (value <= 3 && value > 2)
                        {attrs.$set('wnFillColor', '#grade3');}
                    else if (value <= 4 && value > 3)
                        {attrs.$set('wnFillColor', '#grade4');}
                    else if (value <= 5 && value > 4)
                        {attrs.$set('wnFillColor', '#grade5');}
                    else if (value <= 6 && value > 5)
                        {attrs.$set('wnFillColor', '#grade6');}
                    else if (value <= 7 && value > 6)
                        {attrs.$set('wnFillColor', '#grade7');}
                    else if (value <= 8 && value > 7)
                        {attrs.$set('wnFillColor', '#grade8');}
                    else if (value <= 9 && value > 8)
                        {attrs.$set('wnFillColor', '#grade9');}
                    else if (value <= 10 && value > 9)
                        {attrs.$set('wnFillColor', '#grade10');}
                });
            },
            template:

                '<h4 class="circle-text">{{wtDonutTitle}}</h4>' +
                '<div class="donut">' +
                    '<svg class="donut-svg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999" x="0px" y="0px" viewBox="0 0 340 333" enable-background="new 0 0 340 333" xml:space="preserve">' +
                        '<defs>' +
                            '<linearGradient gradientUnits="userSpaceOnUse" id="grade1">' +
                                '<stop offset="0%" style="stop-color:#c45656;" />' +
                                '<stop offset="100%" style="stop-color:#fc6f6f;" />' +
                            '</linearGradient>' +
                            '<linearGradient gradientUnits="userSpaceOnUse" id="grade2">' +
                                '<stop offset="0%" style="stop-color:#c47052;" />' +
                                '<stop offset="100%" style="stop-color:#fa8f68;" />' +
                            '</linearGradient>' +
                            '<linearGradient gradientUnits="userSpaceOnUse" id="grade3">' +
                                '<stop offset="0%" style="stop-color:#c48d4d;" />' +
                                '<stop offset="100%" style="stop-color:#f8b261;" />' +
                            '</linearGradient>' +
                            '<linearGradient gradientUnits="userSpaceOnUse" id="grade4">' +
                                '<stop offset="0%" style="stop-color:#c4ac48;" />' +
                                '<stop offset="100%" style="stop-color:#f6d75a;" />' +
                            '</linearGradient>' +
                            '<linearGradient gradientUnits="userSpaceOnUse" id="grade5">' +
                                '<stop offset="0%" style="stop-color:#bcc444;" />' +
                                '<stop offset="100%" style="stop-color:#e9f354;" />' +
                            '</linearGradient>' +
                            '<linearGradient gradientUnits="userSpaceOnUse" id="grade6">' +
                                '<stop offset="0%" style="stop-color:#98c43f;" />' +
                                '<stop offset="100%" style="stop-color:#baf14d;" />' +
                            '</linearGradient>' +
                            '<linearGradient gradientUnits="userSpaceOnUse" id="grade7">' +
                                '<stop offset="0%" style="stop-color:#71C43A;" />' +
                                '<stop offset="100%" style="stop-color:#8aef47;" />'+
                            '</linearGradient>' +
                            '<linearGradient gradientUnits="userSpaceOnUse" id="grade7">' +
                                '<stop offset="0%" style="stop-color:#48C435;" />' +
                                '<stop offset="100%" style="stop-color:#57ec40;" />' +
                            '</linearGradient>' +
                            '<linearGradient gradientUnits="userSpaceOnUse" id="grade8">' +
                                '<stop offset="0%" style="stop-color:#31C445;" />' +
                                '<stop offset="100%" style="stop-color:#3aea52;" />' +
                            '</linearGradient>' +
                            '<linearGradient gradientUnits="userSpaceOnUse" id="grade9">' +
                                '<stop offset="0%" style="stop-color:#2CC469;" />' +
                                '<stop offset="100%" style="stop-color:#34e87c;" />' +
                            '</linearGradient>' +
                            '<linearGradient gradientUnits="userSpaceOnUse" id="grade10">' +
                                '<stop offset="0%" style="stop-color:#2CC469;" />' +
                                '<stop offset="100%" style="stop-color:#34e87c;" />' +
                            '</linearGradient>' +
                        '</defs>' +
                        '<g transform="translate(115, 115)">' +
                            '<circle r="100" class="circle-back" />' +
                            '<circle r="115" class="circle-border" />' +
                            '<circle r="85" class="circle-border" />' +
                            '<circle r="100" class="circle-front" transform="rotate(270.1)" style="stroke\-dashoffset:{{ngDash}};stroke:url({{wnFillColor}})"/>' +
                            '<text x="-36" y="17" font-family="sans-serif" font-size="4em" fill="#a6a6a6">{{wtCircleNumber}}</text>' +
                        '</g>' +
                    '</svg>' +
                '</div>'
        }
    }).animation('.slide', function() {
        var NgHideClassName = 'ng-hide';
        return {
            beforeAddClass: function(element, className, done) {
                if(className === NgHideClassName) {
                    jQuery(element).delay(200).slideUp(done);
                }
            },
            removeClass: function(element, className, done) {
                if(className === NgHideClassName) {
                    jQuery(element).hide().slideDown(done);
                }
            }
        }
    }).directive('wtZoekBoxKlein', function(){
        return {
            restrict: 'E',
            template:
                '<div class="row" ng-controller="getAllIds">' +
                    '<div class="form-group zoekbox">' +
                        '<input autofocus accessibleForm autocomplete="off" ng-model="asyncSelected" typeahead="corporatie.WOCO_NAAM as corporatie.WOCO_NAAM for corporatie in allIds | filter:$viewValue | limitTo:10" typeahead-on-select="goToUrl($item); asyncSelected = null;" typeahead-editable="false" type="text" class="form-control input-md fadeIn2 input-woontevreden" placeholder="zoek hier je corporatie" id="search">' +
                    '</div>' +
                '</div>'
        }
    })
    .directive('wtZoekBoxGroot', function(){
        return {
            restrict: 'E',
            template:
                '<div class="row" ng-controller="getAllIds">' +
                '<div class="form-group zoekbox">' +
                '<input size="30" accessibleForm autocomplete="off" ng-model="asyncSelected" typeahead="corporatie.WOCO_NAAM as corporatie.WOCO_NAAM for corporatie in allIds | filter:$viewValue | limitTo:10" typeahead-on-select="goToUrl($item);" typeahead-editable="false" type="text" class="form-control input-lg fadeIn2 input-woontevreden" placeholder="zoek hier je corporatie" id="search">' +
                '</div>' +
                '</div>'
        }
    })
    .directive('wnRatingBadge', function(){
        return {
            restrict: 'E',
            scope: {
                wnReviewVar: '=',
                wnReviewTitle: '@'
            },
            template:
             '<li ng-if="wnReviewVar" class="wnRating">' +
                '<span ng-class="{lowGrade: wnReviewVar <= 4, mediumGrade: wnReviewVar <= 6 && wnReviewVar > 4, highGrade: wnReviewVar > 6}">{{wnReviewVar | number:0}}</span>' +
                '<p class="wnRating">{{wnReviewTitle}}</p>' +
             '</li>'
        }
    })
    .directive('updateTitle', function($rootScope, $timeout) {
    return {
        link: function(scope, element) {

            var listener = function(event, toState, toParams, fromState, fromParams) {
                var title = 'Default Title';
                if (toState.data && toState.data.pageTitle) title = toState.data.pageTitle;
                // Set asynchronously so page changes before title does
                $timeout(function() {
                    element.text(title);
                });
            };

            $rootScope.$on('$stateChangeStart', listener);
        }
    }
    })
    .directive('loading',   ['$http' ,function ($http)
    {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs)
            {
                scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };

                scope.$watch(scope.isLoading, function (v)
                {
                    if(v){
                        elm.hide();
                    }else{
                        elm.fadeIn(200);
                    }
                });
            }
        };

    }])
    .directive('loadingReverse' ,function ($http)
    {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs)
            {
                scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };

                scope.$watch(scope.isLoading, function (v)
                {
                    if(v){
                        elm.show();
                    }else{
                        elm.hide();
                    }
                });
            }
        };
    })