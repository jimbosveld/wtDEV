'use strict';

angular
    .module('myApp', [
        'ui.router',
        'myApp.filters',
        'myApp.services',
        'myApp.directives',
        'myApp.controllers',
        'ui.bootstrap',
        'firebase',
        'ngSanitize',
        'ngAnimate',
        'ngResource',
        'highcharts-ng',
        'fitVids',
        'truncate',
        'ngMap',
        'donutHack'
    ])
    .run(
    [          '$rootScope', '$state', '$stateParams',
        function ($rootScope,   $state,   $stateParams) {

            // It's very handy to add references to $state and $stateParams to the $rootScope
            // so that you can access them from any scope within your applications.For example,
            // <li ui-sref-active="active }"> will set the <li> // to active whenever
            // 'contacts.list' or one of its decendents is active.
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }


    ]
    )
    .config(function($stateProvider,$urlRouterProvider){
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('homepage', {
                url: '/',
                templateUrl: "views/homepage.html",
                data: {
                    pageTitle: 'home'
                }
            })
            .state('about', {
                url: '/over_woontevreden',
                templateUrl: "views/about.html",
                data: {
                    pageTitle: 'Over Ons'
                }
            })
            .state('admin', {
                url: '/asdjfsaidjfsaoidjfoaisjdf',
                templateUrl: "views/admin.html",
                controller:'firebaseCtrl'
            })
            .state('contact', {
                url: '/contact',
                templateUrl: 'views/contact.html',
                controller: 'firebaseCtrl'
            })
            .state('faq', {
                url: '/veelgestelde_vragen',
                templateUrl: "views/faq.html"
            })
            .state('woningcorporaties', {
                url: '/woningcorporaties',
                templateUrl: "views/woningcorporaties.html"
            })
            .state('overheid', {
                url: '/overheid',
                templateUrl: "views/overheid.html"
            })
            .state('bewonerscommissies', {
                url: '/bewonerscommissies',
                templateUrl: "views/bewonerscommissies.html"
            })
            .state('api.reviews', {
                url: '',
                templateUrl: "views/reviews.html"
            })
            .state('api', {
                url: '/:submenu/:corporatienaam/:interviewid',
                templateUrl: "views/api.html",
                controller: 'wocoPanelCtrl'
            })
            .state('apiNoSlashCatch', {
                url: '/:submenu/:corporatienaam',
                templateUrl: "views/api.html",
                controller: 'wocoPanelCtrl'
            })
            .state('apiSlashCatch', {
                url: '/:submenu/:corporatienaam/',
                templateUrl: "views/api.html",
                controller: 'wocoPanelCtrl'
            })
            .state('errorcorpo', {
                url: '/nietgevonden/:corporatienaam',
                templateUrl: "views/errorcorpo.html"
            })
            .state('vragen', {
                url: '/vragen',
                templateUrl: 'views/vragen.html'
            })
            .state('vrageninput', {
                url: '/vrageninput',
                templateUrl: 'views/vrageninput.html'
            })
//            .state('twitter', {
//                url: '/twitter',
//                templateUrl: 'scripts/twitterCard/twittercard.html',
//                controller: 'twitterCardCtrl'
//            })
        ;
    });