'use strict';
angular.module('myApp.controllers')
    .controller('vraagSubmitController', function($scope, $firebase) {
            var fb = $firebase(new Firebase('https://glaring-fire-5859.firebaseio.com/vragen'))
            $scope.list = fb.$asArray()
            $scope.addVraag = function(data) {
            	console.log(data)
            	$scope.list.$add({
                	vraag: data.tekst,
                	antwoord: data.antwoord,
                	tags: [data.tags],
                	bron: data.bron
                })
            }
        }
)