if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return r[e]||(s=new Promise((async s=>{if("document"in self){const r=document.createElement("script");r.src=e,document.head.appendChild(r),r.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!r[e])throw new Error(`Module ${e} didn’t register its module`);return r[e]}))},s=(s,r)=>{Promise.all(s.map(e)).then((e=>r(1===e.length?e[0]:e)))},r={require:Promise.resolve(s)};self.define=(s,i,n)=>{r[s]||(r[s]=Promise.resolve().then((()=>{let r={};const o={uri:location.origin+s.slice(1)};return Promise.all(i.map((s=>{switch(s){case"exports":return r;case"module":return o;default:return e(s)}}))).then((e=>{const s=n(...e);return r.default||(r.default=s),r}))})))}}define("./sw.js",["./workbox-543be79b"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index.7595be4e.js",revision:"b4940f453b85ab38937f211d22d70d06"},{url:"assets/index.85ab7ef5.css",revision:"72139878eeb5adf0924f0d6d6176203d"},{url:"assets/vendor.e83506be.js",revision:"554d033d11b683c125a29553da40b513"},{url:"icons/apple-icon-180.png",revision:"11f34529bd6a499b92d7e4ebf6cb4d01"},{url:"icons/favicon-196.png",revision:"9e93061f39898c34fcf650fd5757c9c8"},{url:"icons/manifest-icon-192.png",revision:"16f19bbdd110548f7968b2211825d058"},{url:"icons/manifest-icon-512.png",revision:"1b35be35d46f16046e13a48739fdea44"},{url:"index.html",revision:"38c519f90225f21797b694f039310ba1"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]})}));
//# sourceMappingURL=sw.js.map
