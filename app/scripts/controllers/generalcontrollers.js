'use strict';

angular.module('myApp.controllers', [])
    .controller('DashboardCtrl', function(){

    })
    .controller('HomeCtrl', [
        function() {}
    ])
    .controller('VoorWieCtrl', ['$scope', '$http',
        function($scope, $http) {
            var toCollapse = document.getElementsByClassName('toCollapse');
            var toSlideUp = document.getElementsByClassName('toSlideUp');
            var toBounceOut = document.getElementsByClassName('toBounceOut');
            $http.get('/json/voorwie.json').success(function(data) {
                $scope.cards = data;
            })
            $scope.voorWieId = null;
            $scope.selectVoorWie = function(textLong){
                $scope.voorWieId = [textLong];
                $(toCollapse).fadeTo(100,0.01).delay(500).animate({marginTop:'-40px'});
                $(toSlideUp).delay(500).animate({marginTop:'-110px'});
                $(toBounceOut).addClass('flipOutX').delay(500).animate({marginTop:'-140px'});
            }
            $scope.$watch('voorWieId',function(n,o){
                $scope.currentVoorWieTitle = n;
            })
        }
    ])
    .controller('timeLineCtrl', ['$scope', '$firebase',
        function($scope, $firebase) {
            var fb = new Firebase("https://glaring-fire-5859.firebaseio.com");
            $scope.posts = $firebase(fb.child('posts'));
//            $scope.postIds = $scope.posts.once('value',function(idSnapshot){
//                var id = idSnapshot.name();
//                console.log(id);
//            });
            $scope.addPost = function() {
                $scope.posts.$add({
                    title: $scope.newTitle,
                    text: $scope.newPost,
                    time: $scope.newTime
                });
                $scope.newTitle = "";
                $scope.newPost = "";
                $scope.newTime = "";
            };
            $scope.postRemove = function(key) {
                $scope.posts.$remove(key);
            };

        }
    ])
    .controller('AuthCtrl', [
        '$scope', '$rootScope', '$firebaseAuth',
        function($scope, $rootScope, $firebaseAuth) {
            var fb = new Firebase('https://glaring-fire-5859.firebaseio.com/');
            $rootScope.auth = $firebaseAuth(fb);
            $scope.signIn = function() {
                $rootScope.auth.$login('password', {
                    email: $scope.email,
                    password: $scope.password
                }).then(function(user) {
                    $rootScope.alert.message = '';
                }, function(error) {
                    if (error = 'INVALID_EMAIL') {
                        console.log('email invalid or not signed up');
                        $rootScope.alert.message = 'deze gegevens zijn niet bekend';
                    } else if (error = 'INVALID_PASSWORD') {
                        console.log('wrong password!');
                    } else {
                        console.log(error);
                    }
                });
            };
            $scope.signUp = function() {
                $rootScope.auth.$createUser($scope.email, $scope.password, function(error, user) {
                    if (!error) {
                        $rootScope.alert.message = '';
                    } else {
                        $rootScope.alert.class = 'danger';
                        $rootScope.alert.message = 'The username and password combination you entered is invalid.';
                    }
                });
            }
        }
    ])
    .controller('AlertCtrl', [
        '$scope', '$rootScope',
        function($scope, $rootScope) {
            $rootScope.alert = {};
        }
    ])
    .controller('OverOnsCtrl', ['$scope', '$http',
        function($scope, $http) {
            $http.get('/json/overons.json').success(function(data) {
                $scope.images = data;
            })
        }
    ])
    .controller('matchIds', function($scope, wocoRepository) {
        wocoRepository.getAverages().success(function(data) {
            $scope.gegevensRankedWocos = data;
            wocoRepository.calculateAverages($scope.gegevensRankedWocos);
            $scope.averagesList = wocoRepository.returnAveragesList();
        });
        wocoRepository.getAllWocos().success(function(data) {
            $scope.gegevensAllWocos = data;
        });
        $scope.setId = function(corporatie) {
            $scope.selectedCorporatieObject = null;
            $scope.specificUrl = null;
            $scope.specificCorporatieObject = null;
            for (var i = 0; i < $scope.gegevensRankedWocos.length; i++) {
                if ($scope.gegevensRankedWocos[i].id === corporatie.id) {
                    $scope.selectedCorporatieObject = $scope.gegevensRankedWocos[i];
                    $scope.selectedCorporatieObjectId = $scope.gegevensRankedWocos[i].id;
                } else {}
            }
            wocoRepository.setUrl($scope.selectedCorporatieObjectId).success(function(data) {
                $scope.specificCorporatieObject = data
            });
        }
    })
    .controller('barChartCtrl', function($scope, wocoRepository,chartFactory){
        wocoRepository.getAverages().success(function(data) {
            $scope.gegevensRankedWocos = data;
            wocoRepository.calculateAverages($scope.gegevensRankedWocos);
            $scope.chart = {
                labels : ["woning","omgeving","corporatie","woonsituatie"],
                datasets : [
                    {
                        fillColor : "#e78249",
                        strokeColor : "#e67e22",
                        pointColor : "rgba(151,187,205,0)",
                        pointStrokeColor : "#e67e22",
                        data : wocoRepository.returnAveragesList()
                    },
                    {
                        fillColor : "#cbcbcb",
                        strokeColor : "#f1c40f",
                        pointColor : "rgba(151,187,205,0)",
                        pointStrokeColor : "#f1c40f",
                        data : [1,1]
                    }
                ]
            };
            $scope.options = chartFactory.getChartOptions();
        });
    })
    .controller('getTotalN', function ($scope, wocoRepository){
        wocoRepository.getAverages().success(function(data){
            $scope.wocoSet = data;
            $scope.totalN = 0;
            for (var i = 0; $scope.wocoSet.length; i++) {
                $scope.totalN += $scope.wocoSet[i].n;
            }
        })
    })

//BOUWNU TESTER

    .controller('bouwNuFirebase', ['$scope', '$firebase',
        function($scope, $firebase) {
            var fb = new Firebase('https://incandescent-fire-2314.firebaseio.com');

//            HIER HAAL JE ALLE FIREBASE OBJECTEN OP

            fb.child('aannemers').once('value', function (aannemerSnapshot){
                $scope.allAannemers = aannemerSnapshot.val();
                console.log($scope.allAannemers);
            })

            fb.child('projecten').once('value', function (projectenSnapshot){
                $scope.allProjecten = projectenSnapshot.val();
                console.log($scope.allProjecten);
            })

            $scope.allProjectlocaties = $firebase(fb.child('projecten').child('project1').child('projectlocatie'));

//

            $scope.getProjectsForAannemer = function(id){
                var aannemerSelectedRef = fb.child('aannemers').child('aannemer' + id);
                var aannemerSelectedProjectsRef = aannemerSelectedRef.child('projecten');
                aannemerSelectedProjectsRef.once('value',function(projectenSnapshot){
                    var projecten = projectenSnapshot.val();
                    for (var i = projecten.length; i >= 0; i--) {
                        var projectenRef = new Firebase("https://incandescent-fire-2314.firebaseio.com/projecten/project" + i)
                        projectenRef.once('value',function(projectenContentSnapshot){
                            $scope.projectenContent = projectenContentSnapshot.val();
                            $scope.projectenIds = projectenContentSnapshot.name();
                        })
                    }
                })
            };
            $scope.addAannemer = function() {
                $scope.allAannemers({
                    adres: $scope.adres,
                    naam: $scope.naam,
                    profiel: $scope.profiel,
                    stad: $scope.stad
                });
                $scope.adres = "";
                $scope.naam = "";
                $scope.profiel = "";
                $scope.stad = "";
            }
        }
    ]);