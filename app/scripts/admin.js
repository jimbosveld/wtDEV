/**
 * Created by jimbosveld on 17-09-14.
 */
angular.module('myApp.controllers')
    .controller('firebaseCtrl', function($scope, $firebase, $firebaseSimpleLogin, $rootScope){
        var fb = $firebase(new Firebase('https://glaring-fire-5859.firebaseio.com/woontevreden/'));
        $scope.auth = $firebaseSimpleLogin(fb);

        $scope.contacten = fb.$asArray();

        var datum = new Date().toJSON().slice(0,10);

        var inputEmail = $('#inputemail');
        var inputBericht = $('#inputbericht');

        $scope.updateContacten = function(b,e){

            fb.$push({
                bericht:b,
                emailadres:e,
                datum: datum
            });

            $scope.contacten.bericht = '';
            $scope.contacten.emailadres = '';

        };

        $scope.signIn = function(){
            $scope.auth.$login("password", {
                email: $scope.email,
                password: $scope.password
            }).then(function(user) {
                console.log(user.uid)
            }).then(function(error){
                console.log(error.code)
            });
        };

        $scope.createUser = function(){
            $scope.auth.$createUser($scope.email,$scope.password)
              .then(function(){
                console.log('user')
            }).then(function(error){
                console.log(error.code)
            })
        }

        $scope.auth.$getCurrentUser();
    });
