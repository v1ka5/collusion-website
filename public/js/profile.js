/*
  Based on https://github.com/toolness/url-demystifier
  and uses Steven Levithan's parseUri 1.2.2
*/
var url = window.location.pathname.split("/")[2];
var info = parseUri(url);
var jsonURL = "http://freegeoip.net/json/" + info.host;
var countryCode = "";
$.getJSON(jsonURL, function(geoip) {
      geoip.has_name = geoip.city && geoip.region_name &&
                       geoip.country_name;
      geoip.host = info.host;
      for ( var property in geoip){
        //console.log(property + ": " + geoip[property]);
      }

      $(".country").html(geoip.country_name);
      countryCode = geoip.country_code;
      var svg = d3.select("#worldmap");
      var countryOnMap = d3.select("#worldmap").select("#" + countryCode.toLowerCase());
      //console.log(countryOnMap);
      countryOnMap.classed("highlight-country", true);
      countryOnMap.selectAll("path").classed("highlight-country", true);
});
/* ----------------------------------------------------------- */


$(".connections ul li[cookie-connection=true]").addClass("cookie");
$(".connections ul li[cookie-connection=false]").addClass("non-cookie");

$("#filter-cookie").click(function(){
      $("ul li[cookie-connection=true], ul li[cookie-connection=true] a").toggleClass("cookie").toggleClass("greyed-out");
});

$("#filter-noncookie").click(function(){
      $("ul li[cookie-connection=false], ul li[cookie-connection=false] a").toggleClass("non-cookie").toggleClass("greyed-out");
});

