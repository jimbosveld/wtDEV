'use strict';
angular.module('myApp.services', []).factory('apiFactory', ['$http', '$q',
    function($http, $q) {
        //        API STANDAARDEN -- DEZE ZIJN GESCHIKT VOOR ALLE REQUESTS
        var url = 'https://api.thebrighthouse.nl';
        var headers = {
            headers: {
                'Content-Type': 'text/plain'
            }
        };
        var woontevredenDataSource = "woontevreden corpodata";
        var KWHDataSource = "woontevreden KWH";
        var getCurrentYearWoontevreden = {
            "column": "CORPO_JAAR",
            "type": "equals",
            "value": "2012"
        };
        var getCurrentYearKWH = {
            "column": "KWH_JAAR",
            "type": "equals",
            "value": "2012"
        };
        return {
            //            INDIVIDUELE REQUEST FUNCTIONS -- WAT HEB JE NODIG? MAAK DAARVOOR HIER EEN REQUEST
            getAllIds: function() {
                var request = {
                    "values": {
                        "columns": ["WOCO_ID", "WOCO_NAAM"],
                        "limit": 0
                    },
                    "dataSource": woontevredenDataSource,
                    "filters": [
                        getCurrentYearWoontevreden
                    ],
                    "method": "simple values"
                };
                return $http.post(url, request, headers)
            },
            getCorpoPanelData: function(corpoKey) {
                var request = {
                    "values": {
                        "columns": ["WOCO_NAAM", "CORPO_TOTAAL_HUURWONINGEN", "CORPO_AANTAL_FTE", "CORPO_GEMIDDELDE_HUURPRIJS_PER_MAAND_PER_WOONGELEGENHEID", "CORPO_GEMIDDELD_AANTAL_PUNTEN_WONINGWAARDERING_HUURWONINGEN_DAEB_CORPORATIE"],
                        "limit": 0
                    },
                    "dataSource": woontevredenDataSource,
                    "filters": [{
                            "column": "WOCO_ID",
                            "type": "equals",
                            "value": corpoKey
                        }, {
                            "column": "CORPO_AANTAL_FTE",
                            "type": "greater",
                            "value": 0
                        },
                        getCurrentYearWoontevreden
                    ],
                    "method": "simple values"
                };
                return $http.post(url, request, headers)
            },
            getKWHPanelData: function(corpoKey) {
                var request = {
                    "values": {
                        "columns": ["KWH_CIJFER_KLACHTEN", "KWH_CIJFER_CONTACT", "KWH_CIJFER_TOTAAL"],
                        "limit": 0
                    },
                    "dataSource": KWHDataSource,
                    "filters": [{
                            "column": "WOCO_ID",
                            "type": "equals",
                            "value": corpoKey
                        },
                        getCurrentYearKWH
                    ],
                    "method": "simple values"
                };
                return $http.post(url, request, headers)
            },
            getWTAPiData: function() {
                return $http.get("http://api.woontevreden.nl/data/corporatiecijfers/")
            },
            getWTAPiInfoData: function() {
                return $http.get("http://api.woontevreden.nl/data/corporatiegegevens/")
            },
            getWTReviews: function(corpoKey) {
                return $http.get("http://api.woontevreden.nl/data/corporaties/" + corpoKey + "/reviews")
            },
            getWTPreviewReviews: function(corpoKey) {
                return $http.get("http://api.woontevreden.nl/data/corporaties/" + corpoKey + "/reviews?limit=3")
            },
            getKeyFromStateParam: function(corpoName) {
                var corpoName = corpoName.replace(/_/g, " ");
                var request = {
                    "values": {
                        "columns": ["WOCO_ID", "WOCO_NAAM"],
                        "limit": 1
                    },
                    "dataSource": woontevredenDataSource,
                    "filters": [{
                        "column": "WOCO_NAAM",
                        "type": "equals",
                        "value": corpoName
                    }],
                    "method": "simple values"
                };
                return $http.post(url, request, headers)
            },
            doVergelijkingHandling: function() {

                var request = {
                    "values": {
                        "columns": ["WOCO_NAAM", "CORPO_TOTAAL_HUURWONINGEN", "CORPO_AANTAL_FTE", "CORPO_GEMIDDELDE_HUURPRIJS_PER_MAAND_PER_WOONGELEGENHEID", "CORPO_GEMIDDELD_AANTAL_PUNTEN_WONINGWAARDERING_HUURWONINGEN_DAEB_CORPORATIE"],
                        "limit": 0
                    },
                    "dataSource": woontevredenDataSource,
                    "filters": [
                        getCurrentYearWoontevreden
                    ],
                    "method": "simple values"
                };

                return $http.post(url, request, headers)
            },
            getCorpoPanelVergelijking: function(data) {

                var data = data;

                var averageHuurtotaal = [];
                var averageFte = [];
                var averagePrijs = [];
                var averagePunt = [];

                var averageHuurtotaalList = 0;
                var averageFteList = 0;
                var averagePrijsList = 0;
                var averagePuntList = 0;

                $.each(data, function(i, item) {


                    if (item.CORPO_TOTAAL_HUURWONINGEN > 0 && item.CORPO_AANTAL_FTE > 0 && item.CORPO_GEMIDDELDE_HUURPRIJS_PER_MAAND_PER_WOONGELEGENHEID > 0) {
                        averageHuurtotaal.push(item.CORPO_TOTAAL_HUURWONINGEN);
                        averageFte.push(item.CORPO_AANTAL_FTE);
                        averagePrijs.push(item.CORPO_GEMIDDELDE_HUURPRIJS_PER_MAAND_PER_WOONGELEGENHEID);
                        averagePunt.push(item.CORPO_GEMIDDELD_AANTAL_PUNTEN_WONINGWAARDERING_HUURWONINGEN_DAEB_CORPORATIE);

                    }

                });


                $.each(averageHuurtotaal, function() {
                    averageHuurtotaalList += this;
                });

                $.each(averageFte, function() {
                    averageFteList += this;
                });

                $.each(averagePrijs, function() {
                    averagePrijsList += this;
                });

                $.each(averagePunt, function() {
                    averagePuntList += this;
                });

                var returnList =

            {
                huur : Math.round(averageHuurtotaalList / averageHuurtotaal.length * 1) / 1,
                fte: Math.round(averageFteList / averageFte.length * 1) / 1,
                prijs: Math.round(averagePrijsList / averagePrijs.length * 1) / 1,
                punt: Math.round(averagePuntList / averagePunt.length * 1) / 1
            }

                return returnList;

            }
        }
    }
])
    .factory('newDonutsFactory', function() {

        return {
            getDonutColor: function(value) {
                if (value <= 1) {
                    return '#fc6f6f'
                } else if (value <= 2 && value > 1) {
                    return '#fc6f6f'
                } else if (value <= 3 && value > 2) {
                    return '#fc6f6f'
                } else if (value <= 4 && value > 3) {
                    return '#f8b261'
                } else if (value <= 5 && value > 4) {
                    return '#f8b261'
                } else if (value <= 6 && value > 5) {
                    return '#f8b261'
                } else if (value <= 7 && value > 6) {
                    return '#e5dd5a'
                } else if (value <= 8 && value > 7) {
                    return '#3aea52'
                } else if (value <= 9 && value > 8) {
                    return '#34e87c'
                } else if (value <= 10 && value > 9) {
                    return '#34e87c'
                }

            },
            getDonutData: function(data) {

                var woningObject = {
                    value: [data.woning, 10 - data.woning ],
                    baseValue: (data.woning).toFixed(1),
                    color: this.getDonutColor(data.woning),
                    title: 'Woning'
                }
                var omgevingObject = {
                    value: [data.omgeving, 10 - data.omgeving],
                    baseValue: (data.omgeving).toFixed(1),
                    color: this.getDonutColor(data.omgeving),
                    title: 'Omgeving'
                }
                var averageObject = {
                    value: [data.average, 10 - data.average],
                    baseValue: (data.average).toFixed(1),
                    color: this.getDonutColor(data.average),
                    title: 'Gemiddeld'
                }
                var corporatieObject = {
                    value: [data.corporatie, 10 - data.corporatie],
                    baseValue: (data.corporatie).toFixed(1),
                    color: this.getDonutColor(data.corporatie),
                    title: 'Corporatie'
                }
                var woonsituatieObject = {
                    value: [data.woonsituatie, 10 - data.woonsituatie],
                    baseValue: (data.woonsituatie).toFixed(1),
                    color: this.getDonutColor(data.woonsituatie),
                    title: 'Woonsituatie'
                }

                var donutObjectList = [woningObject, omgevingObject, averageObject, corporatieObject, woonsituatieObject]

                return donutObjectList;

            },
            getKwhDonutData: function(data) {

                var klachtenObject = {
                    value: [data[0].KWH_CIJFER_KLACHTEN, 10 - data[0].KWH_CIJFER_KLACHTEN],
                    baseValue: (data[0].KWH_CIJFER_KLACHTEN).toFixed(1),
                    color: this.getDonutColor(data[0].KWH_CIJFER_KLACHTEN),
                    title: 'Klachten'
                }
                var contactObject = {
                    value: [data[0].KWH_CIJFER_CONTACT, 10 - data[0].KWH_CIJFER_CONTACT],
                    baseValue: (data[0].KWH_CIJFER_CONTACT).toFixed(1),
                    color: this.getDonutColor(data[0].KWH_CIJFER_CONTACT),
                    title: 'Contact'
                }
                var totaalObject = {
                    value: [data[0].KWH_CIJFER_TOTAAL, 10 - data[0].KWH_CIJFER_TOTAAL],
                    baseValue: (data[0].KWH_CIJFER_TOTAAL).toFixed(1),
                    color: this.getDonutColor(data[0].KWH_CIJFER_TOTAAL),
                    title: 'Totaal'
                }

                var kwhDonutObjectList = [klachtenObject, contactObject, totaalObject];

                return kwhDonutObjectList;


            }
        }

    });