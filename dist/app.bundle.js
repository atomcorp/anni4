!function(t){var n={};function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var o in t)e.d(r,o,function(n){return t[n]}.bind(null,o));return r},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=13)}([function(t,n){t.exports=function(){throw new Error("define cannot be used indirect")}},function(t,n){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},function(t,n){(function(n){t.exports=n}).call(this,{})},function(t,n,e){var r=e(5),o=e(6),i=e(7),u=e(8),l=e(9),c=e(10),a=e(11);a.alea=r,a.xor128=o,a.xorwow=i,a.xorshift7=u,a.xor4096=l,a.tychei=c,t.exports=a},function(t,n,e){var r,o;o=this,void 0===(r=function(){return o.SeededShuffle=(t={strSeed:null,shuffle:function(t,n,e){if("Array"==this.getType(t)&&this.setSeed(n)){for(var r=e?t.slice(0):t,o=r.length,i=this.genMap(o),u=o-1;u>0;u--)r[u]=r.splice(i[o-1-u],1,r[u])[0];return r}return null},unshuffle:function(t,n,e){if("Array"==this.getType(t)&&this.setSeed(n)){for(var r=e?t.slice(0):t,o=r.length,i=this.genMap(o),u=1;u<o;u++)r[u]=r.splice(i[o-1-u],1,r[u])[0];return r}return null},genMap:function(t){for(var n=new Array(t),e=0;e<t;e++)n[e]=(this.__seed=(9301*this.__seed+49297)%233280)/233280*t|0;return n},setSeed:function(t){return!!/(number|string)/i.test(this.getType(t))&&(isNaN(t)&&(t=String(this.strSeed=t).split("").map((function(t){return t.charCodeAt(0)})).join("")),this.__seed=this.seed=Number(t))},getType:function(t){return Object.prototype.toString.call(t).match(/^\[object (.*)\]$/)[1]}},Object.create(t));var t}.apply(n,[]))||(t.exports=r)},function(t,n,e){(function(t){var r;!function(t,o,i){function u(t){var n,e=this,r=(n=4022871197,function(t){t=String(t);for(var e=0;e<t.length;e++){var r=.02519603282416938*(n+=t.charCodeAt(e));r-=n=r>>>0,n=(r*=n)>>>0,n+=4294967296*(r-=n)}return 2.3283064365386963e-10*(n>>>0)});e.next=function(){var t=2091639*e.s0+2.3283064365386963e-10*e.c;return e.s0=e.s1,e.s1=e.s2,e.s2=t-(e.c=0|t)},e.c=1,e.s0=r(" "),e.s1=r(" "),e.s2=r(" "),e.s0-=r(t),e.s0<0&&(e.s0+=1),e.s1-=r(t),e.s1<0&&(e.s1+=1),e.s2-=r(t),e.s2<0&&(e.s2+=1),r=null}function l(t,n){return n.c=t.c,n.s0=t.s0,n.s1=t.s1,n.s2=t.s2,n}function c(t,n){var e=new u(t),r=n&&n.state,o=e.next;return o.int32=function(){return 4294967296*e.next()|0},o.double=function(){return o()+11102230246251565e-32*(2097152*o()|0)},o.quick=o,r&&("object"==typeof r&&l(r,e),o.state=function(){return l(e,{})}),o}o&&o.exports?o.exports=c:e(0)&&e(2)?void 0===(r=function(){return c}.call(n,e,n,o))||(o.exports=r):this.alea=c}(0,t,e(0))}).call(this,e(1)(t))},function(t,n,e){(function(t){var r;!function(t,o,i){function u(t){var n=this,e="";n.x=0,n.y=0,n.z=0,n.w=0,n.next=function(){var t=n.x^n.x<<11;return n.x=n.y,n.y=n.z,n.z=n.w,n.w^=n.w>>>19^t^t>>>8},t===(0|t)?n.x=t:e+=t;for(var r=0;r<e.length+64;r++)n.x^=0|e.charCodeAt(r),n.next()}function l(t,n){return n.x=t.x,n.y=t.y,n.z=t.z,n.w=t.w,n}function c(t,n){var e=new u(t),r=n&&n.state,o=function(){return(e.next()>>>0)/4294967296};return o.double=function(){do{var t=((e.next()>>>11)+(e.next()>>>0)/4294967296)/(1<<21)}while(0===t);return t},o.int32=e.next,o.quick=o,r&&("object"==typeof r&&l(r,e),o.state=function(){return l(e,{})}),o}o&&o.exports?o.exports=c:e(0)&&e(2)?void 0===(r=function(){return c}.call(n,e,n,o))||(o.exports=r):this.xor128=c}(0,t,e(0))}).call(this,e(1)(t))},function(t,n,e){(function(t){var r;!function(t,o,i){function u(t){var n=this,e="";n.next=function(){var t=n.x^n.x>>>2;return n.x=n.y,n.y=n.z,n.z=n.w,n.w=n.v,(n.d=n.d+362437|0)+(n.v=n.v^n.v<<4^t^t<<1)|0},n.x=0,n.y=0,n.z=0,n.w=0,n.v=0,t===(0|t)?n.x=t:e+=t;for(var r=0;r<e.length+64;r++)n.x^=0|e.charCodeAt(r),r==e.length&&(n.d=n.x<<10^n.x>>>4),n.next()}function l(t,n){return n.x=t.x,n.y=t.y,n.z=t.z,n.w=t.w,n.v=t.v,n.d=t.d,n}function c(t,n){var e=new u(t),r=n&&n.state,o=function(){return(e.next()>>>0)/4294967296};return o.double=function(){do{var t=((e.next()>>>11)+(e.next()>>>0)/4294967296)/(1<<21)}while(0===t);return t},o.int32=e.next,o.quick=o,r&&("object"==typeof r&&l(r,e),o.state=function(){return l(e,{})}),o}o&&o.exports?o.exports=c:e(0)&&e(2)?void 0===(r=function(){return c}.call(n,e,n,o))||(o.exports=r):this.xorwow=c}(0,t,e(0))}).call(this,e(1)(t))},function(t,n,e){(function(t){var r;!function(t,o,i){function u(t){var n=this;n.next=function(){var t,e,r=n.x,o=n.i;return t=r[o],e=(t^=t>>>7)^t<<24,e^=(t=r[o+1&7])^t>>>10,e^=(t=r[o+3&7])^t>>>3,e^=(t=r[o+4&7])^t<<7,t=r[o+7&7],e^=(t^=t<<13)^t<<9,r[o]=e,n.i=o+1&7,e},function(t,n){var e,r=[];if(n===(0|n))r[0]=n;else for(n=""+n,e=0;e<n.length;++e)r[7&e]=r[7&e]<<15^n.charCodeAt(e)+r[e+1&7]<<13;for(;r.length<8;)r.push(0);for(e=0;e<8&&0===r[e];++e);for(8==e?r[7]=-1:r[e],t.x=r,t.i=0,e=256;e>0;--e)t.next()}(n,t)}function l(t,n){return n.x=t.x.slice(),n.i=t.i,n}function c(t,n){null==t&&(t=+new Date);var e=new u(t),r=n&&n.state,o=function(){return(e.next()>>>0)/4294967296};return o.double=function(){do{var t=((e.next()>>>11)+(e.next()>>>0)/4294967296)/(1<<21)}while(0===t);return t},o.int32=e.next,o.quick=o,r&&(r.x&&l(r,e),o.state=function(){return l(e,{})}),o}o&&o.exports?o.exports=c:e(0)&&e(2)?void 0===(r=function(){return c}.call(n,e,n,o))||(o.exports=r):this.xorshift7=c}(0,t,e(0))}).call(this,e(1)(t))},function(t,n,e){(function(t){var r;!function(t,o,i){function u(t){var n=this;n.next=function(){var t,e,r=n.w,o=n.X,i=n.i;return n.w=r=r+1640531527|0,e=o[i+34&127],t=o[i=i+1&127],e^=e<<13,t^=t<<17,e^=e>>>15,t^=t>>>12,e=o[i]=e^t,n.i=i,e+(r^r>>>16)|0},function(t,n){var e,r,o,i,u,l=[],c=128;for(n===(0|n)?(r=n,n=null):(n+="\0",r=0,c=Math.max(c,n.length)),o=0,i=-32;i<c;++i)n&&(r^=n.charCodeAt((i+32)%n.length)),0===i&&(u=r),r^=r<<10,r^=r>>>15,r^=r<<4,r^=r>>>13,i>=0&&(u=u+1640531527|0,o=0==(e=l[127&i]^=r+u)?o+1:0);for(o>=128&&(l[127&(n&&n.length||0)]=-1),o=127,i=512;i>0;--i)r=l[o+34&127],e=l[o=o+1&127],r^=r<<13,e^=e<<17,r^=r>>>15,e^=e>>>12,l[o]=r^e;t.w=u,t.X=l,t.i=o}(n,t)}function l(t,n){return n.i=t.i,n.w=t.w,n.X=t.X.slice(),n}function c(t,n){null==t&&(t=+new Date);var e=new u(t),r=n&&n.state,o=function(){return(e.next()>>>0)/4294967296};return o.double=function(){do{var t=((e.next()>>>11)+(e.next()>>>0)/4294967296)/(1<<21)}while(0===t);return t},o.int32=e.next,o.quick=o,r&&(r.X&&l(r,e),o.state=function(){return l(e,{})}),o}o&&o.exports?o.exports=c:e(0)&&e(2)?void 0===(r=function(){return c}.call(n,e,n,o))||(o.exports=r):this.xor4096=c}(0,t,e(0))}).call(this,e(1)(t))},function(t,n,e){(function(t){var r;!function(t,o,i){function u(t){var n=this,e="";n.next=function(){var t=n.b,e=n.c,r=n.d,o=n.a;return t=t<<25^t>>>7^e,e=e-r|0,r=r<<24^r>>>8^o,o=o-t|0,n.b=t=t<<20^t>>>12^e,n.c=e=e-r|0,n.d=r<<16^e>>>16^o,n.a=o-t|0},n.a=0,n.b=0,n.c=-1640531527,n.d=1367130551,t===Math.floor(t)?(n.a=t/4294967296|0,n.b=0|t):e+=t;for(var r=0;r<e.length+20;r++)n.b^=0|e.charCodeAt(r),n.next()}function l(t,n){return n.a=t.a,n.b=t.b,n.c=t.c,n.d=t.d,n}function c(t,n){var e=new u(t),r=n&&n.state,o=function(){return(e.next()>>>0)/4294967296};return o.double=function(){do{var t=((e.next()>>>11)+(e.next()>>>0)/4294967296)/(1<<21)}while(0===t);return t},o.int32=e.next,o.quick=o,r&&("object"==typeof r&&l(r,e),o.state=function(){return l(e,{})}),o}o&&o.exports?o.exports=c:e(0)&&e(2)?void 0===(r=function(){return c}.call(n,e,n,o))||(o.exports=r):this.tychei=c}(0,t,e(0))}).call(this,e(1)(t))},function(t,n,e){var r;!function(o,i,u){var l,c=u.pow(256,6),a=u.pow(2,52),f=2*a;function s(t,n,e){var r=[],s=v(function t(n,e){var r,o=[],i=typeof n;if(e&&"object"==i)for(r in n)try{o.push(t(n[r],e-1))}catch(t){}return o.length?o:"string"==i?n:n+"\0"}((n=1==n?{entropy:!0}:n||{}).entropy?[t,h(i)]:null==t?function(){try{var t;return l&&(t=l.randomBytes)?t=t(256):(t=new Uint8Array(256),(o.crypto||o.msCrypto).getRandomValues(t)),h(t)}catch(t){var n=o.navigator,e=n&&n.plugins;return[+new Date,o,e,o.screen,h(i)]}}():t,3),r),y=new d(r),g=function(){for(var t=y.g(6),n=c,e=0;t<a;)t=256*(t+e),n*=256,e=y.g(1);for(;t>=f;)t/=2,n/=2,e>>>=1;return(t+e)/n};return g.int32=function(){return 0|y.g(4)},g.quick=function(){return y.g(4)/4294967296},g.double=g,v(h(y.S),i),(n.pass||e||function(t,n,e,r){return r&&(r.S&&p(r,y),t.state=function(){return p(y,{})}),e?(u.random=t,n):t})(g,s,"global"in n?n.global:this==u,n.state)}function d(t){var n,e=t.length,r=this,o=0,i=r.i=r.j=0,u=r.S=[];for(e||(t=[e++]);o<256;)u[o]=o++;for(o=0;o<256;o++)u[o]=u[i=255&i+t[o%e]+(n=u[o])],u[i]=n;(r.g=function(t){for(var n,e=0,o=r.i,i=r.j,u=r.S;t--;)n=u[o=255&o+1],e=256*e+u[255&(u[o]=u[i=255&i+n])+(u[i]=n)];return r.i=o,r.j=i,e})(256)}function p(t,n){return n.i=t.i,n.j=t.j,n.S=t.S.slice(),n}function v(t,n){for(var e,r=t+"",o=0;o<r.length;)n[255&o]=255&(e^=19*n[255&o])+r.charCodeAt(o++);return h(n)}function h(t){return String.fromCharCode.apply(0,t)}if(v(u.random(),i),t.exports){t.exports=s;try{l=e(12)}catch(t){}}else void 0===(r=function(){return s}.call(n,e,n,t))||(t.exports=r)}("undefined"!=typeof self?self:this,[],Math)},function(t,n){},function(t,n,e){"use strict";e.r(n);var r=function(t){var n=document.getElementById("canvas");n.width=500,n.height=500,n.style.backgroundColor="";var e=n.getContext("2d");e.clearRect(0,0,n.width,n.height);var r,o,i=[10,10];e.beginPath(),r=i[0],o=function(t,n){var r,o;r=50*t,o=50*n,e.beginPath(),e.moveTo(r,o),e.lineTo(r+50,o),e.lineTo(r,o+50),e.fill(),e.closePath()},Array(i[1]).fill(null).forEach((function(t,n){Array(r).fill(null).forEach((function(t,e){o(n,e)}))}))},o=e(3),i=e.n(o),u=function(t){return t.length>0?i()(t)():i()()()},l=function(t){var n=document.getElementById("canvas");n.width=500,n.height=500,n.style.backgroundColor="";var e=n.getContext("2d");e.clearRect(0,0,n.width,n.height);var r,o,i=[10,10],l=u(t);e.beginPath(),r=i[0],o=function(t,n){var r,o;r=50*t,o=50*n,e.beginPath(),Math.round(l*parseInt("".concat(r).concat(o)))%2==0?e.moveTo(r+50,o+50):e.moveTo(r,o),e.lineTo(r,o+50),e.lineTo(r+50,o),e.fill(),e.closePath()},Array(i[1]).fill(null).forEach((function(t,n){Array(r).fill(null).forEach((function(t,e){o(n,e)}))}))},c=e(4),a=e.n(c);function f(t){return function(t){if(Array.isArray(t))return s(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,n){if(!t)return;if("string"==typeof t)return s(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);"Object"===e&&t.constructor&&(e=t.constructor.name);if("Map"===e||"Set"===e)return Array.from(e);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return s(t,n)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}var d="BLANK",p=25,v=25,h=40,y=40,g=["#bbc5b4","#80948f"],b={up:0,down:0,blank:0},x=function(t,n,e,r){var o=parseInt("".concat(n+3).concat(e+8))*t%100/100,i=parseInt("".concat(n+2).concat(e+5))*t%100/100;return Math.floor((o+i)/2*r)},m=function(t){var n=document.getElementById("canvas");n.width=1e3,n.height=1e3,n.style.backgroundColor="#04b27a";var e=n.getContext("2d");e.clearRect(0,0,n.width,n.height);var r=u(t),o=function(t){return function(n,e,r){switch(t.beginPath(),r.type){case"NW":t.moveTo(n,e),t.lineTo(n+v,e),t.lineTo(n,e+v);break;case"NE":t.moveTo(n,e),t.lineTo(n+v,e),t.lineTo(n+v,e+p);break;case"SE":t.moveTo(n,e+p),t.lineTo(n+v,e+p),t.lineTo(n+v,e);break;case"SW":t.moveTo(n,e+p),t.lineTo(n+p,e+p),t.lineTo(n,e)}t.fillStyle=r.color,t.fill(),t.closePath()}}(e);b.up=0,b.down=0,b.blank=0;var i=function(){var t=h*y,n=t-(x(r,5,8,.22*t)+4),e=Array(t).fill(null).map((function(t,e){return e<=n/2?"NE":e<=n?"SE":d}));return a.a.shuffle(e,r)}(),l=function(t){var n=t;return n.forEach((function(t,e){n[e].forEach((function(t,r){var o=function(t,n,e){return{previousShape:n>0?t[e][n-1]:null,aboveNextShape:n+1<h&&e>0?t[e-1][n+1]:null,aboveShape:e>0?t[e-1][n]:null,belowShape:e+1<y?t[e+1][n]:null,belowNextShape:e+1<y&&n+1<h?t[e+1][n+1]:null,nextShape:n+1<h?t[e][n+1]:null}}(n,r,e),i=o.previousShape,u=o.aboveShape,l=o.belowShape,c=o.belowNextShape,a=o.nextShape,f=o.aboveNextShape;if(null!=u){if("SE"===u.type&&"NE"===t.type)return void(n[e][r]={type:d});if("SW"===u.type&&"NE"===t.type)return void(n[e][r]={type:d});if("SE"===u.type&&"NW"===t.type)return n[e][r]={type:d},void(n[e][r-1]={type:d})}if(null!=i){if("NE"===i.type)return void(n[e][r]={type:"NW",color:i.color});if("SE"===i.type)return void(n[e][r]={type:"SW",color:i.color});if(i.type===d&&("NW"===t.type||"SW"===t.type))return void(n[e][r]={type:d})}if(t.type===d&&(null==a?void 0:a.type)===d){if("NE"!==(null==l?void 0:l.type)&&"NW"!==(null==l?void 0:l.type)&&"NE"!==(null==c?void 0:c.type))return void(n[e][r]={type:"SE",color:t.color});if("SE"!==(null==u?void 0:u.type)&&"SW"!==(null==u?void 0:u.type)&&"SE"!==(null==f?void 0:f.type))return void(n[e][r]={type:"NE",color:t.color})}}))})),n};!function(t){t.forEach((function(t,n){t.forEach((function(t,e){o(e*v,n*p,t)}))}))}(l(l(Array(y).fill(null).reduce((function(t,n,e){return[].concat(f(t),[Array(h).fill(null).reduce((function(n,o,u){var l=function(t,n,e){var o=t>0?e[n][t-1]:null,u=(n>0&&e[n-1][t],t<h-1&&n>0&&e[n-1][t+1],i);if(null!=o){if("NE"===o.type)return++b.down,{type:"NW",color:o.color};if("SE"===o.type)return++b.up,{type:"SW",color:o.color}}t===h-1&&(u=u.filter((function(t){return"NE"!==t&&"SE"!==t})));var l=t+n*h,c=i.length-u.length;return{type:u[Math.abs(l-c)],color:g[x(r,t,n,g.length)]}}(u,e,[].concat(f(t),[n]));return[].concat(f(n),[l])}),[])])}),[])))),console.log(b)};function S(t){return function(t){if(Array.isArray(t))return w(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,n){if(!t)return;if("string"==typeof t)return w(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);"Object"===e&&t.constructor&&(e=t.constructor.name);if("Map"===e||"Set"===e)return Array.from(e);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return w(t,n)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function w(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}var E="#9b3b1b",T="#2b4990",A=[50,50],N=[16,16],j=function(t,n,e,r){var o=["N","E","S","W"],i=["N","S"],u=["W","E"],l=t>0?e[n][t-1]:null,c=n>0?e[n-1][t]:null;return null!=l?o=i.includes(l)?u:i:null!=c&&(o=i.includes(c)?u:i),o[function(t,n,e,r){var o=parseInt("".concat(33*t).concat(84*n))*r%100/100,i=parseInt("".concat(29*t).concat(51*n))*r%100/100;return Math.floor((o+i)/2*e)}(t,n,o.length,r)]},I=function(t,n){return t>=N[0]/2&&n<N[1]/2||t<N[0]/2&&n>=N[1]/2?T:E},W=function(t){var n=document.getElementById("canvas");n.width=800,n.height=800;var e=n.getContext("2d");e.clearRect(0,0,n.width,n.height);var r=u(t),o=function(t,n,e){return function(r,o,i){switch(t.beginPath(),t.fillStyle="#9b3b1b"===i.color?"#2b4990":"#9b3b1b",t.fillRect(r,o,n,e),i.type){case"N":t.moveTo(r,o+n/2),t.lineTo(r+n/2,o),t.lineTo(r+n,o+n/2),t.lineTo(r+n,o+n),t.lineTo(r+n/2,o+n/2),t.lineTo(r,o+n);break;case"E":t.moveTo(r,o),t.lineTo(r+n/2,o),t.lineTo(r+n,o+e/2),t.lineTo(r+n/2,o+e),t.lineTo(r,o+e),t.lineTo(r+n/2,o+e/2);break;case"S":t.moveTo(r,o),t.lineTo(r+n/2,o+n/2),t.lineTo(r+n,o),t.lineTo(r+n,o+n/2),t.lineTo(r+n/2,o+n),t.lineTo(r,o+n/2);break;case"W":t.moveTo(r,o+e/2),t.lineTo(r+e/2,o),t.lineTo(r+e,o),t.lineTo(r+e/2,o+e/2),t.lineTo(r+e,o+e),t.lineTo(r+e/2,o+e)}t.fillStyle=i.color,t.fill(),t.closePath()}}(e,A[0],A[1]);!function(t,n){t.forEach((function(t,e){t.forEach((function(t,r){var o=r*A[0],i=e*A[1];n(o,i,{type:t,color:I(r,e)})}))}))}(Array(N[1]).fill(null).reduce((function(t,n,e){return[].concat(S(t),[Array(N[0]).fill(null).reduce((function(n,o,i){var u=j(i,e,[].concat(S(t),[n]),r);return[].concat(S(n),[u])}),[])])}),[]),o)},O=function(t){var n=document.getElementById("canvas");n.width=1e3,n.height=1e3,n.style.backgroundColor="white",n.getContext("2d").clearRect(0,0,n.width,n.height);u(t)};function C(t,n){return function(t){if(Array.isArray(t))return t}(t)||function(t,n){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var e=[],r=!0,o=!1,i=void 0;try{for(var u,l=t[Symbol.iterator]();!(r=(u=l.next()).done)&&(e.push(u.value),!n||e.length!==n);r=!0);}catch(t){o=!0,i=t}finally{try{r||null==l.return||l.return()}finally{if(o)throw i}}return e}(t,n)||function(t,n){if(!t)return;if("string"==typeof t)return k(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);"Object"===e&&t.constructor&&(e=t.constructor.name);if("Map"===e||"Set"===e)return Array.from(e);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return k(t,n)}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function k(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}var P=function(t,n){return function(e,r,o){var i=n.shapes,u=i.NW,l=i.NE,c=i.SE,a=i.SW,f=C(n.size,2),s=f[0],d=f[1];switch(t.beginPath(),o.type){case u:t.moveTo(e,r),t.lineTo(e+s,r),t.lineTo(e,r+s);break;case l:t.moveTo(e,r),t.lineTo(e+s,r),t.lineTo(e+s,r+d);break;case c:t.moveTo(e,r+d),t.lineTo(e+s,r+d),t.lineTo(e+s,r);break;case a:t.moveTo(e,r+d),t.lineTo(e+d,r+d),t.lineTo(e,r)}t.fillStyle=o.color,t.fill(),t.closePath()}},M=function(t,n,e,r){var o=parseInt("".concat(33*t).concat(84*n))*r%100/100,i=parseInt("".concat(29*t).concat(51*n))*r%100/100;return Math.floor((o+i)/2*e)},z=function(t,n){return function(e,r,o){return{west:r>0?e[o][r-1]:null,northEast:r+1<t&&o>0?e[o-1][r+1]:null,north:o>0?e[o-1][r]:null,south:o+1<n?e[o+1][r]:null,southEast:o+1<n&&r+1<t?e[o+1][r+1]:null,east:r+1<t?e[o][r+1]:null}}};function B(t){return function(t){if(Array.isArray(t))return R(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,n){if(!t)return;if("string"==typeof t)return R(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);"Object"===e&&t.constructor&&(e=t.constructor.name);if("Map"===e||"Set"===e)return Array.from(e);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return R(t,n)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function R(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}var _,U={size:[25,25],grid:[32,26],shapes:{NE:"NE",NW:"NW",SE:"SE",SW:"SW"}},q=function(t){return function(n,e){var r=U.shapes,o=(r.NW,r.NE,r.SE,r.SW,[]),i=n,u=z(U.grid[0],U.grid[1]);return n.forEach((function(n,r){n.forEach((function(n,l){var c=o,a=u(i,l,r),f=function(t,n){var e,r,o,i,u,l,c,a,f=U.shapes,s=f.NW,d=f.NE,p=f.SE,v=f.SW;return t===d&&(null===(e=n.north)||void 0===e?void 0:e.type)===v&&(null===(r=n.east)||void 0===r?void 0:r.type)===v||(t===s&&(null===(o=n.north)||void 0===o?void 0:o.type)===p&&(null===(i=n.west)||void 0===i?void 0:i.type)===p||(t===p&&(null===(u=n.east)||void 0===u?void 0:u.type)===s&&(null===(l=n.south)||void 0===l?void 0:l.type)===s||t===v&&(null===(c=n.west)||void 0===c?void 0:c.type)===d&&(null===(a=n.south)||void 0===a?void 0:a.type)===d))}(n.type,a),s=function(t,n){var e,r,o,i,u,l,c,a,f=U.shapes,s=f.NW,d=f.NE,p=f.SE,v=f.SW;return t===s&&((null===(e=n.north)||void 0===e?void 0:e.type)===v||(null===(r=n.west)||void 0===r?void 0:r.type)===d)||(t===d&&((null===(o=n.north)||void 0===o?void 0:o.type)===p||(null===(i=n.east)||void 0===i?void 0:i.type)===s)||(t===p&&((null===(u=n.south)||void 0===u?void 0:u.type)===d||(null===(l=n.east)||void 0===l?void 0:l.type)===v)||t===v&&((null===(c=n.south)||void 0===c?void 0:c.type)===s||(null===(a=n.east)||void 0===a?void 0:a.type)===p)))}(n.type,a);(!f||f&&s)&&(c=function(t,n,e){var r,o,i,u,l,c,a,f,s,d,p,v,h,y,g,b,x=U.shapes,m=x.NW,S=x.NE,w=x.SE,E=x.SW,T=[],A=[];(null===(r=n.north)||void 0===r?void 0:r.type)!==E&&(null===(o=n.east)||void 0===o?void 0:o.type)!==E||(T.push(S),e||(null===(s=n.west)||void 0===s?void 0:s.type)===w&&(null===(d=n.south)||void 0===d?void 0:d.type)===m||T.push(E),A.push(m,w));(null===(i=n.north)||void 0===i?void 0:i.type)!==w&&(null===(u=n.west)||void 0===u?void 0:u.type)!==w||(T.push(m),e||(null===(p=n.east)||void 0===p?void 0:p.type)===E&&(null===(v=n.south)||void 0===v?void 0:v.type)===S||T.push(w),A.push(S,E));(null===(l=n.south)||void 0===l?void 0:l.type)!==m&&(null===(c=n.east)||void 0===c?void 0:c.type)!==m||(T.push(w),e||(null===(h=n.north)||void 0===h?void 0:h.type)===E&&(null===(y=n.west)||void 0===y?void 0:y.type)===S||T.push(m),A.push(E,S));(null===(a=n.south)||void 0===a?void 0:a.type)!==S&&(null===(f=n.west)||void 0===f?void 0:f.type)!==S||(T.push(E),e||(null===(g=n.north)||void 0===g?void 0:g.type)===w&&(null===(b=n.east)||void 0===b?void 0:b.type)===m||T.push(S),A.push(w,m));return T.filter((function(t){return!A.includes(t)}))}(n.type,a,e)),s&&c.length<1&&(i[r][l].isBlocked=!0),c.length>0&&(i[r][l].type=c[M(l,r,c.length,t)],i[r][l].isBlocked=!1)}))})),i}},X=(_={NW:0,NE:0,SE:0,SW:0},{add:function(t){_[t.type]++},show:function(){console.log(_)},reset:function(){_={NW:0,NE:0,SE:0,SW:0}}}),$=function(t){X.reset();var n=document.getElementById("canvas");n.width=800,n.height=600,n.style.backgroundColor="white";var e=n.getContext("2d");e.clearRect(0,0,n.width,n.height);var r=u(t),o=P(e,U),i=Array(U.grid[1]).fill(null).reduce((function(t,n,e){return[].concat(B(t),[Array(U.grid[0]).fill(null).reduce((function(t,n,o){var i=U.shapes,u=[i.NW,i.NE,i.SE,i.SW],l=u[M(o,e,u.length,r)];return[].concat(B(t),[{type:l,color:"rgb(243, 204, 9)",isBlocked:!1}])}),[])])}),[]),l=q(r);l(l(l(l(i))),!0).forEach((function(t,n){t.forEach((function(t,e){var r=e*U.size[0],i=n*U.size[1];X.add(t),o(r,i,t)}))})),X.show()},L=function(){var t=function(){var t=new URLSearchParams(window.location.search);return{get:function(n){return t.has(n)?decodeURIComponent(t.get(n)):null},set:function(n,e){t.set(n,encodeURIComponent(e)),window.history.replaceState(null,null,"?"+t.toString())},share:function(){return"".concat(window.location,"?").concat(t.toString())}}}(),n={currentOption:"tr-II",seed:"Anni Albers"},e={simple:r,random:l,"tr-II":m,"gr-II":W,"sm-ii":O,eclat:$};return{init:function(r,o){t.get("seed")?(r.value=decodeURIComponent(t.get("seed")),n.seed=t.get("seed")):(t.set("seed",n.seed),r.value=n.seed),t.get("pattern")?(o.value=t.get("pattern"),e[t.get("pattern")](n.seed),n.currentOption=t.get("pattern")):(e[n.currentOption](n.seed),o.value=n.currentOption,t.set("pattern",n.currentOption))},handleOption:function(r){n.currentOption!==r&&(n.currentOption=r,e[r](n.seed),t.set("pattern",r))},handleInput:function(r){n.seed=r,e[n.currentOption](n.seed),t.set("seed",r)}}};!function(){var t=L(),n=document.getElementById("options");n.addEventListener("change",(function(n){var e=n.currentTarget;t.handleOption(e.value)}));var e=document.getElementById("seed");e.addEventListener("input",(function(n){var e=n.currentTarget;t.handleInput(e.value)})),t.init(e,n)}()}]);