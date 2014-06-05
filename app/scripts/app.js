'use strict';

angular
    .module('myApp', [
        'ngRoute',
        'myApp.filters',
        'myApp.services',
        'myApp.directives',
        'myApp.controllers',
        'ui.bootstrap',
        'firebase',
        'ngSanitize',
        'angles',
        'ngAnimate'
    ])
    .config(function ($routeProvider) {
        $routeProvider
        .when('/Home', {templateUrl: 'views/home.html', controller: 'HomeCtrl'})
        .when('/Context', {templateUrl: 'views/context.html', controller: 'VoorWieCtrl'})
        .when('/Voorwie', {templateUrl: 'views/voorwie.html', controller: 'VoorWieCtrl'})
        .when('/OverOns', {templateUrl: 'views/overons.html', controller: 'OverOnsCtrl'})
        .when('/Dashboard', {templateUrl: 'views/dashboard.html', controller: 'DashboardCtrl'})
        .when('/admin', {templateUrl: 'views/admin.html', controller: 'AuthCtrl'})
        .when('/zoeken', {templateUrl: 'views/zoeken.html', controller: 'matchIds'})
        .when('/bouwnu', {templateUrl: 'views/bouwnu.html', controller: 'bouwNuFirebase'})
        .otherwise({redirectTo: '/Home'})
    });
