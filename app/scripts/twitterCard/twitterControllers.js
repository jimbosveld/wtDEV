/**
 * Created by jimbosveld on 06-11-14.
 */
angular.module('myApp.controllers')
    .controller('twitterCardCtrl', function($http){

        var consumerKey = encodeURIComponent('VyppGNUQcjTNxwLZ0tkETWVAU');
        var consumerSecret = encodeURIComponent('wzywovrabdBeEg7s25SpyPLMlw42T93tl3Rgh6wuHVSuwyTDKK');
        var tokenCredentials = btoa(consumerKey + ':' + consumerSecret);

        console.log(tokenCredentials)

        $http.post(
            'https://api.twitter.com/oauth2/token',"grant_type=client_credentials"
            , {
                headers:
                {'Authorization': 'Basic ' + tokenCredentials,
                 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                }
            }
            ).success(function(data, status, headers, config){
                console.log(data)
            }).error(function(data, status, headers, config){
                console.log(config)
            });
    });