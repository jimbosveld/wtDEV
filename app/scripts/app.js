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
    'angles'
  ])
.config(function ($routeProvider) {
  $routeProvider.when('/Home', {templateUrl: 'views/home.html', controller: 'HomeCtrl'});
  $routeProvider.when('/Context', {templateUrl: 'views/context.html', controller: 'VoorWieCtrl'});
  $routeProvider.when('/Voorwie', {templateUrl: 'views/voorwie.html', controller: 'OverOnsCtrl'});
  $routeProvider.when('/OverOns', {templateUrl: 'views/overons.html', controller: 'OverOnsCtrl'});
  $routeProvider.when('/Dashboard', {templateUrl: 'views/dashboard.html', controller: 'DashboardCtrl'});
  $routeProvider.when('/admin', {templateUrl: 'views/admin.html', controller: 'AuthCtrl'});
  $routeProvider.when('/zoeken', {templateUrl: 'views/zoeken.html', controller: 'matchIds'});
  $routeProvider.otherwise({redirectTo: '/Home'});
});
