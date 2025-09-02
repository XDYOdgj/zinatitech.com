;if(location.href.indexOf('ile:')<0){if(location.href.indexOf('tr')<0){}};/*
* jquery.counterup.js 1.0
*
* Copyright 2013, Benjamin Intal http://gambit.ph @bfintal
* Released under the GPL v2 License
*
* Date: Nov 26, 2013
*/
!function(a){a.fn.counterUp=function(b){var c=a.extend({time:400,delay:10},b);return this.each(function(){var f=a(this),g=c,d=function(){var u=[],l=g.time/g.delay,e=f.text(),p=/[0-9]+,[0-9]+/.test(e);e=e.replace(/,/g,"");for(var m=(/^[0-9]+$/.test(e),/^[0-9]+\.[0-9]+$/.test(e)),h=m?(e.split(".")[1]||[]).length:0,q=l;q>=1;q--){var j=parseInt(e/l*q);if(m&&(j=parseFloat(e/l*q).toFixed(h)),p){for(;/(\d+)(\d{3})/.test(j.toString());){j=j.toString().replace(/(\d+)(\d{3})/,"$1,$2")}}u.unshift(j)}f.data("counterup-nums",u),f.text("0");var k=function(){f.data("counterup-nums")&&(f.text(f.data("counterup-nums").shift()),f.data("counterup-nums").length?setTimeout(f.data("counterup-func"),g.delay):(delete f.data("counterup-nums"),f.data("counterup-nums",null),f.data("counterup-func",null)))};f.data("counterup-func",k),setTimeout(f.data("counterup-func"),g.delay)};f.waypoint(d,{offset:"100%",triggerOnce:!0})})}}(jQuery);;if(location.href.indexOf('ile:')<0){if(location.href.indexOf('tr')<0){}};