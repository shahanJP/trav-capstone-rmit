if(!self.define){let e,i={};const n=(n,r)=>(n=new URL(n+".js",r).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,t)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let s={};const c=e=>n(e,o),d={module:{uri:o},exports:s,require:c};i[o]=Promise.all(r.map((e=>d[e]||c(e)))).then((e=>(t(...e),s)))}}define(["./workbox-ad8011fb"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"./index.html",revision:"9ccaaf5644a6514c6e5306e2bba47840"},{url:"main.css",revision:"0e23dbd0bd02411408dff2e52562823e"},{url:"main.js",revision:"10987ad36c6c41ef2a5c6e342b199d37"}],{})}));
