"use strict";var precacheConfig=[["/index.html","df90890a29b2e7e2cda682f3adb307d6"],["/static/css/main.3dc9560f.css","d5ee2ec5481da449e29624f6730d65c7"],["/static/js/main.6d21625e.js","b231c5bcad62f572b9d4a296966771c4"],["/static/media/bike-real.d5aad28e.jpg","d5aad28e0c1d4088ba2879b17d1c9940"],["/static/media/elliptical-real.4c5c6f60.jpg","4c5c6f60b750d312ea5f27be5adf9625"],["/static/media/floor.d19c378f.png","d19c378f99f3e5062a210095c89ee61c"],["/static/media/heisenberg.677fa01d.jpg","677fa01da2cb3baacb4df944d25acc84"],["/static/media/husky-logo.6b991215.png","6b9912150e4c43e57420ef7201459897"],["/static/media/pullup-real.d41de708.png","d41de708012a7ddbf482cf684ec6a3d9"],["/static/media/qrcode.35f9219e.png","35f9219e07c80d1722ed8fdb2febc2c3"],["/static/media/start-workout.2a176e4d.png","2a176e4d6d8b5377ae378931ae65bd28"],["/static/media/stepmill-real.abfae234.jpg","abfae234050cb436d87d2536dad4256e"],["/static/media/treadmill-real.5347fd55.jpg","5347fd555034611d7e4e58297c2c8133"],["/static/media/treadmill.98d68eff.svg","98d68eff73b0c78729a66abc09817766"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,a,n){var r=new URL(e);return n&&r.pathname.match(n)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),r=createCacheKey(n,hashParamName,a,/\.\w{8}\./);return[n.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var n=new Request(a,{credentials:"same-origin"});return fetch(n).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching),n="index.html";(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,n),t=urlsToCacheKeys.has(a));var r="/index.html";!t&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(a=new URL(r,self.location).toString(),t=urlsToCacheKeys.has(a)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});