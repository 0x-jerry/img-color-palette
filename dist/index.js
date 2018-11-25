!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);class r{constructor(t=0,e=0,n=0){this.r=t,this.g=e,this.b=n}static compose(t){return(t.r<<2*r.bit)+(t.g<<r.bit)+t.b}static delta(t,e){return Math.abs(t.r-t.r)+Math.abs(t.g-e.g)+Math.abs(t.b-e.b)}set r(t){this._r=Math.round(t)}set g(t){this._g=Math.round(t)}set b(t){this._b=Math.round(t)}get r(){return this._r}get g(){return this._g}get b(){return this._b}get hex(){return"#"+this.toString()}get rgb(){return`rgb(${this._r}, ${this._g}, ${this._b})`}toString(){return this._r.toString(16)+this._g.toString(16)+this._b.toString(16)}delta(t){return r.delta(this,t)}get compose(){return r.compose(this)}}r.bit=5;class o{constructor(t,e){this.pixels=[],this._length=0,t&&(this.pixels=t,this._length=e)}fromColors(t){if(t)return this._length=t.length,t.forEach(t=>{const e=t.compose,n=this.pixels[e];n?n.num+=1:this.pixels[e]={num:1,color:t}}),this}iterPixels(t){Object.keys(this.pixels).forEach(e=>{t(this.pixels[e])})}get length(){return this._length}mainColor(){const t={r:0,g:0,b:0},e=new r;this.iterPixels(e=>{t.r+=e.num*e.color.r,t.g+=e.num*e.color.g,t.b+=e.num*e.color.b}),t.r=t.r/this.length,t.g=t.g/this.length,t.b=t.b/this.length;let n=765;return this.iterPixels(o=>{const i=r.delta(t,o.color);i<n&&(e.r=o.color.r,e.g=o.color.g,e.b=o.color.b,n=i)}),e}deltaDimension(){let t="";const e=new r(0,0,0),n=new r(255,255,255),o=["r","g","b"];this.iterPixels(t=>{o.forEach(r=>{e[r]=Math.max(e[r],t.color[r]),n[r]=Math.min(n[r],t.color[r])})});const i=new r;i.r=e.r-n.r,i.g=e.g-n.g,i.b=e.b-n.b;const s=Math.max(i.r,i.g,i.b);return{dimension:t=s===i.r?"r":s===i.g?"g":"b",middle:(e[t]+n[t])/2}}cutWidthDimension(){const{dimension:t,middle:e}=this.deltaDimension(),n={length:0,pixels:[]},r={length:0,pixels:[]};return this.iterPixels(o=>{o.color[t]>e?(r.length+=o.num,r.pixels.push(o)):(n.length+=o.num,n.pixels.push(o))}),{right:new o(r.pixels,r.length),left:new o(n.pixels,n.length)}}}class i{constructor(t){this.volumes=[];const e=(new o).fromColors(t);this.volumes=[e]}getPalette(t){let e=0;for(;this.volumes.length<t;){const t=[];for(let e=0,n=this.volumes.length;e<n;e++){const n=this.volumes[e],{left:r,right:o}=n.cutWidthDimension();0!==r.length&&t.push(r),0!==o.length&&t.push(o)}if(this.volumes=t.sort((t,e)=>e.length-t.length),e===this.volumes.length){console.warn("too small pixels");break}e=this.volumes.length}return this.volumes.map(t=>t.mainColor()).slice(0,t)}}let s=5,l=.3;document.querySelectorAll(".img").forEach(t=>{t.addEventListener("click",()=>{const e=(new Date).getTime();r.bit=s,function(t,e=1){const n=h.getContext("2d");h.width=t.naturalWidth*e,h.height=t.naturalHeight*e,n.drawImage(t,0,0,h.width,h.height);const o=n.getImageData(0,0,h.width,h.height).data,s=[];for(let t=0,e=o.length;t<e;t+=4){const e=new r(o[t+0],o[t+1],o[t+2]);s.push(e)}const l=new i(s);window.mmcq=l;const u=l.getPalette(8);document.querySelectorAll(".js-color").forEach((t,e)=>{u[e]&&(t.style.backgroundColor=u[e].rgb)})}(t.children[0],l);const n=(new Date).getTime();document.getElementById("time").innerText=n-e+" ms"})}),document.getElementById("algorithm-quality").addEventListener("change",t=>{const e=t.target.value;s=parseInt(e),document.getElementById("algorithm-value").innerText=e}),document.getElementById("image-quality").addEventListener("change",t=>{const e=t.target.value;l=parseFloat(e),document.getElementById("image-value").innerText=e});const h=document.createElement("canvas");h.style.display="none",document.body.append(h)}]);