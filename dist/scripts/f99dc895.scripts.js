"use strict";angular.module("myApp.directives",[]).directive("wtDonut",function(){return{restrict:"E",scope:{wtCircleNumber:"@",ngDash:"=",wtDonutTitle:"@",wnFillColor:"@"},link:function(a,b,c){c.$observe("wtCircleNumber",function(a){1>=a?c.$set("wnFillColor","#grade1"):2>=a&&a>1?c.$set("wnFillColor","#grade2"):3>=a&&a>2?c.$set("wnFillColor","#grade3"):4>=a&&a>3?c.$set("wnFillColor","#grade4"):5>=a&&a>4?c.$set("wnFillColor","#grade5"):6>=a&&a>5?c.$set("wnFillColor","#grade6"):7>=a&&a>6?c.$set("wnFillColor","#grade7"):8>=a&&a>7?c.$set("wnFillColor","#grade8"):9>=a&&a>8?c.$set("wnFillColor","#grade9"):10>=a&&a>9&&c.$set("wnFillColor","#grade10")})},template:'<h4 class="circle-text">{{wtDonutTitle}}</h4><div class="donut"><svg class="donut-svg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999" x="0px" y="0px" viewBox="0 0 340 333" enable-background="new 0 0 340 333" xml:space="preserve"><defs><linearGradient gradientUnits="userSpaceOnUse" id="grade1"><stop offset="0%" style="stop-color:#c45656;" /><stop offset="100%" style="stop-color:#fc6f6f;" /></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="grade2"><stop offset="0%" style="stop-color:#c47052;" /><stop offset="100%" style="stop-color:#fa8f68;" /></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="grade3"><stop offset="0%" style="stop-color:#c48d4d;" /><stop offset="100%" style="stop-color:#f8b261;" /></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="grade4"><stop offset="0%" style="stop-color:#c4ac48;" /><stop offset="100%" style="stop-color:#f6d75a;" /></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="grade5"><stop offset="0%" style="stop-color:#bcc444;" /><stop offset="100%" style="stop-color:#e9f354;" /></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="grade6"><stop offset="0%" style="stop-color:#98c43f;" /><stop offset="100%" style="stop-color:#baf14d;" /></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="grade7"><stop offset="0%" style="stop-color:#71C43A;" /><stop offset="100%" style="stop-color:#8aef47;" /></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="grade7"><stop offset="0%" style="stop-color:#48C435;" /><stop offset="100%" style="stop-color:#57ec40;" /></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="grade8"><stop offset="0%" style="stop-color:#31C445;" /><stop offset="100%" style="stop-color:#3aea52;" /></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="grade9"><stop offset="0%" style="stop-color:#2CC469;" /><stop offset="100%" style="stop-color:#34e87c;" /></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="grade10"><stop offset="0%" style="stop-color:#2CC469;" /><stop offset="100%" style="stop-color:#34e87c;" /></linearGradient></defs><g transform="translate(115, 115)"><circle r="100" class="circle-back" /><circle r="115" class="circle-border" /><circle r="85" class="circle-border" /><circle r="100" class="circle-front" transform="rotate(270.1)" style="stroke-dashoffset:{{ngDash}}; stroke: url({{wnFillColor}});"/><text x="-36" y="17" font-family="sans-serif" font-size="4em" fill="#a6a6a6">{{wtCircleNumber}}</text></g></svg></div>'}}).animation(".slide",function(){var a="ng-hide";return{beforeAddClass:function(b,c,d){c===a&&jQuery(b).delay(200).slideUp(d)},removeClass:function(b,c,d){c===a&&jQuery(b).hide().slideDown(d)}}}).directive("wtZoekBoxKlein",function(){return{restrict:"E",template:'<div class="row" ng-controller="getAllIds"><div class="form-group zoekbox"><input accessibleForm autocomplete="off" ng-model="asyncSelected" typeahead="corporatie.WOCO_NAAM as corporatie.WOCO_NAAM for corporatie in allIds | filter:$viewValue | limitTo:10" typeahead-on-select="goToUrl($item); asyncSelected = null;" typeahead-editable="false" type="text" class="form-control input-md fadeIn2 input-woontevreden" placeholder="zoek hier je corporatie" id="search"></div></div>'}}).directive("wtZoekBoxGroot",function(){return{restrict:"E",template:'<div class="row" ng-controller="getAllIds"><div class="form-group zoekbox"><input size="30" accessibleForm autocomplete="off" ng-model="asyncSelected" typeahead="corporatie.WOCO_NAAM as corporatie.WOCO_NAAM for corporatie in allIds | filter:$viewValue | limitTo:10" typeahead-on-select="goToUrl($item);" typeahead-editable="false" type="text" class="form-control input-lg fadeIn2 input-woontevreden" placeholder="zoek hier je corporatie" id="search"></div></div>'}}).directive("wnRatingBadge",function(){return{restrict:"E",scope:{wnReviewVar:"=",wnReviewTitle:"@"},template:'<li ng-if="wnReviewVar" class="wnRating"><span ng-class="{lowGrade: wnReviewVar <= 4, mediumGrade: wnReviewVar <= 6 && wnReviewVar > 4, highGrade: wnReviewVar > 6}">{{wnReviewVar | number:0}}</span><p class="wnRating">{{wnReviewTitle}}</p></li>'}}).directive("updateTitle",function(a,b){return{link:function(c,d){var e=function(a,c){var e="Default Title";c.data&&c.data.pageTitle&&(e=c.data.pageTitle),b(function(){d.text(e)})};a.$on("$stateChangeStart",e)}}}).directive("loading",["$http",function(a){return{restrict:"A",link:function(b,c){b.isLoading=function(){return a.pendingRequests.length>0},b.$watch(b.isLoading,function(a){a?c.hide():c.fadeIn(200)})}}}]).directive("loadingReverse",["$http",function(a){return{restrict:"A",link:function(b,c){b.isLoading=function(){return a.pendingRequests.length>0},b.$watch(b.isLoading,function(a){a?c.show():c.hide()})}}}]),angular.module("myApp.controllers",[]).controller("getAllIds",["$scope","$http","apiFactory","$state","$stateParams",function(a,b,c,d){var e=function(b){a.allIds=b,a.goToUrl=function(a){var b=a.WOCO_NAAM.replace(/ /g,"_");d.go("api",{corporatienaam:b})}};c.getAllIds().success(e)}]).controller("wocoPanelCtrl",["$scope","$rootScope","$http","apiFactory","donutFactory","$timeout","$state","$stateParams","$location",function(a,b,c,d,e,f,g,h){d.getKeyFromStateParam(h.corporatienaam).success(function(b){var c=b[0].WOCO_ID;if(a.getSelectedCorpoPanelData=function(b){a.corpoPanelData=null,a.KWHPanelData=null,a.WTPanelData=null,a.WTInfoPanelData=null,a.currentReviews=null;var c=b;a.id=c;var f=function(b){a.corpoPanelData=b},g=function(b){a.KWHPanelData=b,0!==a.KWHPanelData.length&&null!==b[0].KWH_CIJFER_KLACHTEN?(a.offsetKlachten=Math.round(628*(1-b[0].KWH_CIJFER_KLACHTEN/10)),a.offsetContact=Math.round(628*(1-b[0].KWH_CIJFER_CONTACT/10)),a.offsetTotaal=Math.round(628*(1-b[0].KWH_CIJFER_TOTAAL/10))):a.KWHPanelData=null};d.getWTAPiInfoData().success(function(b){b.forEach(function(b){b.id===c&&(a.WTInfoPanelData=b)})}),d.getCorpoPanelData(c).success(f),d.getKWHPanelData(c).success(g),d.getWTAPiData().success(function(b){b.forEach(function(b){b.id===c&&(a.WTPanelData=b,a.offsets=e.getDonutFilling(b).returnOffsets(),a.offsetcorpo=a.offsets[0],a.offsetwoning=a.offsets[1],a.offsetwoonsituatie=a.offsets[2],a.offsetomgeving=a.offsets[3],a.offsetaverage=a.offsets[4])})})},a.vergelijkCorpoPanelData=function(){d.getCorpoPanelVergelijking().success(function(b){a.averageHuurtotaal=0,a.averageFte=0,a.averagePrijs=0,$.each(b,function(c,d){0!=d.CORPO_TOTAAL_HUURWONINGEN&&0!=d.CORPO_AANTAL_FTE&&0!=d.CORPO_GEMIDDELDE_HUURPRIJS_PER_MAAND_PER_WOONGELEGENHEID&&(a.averageHuurtotaal+=Math.round(d.CORPO_TOTAAL_HUURWONINGEN/b.length),a.averageFte+=Math.round(d.CORPO_AANTAL_FTE/b.length),a.averagePrijs+=Math.round(d.CORPO_GEMIDDELDE_HUURPRIJS_PER_MAAND_PER_WOONGELEGENHEID/b.length))})})},a.getAllReviews=function(b){b.naam.replace(/ /g,"_");g.go("api.reviews",{submenu:"reviews"});var c=b.id;d.getWTReviews(c).success(function(b){a.currentReviews=b})},"reviews"==h.submenu){g.go("api.reviews");var f=h.corporatienaam;d.getKeyFromStateParam(f).success(function(b){d.getWTReviews(b[0].WOCO_ID).success(function(b){a.currentReviews=b})})}a.vergelijkCorpoPanelData(),d.getWTPreviewReviews(c).success(function(b){a.currentPreviewReviews=b}),a.getSelectedCorpoPanelData(c)})}]),angular.module("myApp.services",[]).factory("apiFactory",["$http",function(a){var b="https://api.thebrighthouse.nl",c={headers:{"Content-Type":"text/plain"}},d="woontevreden corpodata",e="woontevreden KWH",f={column:"CORPO_JAAR",type:"equals",value:"2012"},g={column:"KWH_JAAR",type:"equals",value:"2012"};return{getAllIds:function(){var e={values:{columns:["WOCO_ID","WOCO_NAAM"],limit:0},dataSource:d,filters:[f],method:"simple values"};return a.post(b,e,c)},getCorpoPanelData:function(e){var g={values:{columns:["WOCO_NAAM","CORPO_TOTAAL_HUURWONINGEN","CORPO_AANTAL_FTE","CORPO_GEMIDDELDE_HUURPRIJS_PER_MAAND_PER_WOONGELEGENHEID"],limit:0},dataSource:d,filters:[{column:"WOCO_ID",type:"equals",value:e},f],method:"simple values"};return a.post(b,g,c)},getKWHPanelData:function(d){var f={values:{columns:["KWH_CIJFER_KLACHTEN","KWH_CIJFER_CONTACT","KWH_CIJFER_TOTAAL"],limit:0},dataSource:e,filters:[{column:"WOCO_ID",type:"equals",value:d},g],method:"simple values"};return a.post(b,f,c)},getWTAPiData:function(){return a.get("http://api.woontevreden.nl/data/corporatiecijfers/")},getWTAPiInfoData:function(){return a.get("http://api.woontevreden.nl/data/corporatiegegevens/")},getWTReviews:function(b){return a.get("http://api.woontevreden.nl/data/corporaties/"+b+"/reviews")},getWTPreviewReviews:function(b){return a.get("http://api.woontevreden.nl/data/corporaties/"+b+"/reviews?limit=3")},getKeyFromStateParam:function(e){var e=e.replace(/_/g," "),f={values:{columns:["WOCO_ID","WOCO_NAAM"],limit:1},dataSource:d,filters:[{column:"WOCO_NAAM",type:"equals",value:e}],method:"simple values"};return a.post(b,f,c)},getCorpoPanelVergelijking:function(){var e={values:{columns:["WOCO_NAAM","CORPO_TOTAAL_HUURWONINGEN","CORPO_AANTAL_FTE","CORPO_GEMIDDELDE_HUURPRIJS_PER_MAAND_PER_WOONGELEGENHEID"],limit:0},dataSource:d,filters:[f],method:"simple values"};return a.post(b,e,c)}}}]).factory("donutFactory",function(){return{getDonutFilling:function(a){var b=Math.round(628*(1-a.corporatie/10)),c=Math.round(628*(1-a.woning/10)),d=Math.round(628*(1-a.woonsituatie/10)),e=Math.round(628*(1-a.omgeving/10)),f=Math.round(628*(1-a.average/10));return{returnOffsets:function(){return[b,c,d,e,f]}}}}}).factory("highChartsFactory",function(){return{getHighChartsOptions:function(a,b,c,d,e,f,g){return{options:{chart:{type:a},legend:{verticalAlign:"top"}},plotOptions:{series:{}},series:[{name:"Gemiddeld",data:c,pointWidth:8,borderWidth:0},{name:"Woning",data:b,pointWidth:8,borderWidth:0},{name:"Omgeving",data:d,pointWidth:8,borderWidth:0},{name:"Corporatie",data:e,pointWidth:8,borderWidth:0},{name:"Woonsituatie",data:f,pointWidth:8,borderWidth:0}],xAxis:{categories:g},yAxis:{min:1,max:10,tickInterval:2,title:{text:!1},gridLineWidth:0,minorGridLineWidth:0},title:{text:!1},loading:!1}},getHighChartsTheme:function(){return{colors:["#e6812e","#e68c2e","#e6982e","#e6a32e","#e6af2e"],chart:{backgroundColor:"#E2E2E2"},title:{style:{color:"#000",font:'16px "Open Sans", sans-serif'}},subtitle:{style:{color:"#666666",font:'12px "Open Sans", sans-serif'}},legend:{itemStyle:{font:'9pt "Opens Sans", sans-serif',color:"black"},itemHoverStyle:{color:"gray"}}}}}}),angular.module("myApp",["ui.router","myApp.filters","myApp.services","myApp.directives","myApp.controllers","ui.bootstrap","firebase","ngSanitize","ngAnimate","ngResource","highcharts-ng","fitVids","truncate"]).run(["$rootScope","$state","$stateParams",function(a,b,c){a.$state=b,a.$stateParams=c}]).config(function(a,b){b.otherwise("home"),a.state("homepage",{url:"/home",templateUrl:"views/homepage.html",data:{pageTitle:"home"}}).state("about",{url:"/over_woontevreden",templateUrl:"views/about.html",data:{pageTitle:"Over Ons"}}).state("contact",{url:"/contact",templateUrl:"views/contact.html",controller:"firebaseCtrl"}).state("faq",{url:"/veelgestelde_vragen",templateUrl:"views/faq.html"}).state("woningcorporaties",{url:"/woningcorporaties",templateUrl:"views/woningcorporaties.html"}).state("overheid",{url:"/overheid",templateUrl:"views/overheid.html"}).state("bewonerscommissies",{url:"/bewonerscommissies",templateUrl:"views/bewonerscommissies.html"}).state("api.reviews",{url:"",templateUrl:"views/reviews.html"}).state("api",{url:"/:corporatienaam/:submenu",templateUrl:"views/api.html",controller:"wocoPanelCtrl"})}),angular.module("myApp.filters",[]).filter("interpolate",["version",function(a){return function(b){return String(b).replace(/\%VERSION\%/gm,a)}}]).filter("monthToString",function(){var a=["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december"];return function(b){var b=b-1;return a[b]}}).filter("yearToString",function(){var a=new Date,b=a.getFullYear();return function(a){return a==b?"van dit jaar":a==b-1?"van vorig jaar":"van twee jaar geleden"}}).filter("reverse",function(){return function(a){return a.slice().reverse()}}),angular.module("fitVids",[]).directive("fitVids",[function(){if(!document.getElementById("fit-vids-style")){var a=document.createElement("div"),b=document.getElementsByTagName("base")[0]||document.getElementsByTagName("script")[0],c="&shy;<style>.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}</style>";a.className="fit-vids-style",a.id="fit-vids-style",a.style.display="none",a.innerHTML=c,b.parentNode.insertBefore(a,b)}return{restrict:"A",link:function(a,b,c){var d,e=["iframe[src*='player.vimeo.com']","iframe[src*='youtube.com']","iframe[src*='youtube-nocookie.com']","iframe[src*='kickstarter.com'][src*='video.html']","object","embed"];c.customSelector&&e.push(c.customSelector),d=b[0].querySelectorAll(e.join(",")),angular.forEach(d,function(a){var b,c,d,e=angular.element(a);if(!("embed"===a.tagName.toLowerCase()&&"object"===e.parent().tagName&&e.parent().length||e.parent().hasClass(".fluid-width-video-wrapper"))){if(b="object"===a.tagName.toLowerCase()||e.attr("height")?parseInt(e.attr("height"),10):e.height(),c=isNaN(parseInt(e.attr("width"),10))?e.width():parseInt(e.attr("width"),10),d=b/c,!e.attr("id")){var f="fitvid"+Math.floor(999999*Math.random());e.attr("id",f)}e.wrap('<div class="fluid-width-video-wrapper" />').parent().css("padding-top",100*d+"%"),e.removeAttr("height").removeAttr("width")}})}}}]),function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){function b(a){g(function(){var b,c;for(b=0;b<a.length;b++)c=a[b],c.obj.css(c.css)})}function c(b){return a.trim(b).toLowerCase()}var d,e,f;f=function(a,b){return function(){return a.apply(b,arguments)}},e={align:"center",autoResize:!1,comparator:null,container:a("body"),direction:void 0,ignoreInactiveItems:!0,itemWidth:0,fillEmptySpace:!1,flexibleWidth:0,offset:2,outerOffset:0,onLayoutChanged:void 0,possibleFilters:[],resizeDelay:50,verticalOffset:void 0};var g=window.requestAnimationFrame||function(a){a()},h=a(window);d=function(){function d(b,c){this.handler=b,this.columns=this.containerWidth=this.resizeTimer=null,this.activeItemCount=0,this.itemHeightsDirty=!0,this.placeholders=[],a.extend(!0,this,e,c),this.verticalOffset=this.verticalOffset||this.offset,this.update=f(this.update,this),this.onResize=f(this.onResize,this),this.onRefresh=f(this.onRefresh,this),this.getItemWidth=f(this.getItemWidth,this),this.layout=f(this.layout,this),this.layoutFull=f(this.layoutFull,this),this.layoutColumns=f(this.layoutColumns,this),this.filter=f(this.filter,this),this.clear=f(this.clear,this),this.getActiveItems=f(this.getActiveItems,this),this.refreshPlaceholders=f(this.refreshPlaceholders,this),this.sortElements=f(this.sortElements,this),this.updateFilterClasses=f(this.updateFilterClasses,this),this.updateFilterClasses(),this.autoResize&&h.bind("resize.wookmark",this.onResize),this.container.bind("refreshWookmark",this.onRefresh)}return d.prototype.updateFilterClasses=function(){for(var a,b,d,e,f=0,g=0,h=0,i={},j=this.possibleFilters;f<this.handler.length;f++)if(b=this.handler.eq(f),a=b.data("filterClass"),"object"==typeof a&&a.length>0)for(g=0;g<a.length;g++)d=c(a[g]),"undefined"==typeof i[d]&&(i[d]=[]),i[d].push(b[0]);for(;h<j.length;h++)e=c(j[h]),e in i||(i[e]=[]);this.filterClasses=i},d.prototype.update=function(b){this.itemHeightsDirty=!0,a.extend(!0,this,b)},d.prototype.onResize=function(){clearTimeout(this.resizeTimer),this.itemHeightsDirty=0!==this.flexibleWidth,this.resizeTimer=setTimeout(this.layout,this.resizeDelay)},d.prototype.onRefresh=function(){this.itemHeightsDirty=!0,this.layout()},d.prototype.filter=function(b,d,e){var f,g,h,i,j,k=[],l=a();if(b=b||[],d=d||"or",e=e||!1,b.length){for(g=0;g<b.length;g++)j=c(b[g]),j in this.filterClasses&&k.push(this.filterClasses[j]);if(f=k.length,"or"==d||1==f)for(g=0;f>g;g++)l=l.add(k[g]);else if("and"==d){var m,n,o,p=k[0],q=!0;for(g=1;f>g;g++)k[g].length<p.length&&(p=k[g]);for(p=p||[],g=0;g<p.length;g++){for(n=p[g],q=!0,h=0;h<k.length&&q;h++)if(o=k[h],p!=o){for(i=0,m=!1;i<o.length&&!m;i++)m=o[i]==n;q&=m}q&&l.push(p[g])}}e||this.handler.not(l).addClass("inactive")}else l=this.handler;return e||(l.removeClass("inactive"),this.columns=null,this.layout()),l},d.prototype.refreshPlaceholders=function(b,c){for(var d,e,f,g,h,i,j=this.placeholders.length,k=this.columns.length,l=this.container.innerHeight();k>j;j++)d=a('<div class="wookmark-placeholder"/>').appendTo(this.container),this.placeholders.push(d);for(i=this.offset+2*parseInt(this.placeholders[0].css("borderLeftWidth"),10),j=0;j<this.placeholders.length;j++)if(d=this.placeholders[j],f=this.columns[j],j>=k||!f[f.length-1])d.css("display","none");else{if(e=f[f.length-1],!e)continue;h=e.data("wookmark-top")+e.data("wookmark-height")+this.verticalOffset,g=l-h-i,d.css({position:"absolute",display:g>0?"block":"none",left:j*b+c,top:h,width:b-i,height:g})}},d.prototype.getActiveItems=function(){return this.ignoreInactiveItems?this.handler.not(".inactive"):this.handler},d.prototype.getItemWidth=function(){var a=this.itemWidth,b=this.container.width()-2*this.outerOffset,c=this.handler.eq(0),d=this.flexibleWidth;if(void 0===this.itemWidth||0===this.itemWidth&&!this.flexibleWidth?a=c.outerWidth():"string"==typeof this.itemWidth&&this.itemWidth.indexOf("%")>=0&&(a=parseFloat(this.itemWidth)/100*b),d){"string"==typeof d&&d.indexOf("%")>=0&&(d=parseFloat(d)/100*b);var e=b+this.offset,f=~~(.5+e/(d+this.offset)),g=~~(e/(a+this.offset)),h=Math.max(f,g),i=Math.min(d,~~((b-(h-1)*this.offset)/h));a=Math.max(a,i),this.handler.css("width",a)}return a},d.prototype.layout=function(a){if(this.container.is(":visible")){var b,c=this.getItemWidth()+this.offset,d=this.container.width(),e=d-2*this.outerOffset,f=~~((e+this.offset)/c),g=0,h=0,i=0,j=this.getActiveItems(),k=j.length;if(this.itemHeightsDirty||!this.container.data("itemHeightsInitialized")){for(;k>i;i++)b=j.eq(i),b.data("wookmark-height",b.outerHeight());this.itemHeightsDirty=!1,this.container.data("itemHeightsInitialized",!0)}f=Math.max(1,Math.min(f,k)),g=this.outerOffset,"center"==this.align&&(g+=~~(.5+(e-(f*c-this.offset))>>1)),this.direction=this.direction||("right"==this.align?"right":"left"),h=a||null===this.columns||this.columns.length!=f||this.activeItemCount!=k?this.layoutFull(c,f,g):this.layoutColumns(c,g),this.activeItemCount=k,this.container.css("height",h),this.fillEmptySpace&&this.refreshPlaceholders(c,g),void 0!==this.onLayoutChanged&&"function"==typeof this.onLayoutChanged&&this.onLayoutChanged()}},d.prototype.sortElements=function(a){return"function"==typeof this.comparator?a.sort(this.comparator):a},d.prototype.layoutFull=function(c,d,e){var f,g,h=0,i=0,j=a.makeArray(this.getActiveItems()),k=j.length,l=null,m=null,n=[],o=[],p="left"==this.align?!0:!1;for(this.columns=[],j=this.sortElements(j);n.length<d;)n.push(this.outerOffset),this.columns.push([]);for(;k>h;h++){for(f=a(j[h]),l=n[0],m=0,i=0;d>i;i++)n[i]<l&&(l=n[i],m=i);f.data("wookmark-top",l),g=e,(m>0||!p)&&(g+=m*c),(o[h]={obj:f,css:{position:"absolute",top:l}}).css[this.direction]=g,n[m]+=f.data("wookmark-height")+this.verticalOffset,this.columns[m].push(f)}return b(o),Math.max.apply(Math,n)},d.prototype.layoutColumns=function(a,c){for(var d,e,f,g,h=[],i=[],j=0,k=0,l=0;j<this.columns.length;j++){for(h.push(this.outerOffset),e=this.columns[j],g=j*a+c,d=h[j],k=0;k<e.length;k++,l++)f=e[k].data("wookmark-top",d),(i[l]={obj:f,css:{top:d}}).css[this.direction]=g,d+=f.data("wookmark-height")+this.verticalOffset;h[j]=d}return b(i),Math.max.apply(Math,h)},d.prototype.clear=function(){clearTimeout(this.resizeTimer),h.unbind("resize.wookmark",this.onResize),this.container.unbind("refreshWookmark",this.onRefresh),this.handler.wookmarkInstance=null},d}(),a.fn.wookmark=function(a){return this.wookmarkInstance?this.wookmarkInstance.update(a||{}):this.wookmarkInstance=new d(this,a||{}),this.wookmarkInstance.layout(!0),this.show()}}),angular.module("myApp.controllers").controller("firebaseCtrl",["$scope","$firebase",function(a,b){var c=b(new Firebase("https://glaring-fire-5859.firebaseio.com/woontevreden/"));a.contacten=c.$asObject();var d=(new Date).toJSON().slice(0,10);a.updateContacten=function(b,e,f){c.$push({bericht:b,emailadres:e,telefoonnummer:f,datum:d}),a.bericht="",a.emailadres="",a.telefoonnummer=""}}]);