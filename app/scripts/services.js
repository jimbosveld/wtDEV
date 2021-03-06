'use strict';

/* Services */

angular.module('myApp.services', []).

    factory('wocoRepository', function($http) {
    return {
        getAverages: function () {
            var url = "http://controllers.woontevreden.nl/data/corporatiecijfers/";
            return $http.get(url);
        },
        getAllWocos: function () {
            var url = "http://controllers.woontevreden.nl/data/corporaties"
            return $http.get(url);
        },
        setUrl: function (specificUrl) {
            var url = "http://controllers.woontevreden.nl/data/corporaties/" + specificUrl + "/reviews"
            return $http.get(url);
        },
        calculateAverages: function (rankedWocosObject) {

            var averagesAllWocosWoning = 0;
            var averagesAllWocosOmgeving = 0;
            var averagesAllWocosCorporatie = 0;
            var averagesAllWocosWoonsituatie = 0;

            for (var i = 0; i < rankedWocosObject.length; i++) {

                averagesAllWocosWoning += rankedWocosObject[i].woning / rankedWocosObject.length;
                averagesAllWocosOmgeving += rankedWocosObject[i].omgeving / rankedWocosObject.length;
                averagesAllWocosCorporatie += rankedWocosObject[i].corporatie / rankedWocosObject.length;
                averagesAllWocosWoonsituatie += rankedWocosObject[i].woonsituatie / rankedWocosObject.length;
            }

            var averagesList = [averagesAllWocosWoning, averagesAllWocosOmgeving, averagesAllWocosCorporatie, averagesAllWocosWoonsituatie];


            this.returnAveragesList = function() {
                return averagesList;
            };



        },
        getSpecificData: function (specificData){
            var specificDataArray = [specificData.woning,specificData.omgeving,specificData.corporatie,specificData.woonsituatie];
            console.log(specificDataArray)
            this.returnSpecificList = function(){
                return specificDataArray;
            }
        }
    }
}).

    factory('chartFactory', function(){
        return{
            getChartOptions: function(){
                var options = {
                    //Boolean - If we show the scale above the chart data
                    scaleOverlay : false,

                    //Boolean - If we want to override with a hard coded scale
                    scaleOverride : true,

                    //** Required if scaleOverride is true **
                    //Number - The number of steps in a hard coded scale
                    scaleSteps : 10,
                    //Number - The value jump in the hard coded scale
                    scaleStepWidth : 1,
                    //Number - The scale starting value
                    scaleStartValue : 0,

                    //String - Colour of the scale line
                    scaleLineColor : "rgba(0,0,0,.1)",

                    //Number - Pixel width of the scale line
                    scaleLineWidth : 1,

                    //Boolean - Whether to show labels on the scale
                    scaleShowLabels : true,

                    //Interpolated JS string - can access value
                    scaleLabel : "<%=value%>",

                    //String - Scale label font declaration for the scale label
                    scaleFontFamily : "'Open Sans'",

                    //Number - Scale label font size in pixels
                    scaleFontSize : 12,

                    //String - Scale label font weight style
                    scaleFontStyle : "normal",

                    //String - Scale label font colour
                    scaleFontColor : "#666",

                    ///Boolean - Whether grid lines are shown across the chart
                    scaleShowGridLines : false,

                    //String - Colour of the grid lines
                    scaleGridLineColor : "rgba(0,0,0,.05)",

                    //Number - Width of the grid lines
                    scaleGridLineWidth : 1,

                    //Boolean - If there is a stroke on each bar
                    barShowStroke : false,

                    //Number - Pixel width of the bar stroke
                    barStrokeWidth : 2,

                    //Number - Spacing between each of the X value sets
                    barValueSpacing : 5,

                    //Number - Spacing between data sets within X values
                    barDatasetSpacing : 1,

                    //Boolean - Whether to animate the chart
                    animation : true,

                    //Number - Number of animation steps
                    animationSteps : 60,

                    //String - Animation easing effect
                    animationEasing : "easeOutQuart",

                    //Function - Fires when the animation is complete
                    onAnimationComplete : null
                }
                    return options;
            }
        }
    }).


    factory('apiFactory', function($http){
//        API STANDAARDEN -- DEZE ZIJN GESCHIKT VOOR ALLE REQUESTS

        var url = 'https://controllers.thebrighthouse.nl';
        var headers = {headers: {'Content-Type': 'text/plain'}};
        var woontevredenDataSource = "woontevreden corpodata";
        var KWHDataSource = "woontevreden KWH";
        var getCurrentYearWoontevreden = {"column": "CORPO_JAAR","type": "equals","value": "2012"}
        var getCurrentYearKWH = {"column": "KWH_JAAR","type": "equals","value": "2012"}


        return {

//            INDIVIDUELE REQUEST FUNCTIONS -- WAT HEB JE NODIG? MAAK DAARVOOR HIER EEN REQUEST

            getAllIds: function () {
                var request = {
                    "values": {
                        "columns": [
                            "WOCO_ID",
                            "WOCO_NAAM"
                        ],
                        "limit": 0
                    },
                    "dataSource": woontevredenDataSource,
                    "filters": [
                        getCurrentYearWoontevreden
                    ],
                    "method": "simple values"
                };
                return $http.post(
                    url,
                    request,
                    headers
                )
            },
            getWoontevredenPanelData: function (corpoKey) {
                var request = {
                    "values": {
                        "columns": [
                            "CORPO_TOTAAL_HUURWONINGEN",
                            "CORPO_AANTAL_FTE",
                            "CORPO_ONZELFSTANDIG_OVERIGE_WOONEENHEDEN"
                        ],
                        "limit": 0
                    },
                    "dataSource": woontevredenDataSource,
                    "filters": [

                        {
                            "column": "WOCO_ID",
                            "type": "equals",
                            "value": corpoKey
                        },
                        getCurrentYearWoontevreden
                    ],
                    "method": "simple values"
                };
                return $http.post(
                    url,
                    request,
                    headers
                )
            },
            getKWHPanelData: function (corpoKey) {
                var request = {
                    "values": {
                        "columns": [
                            "WOCO_ID",
                            "WOCO_NAAM",
                            "KWH_POSITIE",
                            "KWH_OMGEVING"
                        ],
                        "limit": 0
                    },
                    "dataSource": KWHDataSource,
                    "filters": [
                        {
                            "column": "WOCO_ID",
                            "type": "equals",
                            "value": corpoKey
                        },
                        getCurrentYearKWH
                    ],
                    "method": "simple values"
                };
                return $http.post(
                    url,
                    request,
                    headers
                )
            }
        }
    });