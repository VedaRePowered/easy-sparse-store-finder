(this["webpackJsonpeasy-sparse-store-finder"]=this["webpackJsonpeasy-sparse-store-finder"]||[]).push([[0],[,,,function(e,a,t){e.exports=t(12)},,,,,function(e,a,t){},function(e,a,t){e.exports=t.p+"static/media/logo.128f7fdb.svg"},function(e,a,t){},function(e,a,t){},function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),s=t(2),o=t.n(s);t(8),t(9),t(10),t(11);var i=function(e){var a="";switch(e.userRating){case 0:a="Squishy";break;case 1:a="Packed";break;case 2:a="Normal";break;case 3:a="Sparse";break;case 4:a="Lonely";break;default:a="Unknown"}return r.a.createElement("span",{className:"ListItem"},r.a.createElement("div",{className:"ListItem-name"},e.storeName),r.a.createElement("div",{className:"ListItem-ratingUser ListItem-ratingUser_"+a},a))};var c=function(e){return r.a.createElement("div",{className:"ListView"},e.stores.sort((function(e,a){return a.userRating-e.userRating})).map((function(e){return r.a.createElement(i,{storeName:e.name,userRating:e.userRating})})))};var u=function(){return r.a.createElement("div",{className:"App"},r.a.createElement("header",null,r.a.createElement("p",null,"Header")),r.a.createElement(c,{stores:[{name:"Safeway",userRating:4},{name:"Costco",userRating:0},{name:"Sobeys",userRating:3},{name:"Superstore",userRating:1},{name:"Co-op",userRating:2}]}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var m=function(){return o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(u,null)),document.getElementById("root"))};window.cordova?document.addEventListener("deviceready",(function(){m()}),!1):m(),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[3,1,2]]]);
//# sourceMappingURL=main.cbb08048.chunk.js.map