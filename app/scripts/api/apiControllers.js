'use strict';
angular.module('myApp.controllers', [])
    .controller('getAllIds', function($scope, $http, apiFactory, $state) {
        var handleSuccess = function(data) {
            $scope.allIds = data;
            $scope.goToUrl = function(key) {
                var urlParam = (key.WOCO_NAAM).replace(/ /g, "_");
                $state.go("api", {
                    corporatienaam: urlParam,
                    submenu: 'dashboard'
                });
            }
        };
        apiFactory.getAllIds().success(handleSuccess);
    })
    .controller('wocoPanelCtrl',
        function($scope, $rootScope, $http, apiFactory, $timeout, $state, $stateParams, newDonutsFactory) {
            apiFactory.getKeyFromStateParam($stateParams.corporatienaam).success(function(data) {
                if (data.length > 0) {
                    var key = data[0].WOCO_ID;
                    $scope.getSelectedCorpoPanelData = function(key) {
                        var id = key;

                        //                    HAAL WOONTEVREDENPANELDATA OP

                        apiFactory.getWTAPiData().success(function(data) {

                            data.forEach(function(data) {                                


                                if (data.id === id && data.n > 5) {
                                    $scope.wtDonutData = newDonutsFactory.getDonutData(data);
                                    $scope.WTPanelData = data;

                                    //                HAAL PREVIEWS OP VOOR DE INVIDIDUELE REVIEWS

                                    apiFactory.getWTPreviewReviews(key).success(function(data) {
                                        $scope.currentPreviewReviews = data;
                                    });

                                }
                            })
                        });

                    }(key); // IMMEDIATELY INVOKED FUNCTION EXPRESSION OP HET MOMENT DAT ER MET EEN $STATEPARAM GELADEN WORDT

                    //                HAAL DE INDIVIDUELE REVIEWS OP (MET $STATEPARAM)

                    if ($stateParams.submenu == 'reviews') {
                        $state.go('api.reviews');
                        var urlParam = ($stateParams.corporatienaam);
                        apiFactory.getKeyFromStateParam(urlParam).success(function(data) {
                            apiFactory.getWTReviews(data[0].WOCO_ID).success(function(data) {
                                $scope.currentReviews = data;
                            });
                        });
                    }

                } else {

                    $state.go('errorcorpo', {
                        corporatienaam: $stateParams.corporatienaam
                    })
                }
            });
            $scope.mouseMove = function(){

            }
        }
)
    .controller('wtInfoDataController', function($scope, $stateParams, apiFactory) {
        apiFactory.getKeyFromStateParam($stateParams.corporatienaam).success(function(data) {
            var id = data[0].WOCO_ID;
            apiFactory.getWTAPiInfoData().success(function(data) {
                data.forEach(function(data) {
                    if (data.id === id) {
                        $scope.WTInfoPanelData = data;
                    }
                })
            });
        });
    })
    .controller('vergelijkController', function($stateParams, $scope, apiFactory) {
        apiFactory.getKeyFromStateParam($stateParams.corporatienaam).success(function(data) {
            apiFactory.getCorpoPanelData(data[0].WOCO_ID).success(function(data) {
                $scope.corpoPanelData = data;
            });
        })
        apiFactory.doVergelijkingHandling().success(function(data) {
            $scope.vergeList = apiFactory.getCorpoPanelVergelijking(data);
        });

    })
    .controller('getAllReviewController', function($scope, $state, apiFactory) {
        $scope.getAllReviews = function(key) {
            var urlParam = (key.naam).replace(/ /g, "_");
            $state.go('api.reviews', {
                corporatienaam: urlParam,
                submenu: 'reviews'
            });
            var id = key.id;
            apiFactory.getWTReviews(id).success(function(data) {
                $scope.currentReviews = data;
            });
        };
    })
    .controller('kwhController', function($scope, $stateParams, apiFactory, newDonutsFactory) {
        apiFactory.getKeyFromStateParam($stateParams.corporatienaam).success(function(data) {
            apiFactory.getKWHPanelData(data[0].WOCO_ID).success(function(data) {
                if (data[0].KWH_CIJFER_KLACHTEN !== null && data.length > 0) {
                    $scope.kwhDonutData = newDonutsFactory.getKwhDonutData(data);
                    $scope.KWHPanelData = data;
                } else {}
            });
        })
    });