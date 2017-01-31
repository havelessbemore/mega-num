!function(i,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Big=e():i.Big=e()}(this,function(){return function(i){function e(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return i[r].call(n.exports,n,n.exports,e),n.l=!0,n.exports}var t={};return e.m=i,e.c=t,e.i=function(i){return i},e.d=function(i,t,r){e.o(i,t)||Object.defineProperty(i,t,{configurable:!1,enumerable:!0,get:r})},e.n=function(i){var t=i&&i.__esModule?function(){return i.default}:function(){return i};return e.d(t,"a",t),t},e.o=function(i,e){return Object.prototype.hasOwnProperty.call(i,e)},e.p="",e(e.s=51)}([function(i,e,t){"use strict";function r(i,e){return i.base=e.base,i.digits=e.digits,i.precision=e.precision,i.isNegative=e.isNegative,i}function n(i,e){var t=r(i,e);return t.digits=t.digits.slice(0,t.precision),t}function s(i){return i.precision=1,i.digits=[1],i.isNegative=!1,i}function o(i){return i.precision=0,i.digits=[],i.isNegative=!1,i}function a(i,e){return void 0===e&&(e=u.Globals.DEFAULT_IS_MUTABLE),e?i:n({},i)}function c(i,e,t,r){return{base:r,digits:i,precision:e,isNegative:t}}var u=t(5);e.assign=r,e.copy=n,e.setOne=s,e.setZero=o,e.tryMutable=a,e.toInteger=c},function(i,e,t){"use strict";function r(i,e,t){if(e|=0,e<n.Globals.MIN_BASE)throw RangeError(e+" < MIN_BASE ("+n.Globals.MIN_BASE+")");if(e>n.Globals.MAX_BASE)throw RangeError(e+" > MAX_BASE ("+n.Globals.MAX_BASE+")");return i=o.tryMutable(i,t),r=s.setBase(i.digits,0,i.precision,i.base,e),i.digits=r[0],i.precision=r[1],i.base=e,i;var r}var n=t(5),s=t(49),o=t(0);e.setBase=r},function(i,e,t){"use strict";function r(i,e,t,r,n){for(;r<n;)i[e++]=t[r++]}function n(i,e,t){var r=t;if(r>c.Globals.MAX_PRECISION){if(e>c.Globals.MAX_PRECISION)throw new RangeError("Array greater than supported array length");r=e}i.length<r&&(i.length=r)}function s(i,e,t,r,n){return void 0===r&&(r=e),void 0===n&&(n=t),i=i.map(function(i){return null==i||i!==i?i+"":i}),"["+i.slice(e,r).join(", ")+"|"+i.slice(r,n).join(", ")+"|"+i.slice(n,t).join(", ")+"]"}function o(i,e,t,r){for(var n=t+r;t>e;i[--n]=i[--t]);}function a(i,e,t,r){for(var n=e+r;e<t;i[n++]=i[e++]);}var c=t(5);e.copy=r,e.growArray=n,e.printArr=s,e.safeShiftUp=o,e.unsafeShiftUp=a},function(i,e,t){"use strict";function r(i,e){return n.copy(i,e)}var n=t(0);e.copy=r},function(i,e,t){"use strict";function r(i,e){if(i===e)return 0;if(i.isNegative!==e.isNegative)return i.isNegative?-1:1;var t=i.base;if(i.base!==e.base){var r=Math.log(i.base)/Math.log(e.base);if(Math.ceil(i.precision*r)<e.precision)return-1;if(Math.ceil((i.precision-1)*r)>e.precision)return 1;n.setBase(i,e.base,!0)}var o=s.compare(i.digits,0,i.precision,e.digits,0,e.precision);return n.setBase(i,t,!0),o}var n=t(1),s=t(17);e.compare=r},function(i,e,t){"use strict";var r;!function(i){i.MIN_BASE=2,i.MAX_BASE=94906265,i.MAX_PRECISION=4294967295,i.DEFAULT_IS_MUTABLE=!1,i.DEFAULT_BASE=94906264,i.DEFAULT_CIPHER=Object.freeze(["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"])}(r=e.Globals||(e.Globals={}))},function(i,e,t){"use strict";function r(i,e){return i<e?e:i}function n(i,e){return i>e?e:i}function s(i){if(i=i.trim(),1>i.length)throw new TypeError("NaN");var e="-"===i[0];if(i=i.replace(/^[-+]?0*/,"").replace(/\.[0-9]+$/,""),i.match(/[^\d]/))throw new TypeError("NaN");var t=i.length;if(0===t)return[[],!1];for(var r=Array(t),n=0,s=t;0<s;++n)r[n]=0|i[--s];return[r,e]}function o(i,e,t){for(;e<t;)i[e++]=0}e.max=r,e.min=n,e.strToDigits=s,e.zero=o},function(i,e,t){"use strict";function r(i,e,t,r,s,o,a){for(var c,u=e,p=0;s<o;)c=i[u]-p-r[s++],0>c?(p=1,c+=a):p=0,i[u++]=c;if(0<p)return n.decrement(i,u,t,a);if(u===t){for(;u-- >e&&0===i[u];);t=u+1}return t}var n=t(18);e.subtraction=r},function(i,e,t){"use strict";function r(i,e){return i=n.tryMutable(i,e),i.isNegative=0<i.precision&&!i.isNegative,i}var n=t(0);e.negate=r},function(i,e,t){"use strict";function r(i,e,t,r,s,o,a){for(var c,u=0;s<o;)c=i[e]+r[s++]+u,c<a?u=0:(u=1,c-=a),i[e++]=c;return 0<u?n.increment(i,e,t,a):t}var n=t(21);e.addition=r},function(i,e,t){"use strict";function r(i,e,t){if(i=v.tryMutable(i,t),i===e)return s.double(i,!0),i;if(0===e.precision)return i;var r=i.base;return 0===i.precision?(n.copy(i,e),a.setBase(i,r,!0),i):i.isNegative===e.isNegative?(a.setBase(i,e.base,!0),i.precision<e.precision?(f.growArray(i.digits,e.precision,e.precision+1),i.precision=p.reverseAddition(i.digits,0,i.precision,e.digits,0,e.precision,i.base)):i.precision=u.addition(i.digits,0,i.precision,e.digits,0,e.precision,i.base),a.setBase(i,r,!0),i):(o.negate(i,!0),c.subtract(i,e,!0),o.negate(i,!0),i)}var n=t(3),s=t(12),o=t(8),a=t(1),c=t(16),u=t(9),p=t(39),f=t(2),v=t(0);e.add=r},function(i,e,t){"use strict";function r(i,e){return i=o.tryMutable(i,e),i.isNegative?i.precision=s.increment(i.digits,0,i.precision,i.base):0===i.precision?(o.setOne(i),i.isNegative=!0):i.precision=n.decrement(i.digits,0,i.precision,i.base),i}var n=t(18),s=t(21),o=t(0);e.decrement=r},function(i,e,t){"use strict";function r(i,e){return i=s.tryMutable(i,e),i.precision=n.double(i.digits,0,i.precision,i.base),i}var n=t(19),s=t(0);e.double=r},function(i,e,t){"use strict";function r(i){return n.isEven(i.digits,0,i.precision,i.base)}var n=t(37);e.isEven=r},function(i,e,t){"use strict";function r(i){return i.hasOwnProperty("base")&&i.hasOwnProperty("digits")&&i.hasOwnProperty("precision")&&i.hasOwnProperty("isNegative")}e.isInteger=r},function(i,e,t){"use strict";function r(i,e){if(i=a.tryMutable(i,e),0===i.precision)return i;i.isNegative=!1;var t=2*i.precision;return o.growArray(i.digits,t-1,t),i.precision=100>i.precision?s.longSquare(i.digits,0,i.precision,i.base):n.karatsubaSquare(i.digits,0,i.precision,i.base),i}var n=t(38),s=t(47),o=t(2),a=t(0);e.square=r},function(i,e,t){"use strict";function r(i,e,t){if(i=f.tryMutable(i,t),i===e)return f.setZero(i);if(0===e.precision)return i;var r=i.base;if(0===i.precision)return o.copy(i,e),a.negate(i,!0),c.setBase(i,r,!0),i;if(i.isNegative!==e.isNegative)return a.negate(i,!0),n.add(i,e,!0),a.negate(i,!0),i;c.setBase(i,e.base,!0);var v=s.compare(i,e);return 0===v?(i.base=r,f.setZero(i)):(0>v?(a.negate(i,!0),i.digits.length<e.precision&&(i.digits.length=e.precision),i.precision=u.reverseSubtraction(i.digits,0,i.precision,e.digits,0,e.precision,i.base)):i.precision=p.subtraction(i.digits,0,i.precision,e.digits,0,e.precision,i.base),c.setBase(i,r,!0),i)}var n=t(10),s=t(4),o=t(3),a=t(8),c=t(1),u=t(48),p=t(7),f=t(0);e.subtract=r},function(i,e,t){"use strict";function r(i,e,t,r,n,s){var o=t-e-s+n;if(0!==o)return 0>o?-1:1;for(;t>e;)if(i[--t]!==r[--s])return i[t]<r[s]?-1:1;return 0}e.compare=r},function(i,e,t){"use strict";function r(i,e,t,r){for(;0===i[e];i[e++]=r-1);return--i[e],e+1===t&&0===i[e]?t-1:t}e.decrement=r},function(i,e,t){"use strict";function r(i,e,t,r){for(var n,s=0;e<t;)n=(i[e]<<1)+s,n<r?s=0:(s=1,n-=r),i[e++]=n;return 0<s&&(i[e++]=1),e}e.double=r},function(i,e,t){"use strict";function r(i,e,t,r){for(var n=0,s=t;s-- >e;i[s]>>>=1)i[s]+=r&-n,n=1&i[s];return 0===i[t-1]&&--t,[t,n]}e.halve=r},function(i,e,t){"use strict";function r(i,e,t,r){for(--r;e<t&&i[e]===r;i[e++]=0);return e===t?i[t++]=1:++i[e],t}e.increment=r},function(i,e,t){"use strict";function r(i,e,t,u,p,f,v){var g=c.max(t-e,f-p);if(2>g)return g=i[e]*u[p],g<v?i[t]=0:(i[t++]=0|g/v,g%=v),i[e]=g,t;g=g+1>>>1;var d=e+g,l=c.min(d,t),b=c.min(p+g,f),y=Array(b-p+1);a.copy(y,0,u,p,b);var h=n.addition(y,0,b-p,u,b,f,v),m=Array(l-e+1+h);a.copy(m,0,i,e,l);var B=n.addition(m,0,l-e,i,l,t,v);B=r(m,0,B,y,0,h,v),i[t]=0,a.unsafeShiftUp(i,l,t,g);var M=r(i,e,l,u,p,b,v);if(B=o.subtraction(m,0,B,i,e,M,v),l===t||b===f)return M<=d?(t=d+B,c.zero(i,M,d),a.copy(i,d,m,0,B)):t=B>M-d?s.reverseAddition(i,d,M,m,0,B,v):n.addition(i,d,M,m,0,B,v),t;c.zero(i,M,t);var E=l+g;return t=r(i,E,t+g,u,b,f,v),B=o.subtraction(m,0,B,i,E,t,v),t=n.addition(i,d,t,m,0,B,v)}var n=t(9),s=t(39),o=t(7),a=t(2),c=t(6);e.karatsubaMultiplication=r},function(i,e,t){"use strict";function r(i,e){return i=n.tryMutable(i,e),i.isNegative=!1,i}var n=t(0);e.abs=r},function(i,e,t){"use strict";function r(i,e,t){if(0===e.precision)throw new EvalError("Divide by zero");var r=a.tryMutable(i,t);if(i===e)return[a.setOne(r),a.setZero({base:r.base})];if(r.isNegative=r.isNegative!==e.isNegative,0===r.precision||1===e.precision&&1===e.digits[0])return[r,a.setZero({base:r.base})];if(1===r.precision&&1===r.digits[0])return[a.setZero(r),a.setOne({base:r.base})];var c=r.base;if(c!==e.base){var u=Math.log(c)/Math.log(e.base);if(Math.ceil(r.precision*u)<e.precision){var p=a.assign({},r);return[a.setZero(r),p]}n.setBase(r,e.base,!0)}if(r.precision<e.precision){n.setBase(r,c,!0);var p=a.assign({},r);return[a.setZero(r),p]}var f=a.setOne({base:r.base});return 2>e.precision?(v=o.singleDigitDivision(r.digits,0,r.precision,e.digits[0],r.base),r.precision=v[0],f.digits[0]=v[1],0===f.digits[0]&&a.setZero(f)):(g=s.basicDivision(r.digits,0,r.precision,e.digits,0,e.precision,r.base),r.digits=g[0],f.digits=g[1],r.precision=g[2],f.precision=g[3]),n.setBase(r,c,!0),n.setBase(f,c,!0),[r,f];var v,g}var n=t(1),s=t(36),o=t(50),a=t(0);e.divideAndRemainder=r},function(i,e,t){"use strict";function r(i,e,t){var r=c.tryMutable(i,t);if(r.isNegative=!1,i===e||0===e.precision)return r;if(0===r.precision)return s.copy(r,e),r.isNegative=!1,r;var u=r.base;return o.setBase(r,e.base,!0),0!==n.compare(r,e)&&(p=a.steinGCD(r.digits,0,r.precision,e.digits.slice(0,e.precision),0,e.precision,r.base),r.digits=p[0],r.precision=p[2]),o.setBase(r,u,!0);var p}var n=t(4),s=t(3),o=t(1),a=t(41),c=t(0);e.gcd=r},function(i,e,t){"use strict";function r(i,e){var t=o.setZero({base:i.base});return i=o.tryMutable(i,e),0===i.precision?[i,t]:(r=s.halve(i.digits,0,i.precision,i.base),i.precision=r[0],t.precision=r[1],0===t.precision?[i,t]:(i.isNegative&&n.decrement(i,!0),[i,o.setOne(t)]));var r}var n=t(11),s=t(20),o=t(0);e.halve=r},function(i,e,t){"use strict";function r(i,e){return i=o.tryMutable(i,e),i.isNegative?(i.precision=n.decrement(i.digits,0,i.precision,i.base),0===i.precision&&(i.isNegative=!1)):i.precision=s.increment(i.digits,0,i.precision,i.base),i}var n=t(18),s=t(21),o=t(0);e.increment=r},function(i,e,t){"use strict";function r(i,e,t){var r=a.tryMutable(i,t);if(r.isNegative=!1,i===e||0===i.precision||1===e.precision&&1===e.digits[0])return r;if(0===e.precision)return a.setZero(r),r;var c=r.base;return 1===r.precision&&1===r.digits[0]?(n.copy(r,e),r.isNegative=!1):(s.setBase(r,e.base,!0),u=o.lcm(r.digits,0,r.precision,e.digits,0,e.precision,r.base),r.digits=u[0],r.precision=u[1]),s.setBase(r,c,!0),r;var u}var n=t(3),s=t(1),o=t(45),a=t(0);e.lcm=r},function(i,e,t){"use strict";function r(i,e,t){return s.tryMutable(0>n.compare(i,e)?e:i,t)}var n=t(4),s=t(0);e.max=r},function(i,e,t){"use strict";function r(i,e,t){return s.tryMutable(0<n.compare(i,e)?e:i,t)}var n=t(4),s=t(0);e.min=r},function(i,e,t){"use strict";function r(i,e,t){if(i===e)return s.square(i,t);if(i=f.tryMutable(i,t),0===i.precision)return i;if(0===e.precision)return f.setZero(i);i.isNegative=i.isNegative!==e.isNegative;var r=i.base;if(n.setBase(i,e.base,!0),1===e.precision){var v=e.digits[0];2<v?i.precision=u.singleDigitMultiplication(i.digits,0,i.precision,v,i.base):2===v&&(i.precision=o.double(i.digits,0,i.precision,i.base))}else if(1===i.precision){var v=i.digits[0];i.precision=e.precision,i.digits=e.digits.slice(0,e.precision),2<v?i.precision=u.singleDigitMultiplication(i.digits,0,i.precision,v,i.base):2===v&&(i.precision=o.double(i.digits,0,i.precision,i.base))}else{var g=i.precision+e.precision;p.growArray(i.digits,g-1,g),i.precision=100>i.precision&&100>e.precision?c.longMultiplication(i.digits,0,i.precision,e.digits,0,e.precision,i.base):a.karatsubaMultiplication(i.digits,0,i.precision,e.digits,0,e.precision,i.base)}return n.setBase(i,r,!0)}var n=t(1),s=t(15),o=t(19),a=t(22),c=t(46),u=t(40),p=t(2),f=t(0);e.multiply=r},function(i,e,t){"use strict";function r(i,e,t){if(i=a.tryMutable(i,t),0===e.precision)return a.setOne(i);if(e.isNegative){if(0===i.precision)throw new EvalError("Divide by zero");return a.setZero(i)}return 0===i.precision?i:(i.isNegative=i.isNegative&&!n.isEven(e),1===i.precision&&1===i.digits[0]?i:(o.growArray(i.digits,(i.precision-1)*Math.pow(e.base,e.precision-1)+1,i.precision*(Math.pow(e.base,e.precision)-1)),i.precision=s.exponentiation(i.digits,0,i.precision,i.base,e.digits.slice(0,e.precision),0,e.precision,e.base),i))}var n=t(13),s=t(44),o=t(2),a=t(0);e.pow=r},function(i,e,t){"use strict";function r(i){return i.isNegative?-1:0===i.precision?0:1}e.signum=r},function(i,e,t){"use strict";function r(i,e){if(o.isInteger(i))return i;if("number"==typeof i)i=""+i;else if("string"!=typeof i)throw TypeError("Expecting type Integer | string | number");var t=a.setZero({base:10});return r=c.strToDigits(i),t.digits=r[0],t.isNegative=r[1],t.precision=t.digits.length,s.setBase(t,null==e?n.Globals.DEFAULT_BASE:e,!0);var r}var n=t(5),s=t(1),o=t(14),a=t(0),c=t(6);e.toInteger=r},function(i,e,t){"use strict";function r(i){var e=n.Globals.DEFAULT_CIPHER;if(0===i.precision)return e.length<i.base?"0":e[0];var t=i.isNegative?"-":"";if(e.length<i.base)return t+i.digits.slice(0,i.precision).reverse().join(":");for(var r=0,s=i.precision,o=i.digits,a=Array(s);0<s;)a[r++]=e[o[--s]];return t+a.join("")}var n=t(5);e.toString=r},function(i,e,t){"use strict";function r(i,e,t,r,p,f,v){var g=f-p,d=t-e-g,l=Array(d+1);u.zero(l,0,d+1);for(var b=t;0<=s.compare(i,e+d,b,r,p,f);)++l[d],b=a.subtraction(i,e+d,b,r,p,f,v);for(var y=r[f-1],h=r[f-2],m=Array(g+1),B=t-1,M=d;0<M--;--B)if(l[M]=n(i[B],i[B-1],i[B-2],y,h,v),0!==l[M]){c.copy(m,0,r,p,f);var E=o.singleDigitMultiplication(m,0,g,l[M],v);0<s.compare(m,0,E,i,e+M,b)&&(--l[M],E=a.subtraction(m,0,E,r,p,f,v)),b=a.subtraction(i,e+M,b,m,0,E,v)}for(;b>e&&0===i[b-1];)--b;return[l,i,0===l[d]?d:d+1,b]}function n(i,e,t,r,n,s){var o=i*s+e,a=o%r;return o=0|o/r,a=a*s-o*n+t,0>a&&(a=a+r*s+n,o=0>a?o-2:o-1),o}var s=t(17),o=t(40),a=t(7),c=t(2),u=t(6);e.basicDivision=r},function(i,e,t){"use strict";function r(i,e,t,r){if(e===t)return!0;if(0==(1&r))return 0==(1&i[e]);var n=0;do n^=i[e++];while(e<t);return 0==(1&n)}e.isEven=r},function(i,e,t){"use strict";function r(i,e,t,c){var u=t-e;if(2>u)return u=i[e]*i[e],u<c?i[t]=0:(i[t++]=0|u/c,u%=c),i[e]=u,t;u=u+1>>>1;var p=e+u,f=Array(2*u+2);o.copy(f,0,i,e,p);var v=n.addition(f,0,u,i,p,t,c);i[t]=0,o.unsafeShiftUp(i,p,t,u);var g=r(i,e,p,c);a.zero(i,g,t);var d=p+u;return t=r(i,d,t+u,c),v=r(f,0,v,c),v=s.subtraction(f,0,v,i,e,g,c),v=s.subtraction(f,0,v,i,d,t,c),n.addition(i,p,t,f,0,v,c)}var n=t(9),s=t(7),o=t(2),a=t(6);e.karatsubaSquare=r},function(i,e,t){"use strict";function r(i,e,t,r,s,o,a){for(var c=s-e+t,u=c;u<o;i[t++]=r[u++]);return n.addition(i,e,t,r,s,c,a)}var n=t(9);e.reverseAddition=r},function(i,e,t){"use strict";function r(i,e,t,r,n){for(var s,o=0;e<t;)s=i[e]*r+o,s<n?o=0:(o=0|s/n,s%=n),i[e++]=s;return 0<o&&(i[e++]=o),e}e.singleDigitMultiplication=r},function(i,e,t){"use strict";function r(i,e,t,r,u,p,f){for(var v=0;a.isEven(i,e,t,f)&&a.isEven(r,u,p,f);)t=o.halve(i,e,t,f)[0],p=o.halve(r,u,p,f)[0],++v;for(;a.isEven(i,e,t,f);)t=o.halve(i,e,t,f)[0];for(;a.isEven(r,u,p,f);)p=o.halve(r,u,p,f)[0];for(var g;0!==(g=n.compare(i,e,t,r,u,p));){if(0<g){var d=i;i=r,r=d,g=e,e=u,u=g,g=t,t=p,p=g}p=c.subtraction(r,u,p,i,e,t,f);do p=o.halve(r,u,p,f)[0];while(a.isEven(r,u,p,f))}for(;0<v--;)t=s.double(i,e,t,f);return[i,e,t]}var n=t(17),s=t(19),o=t(20),a=t(37),c=t(7);e.steinGCD=r},function(i,e,t){"use strict";function r(i){return n.copy({},i)}var n=t(3);e.clone=r},function(i,e,t){"use strict";var r=t(23),n=t(10),s=t(4),o=t(3),a=t(11),c=t(24),u=t(12),p=t(25),f=t(26),v=t(27),g=t(13),d=t(28),l=t(29),b=t(30),y=t(31),h=t(8),m=t(32),B=t(33),M=t(1),E=t(16),N=t(15),A=t(14),I=t(34),w=t(35),S=t(0),O=function(){function i(i){A.isInteger(i)?o.copy(this,i):S.assign(this,I.toInteger(i))}return Object.defineProperty(i,"MINUS_ONE",{get:function(){return new i(-1)},enumerable:!0,configurable:!0}),Object.defineProperty(i,"ZERO",{get:function(){return new i(0)},enumerable:!0,configurable:!0}),Object.defineProperty(i,"ONE",{get:function(){return new i(1)},enumerable:!0,configurable:!0}),i.prototype.abs=function(e){return i.tryBigInt(r.abs(this,e))},i.prototype.add=function(e,t){return i.tryBigInt(n.add(this,e,t))},i.prototype.clone=function(){return new i(this)},i.prototype.compareTo=function(i){return s.compare(this,i)},i.prototype.set=function(i){return o.copy(this,i)},i.prototype.divide=function(i,e){return this.divideAndRemainder(i,e)[0]},i.prototype.divideAndRemainder=function(e,t){var r=c.divideAndRemainder(this,e,t),n=r[0],s=r[1];return[i.tryBigInt(n),S.assign(i.ZERO,s)]},i.prototype.double=function(e){return i.tryBigInt(u.double(this,e))},i.prototype.gcd=function(e,t){return i.tryBigInt(p.gcd(this,e,t))},i.prototype.getBase=function(){return this.base},i.prototype.halve=function(e){var t=f.halve(this,e),r=t[0],n=t[1];return[i.tryBigInt(r),new i(n.precision)]},i.isBigInt=function(e){return e instanceof i},i.prototype.isEven=function(){return g.isEven(this)},i.prototype.isOdd=function(){return!g.isEven(this)},i.prototype.lcm=function(e,t){return i.tryBigInt(d.lcm(this,e,t))},i.max=function(e,t,r){return i.tryBigInt(l.max(e,t,r))},i.prototype.max=function(e,t){var r=l.max(this,e,t);return r===this?this:r===e?o.copy(this,r):S.assign(i.ZERO,r)},i.min=function(e,t,r){return i.tryBigInt(b.min(e,t,r))},i.prototype.min=function(e,t){var r=b.min(this,e,t);return r===this?this:r===e?o.copy(this,r):S.assign(i.ZERO,r)},i.prototype.minusminus=function(e){return i.tryBigInt(a.decrement(this,e))},i.prototype.multiply=function(e,t){return i.tryBigInt(y.multiply(this,e,t))},i.prototype.negate=function(e){return i.tryBigInt(h.negate(this,e))},i.prototype.plusplus=function(e){return i.tryBigInt(v.increment(this,e))},i.prototype.pow=function(e,t){return i.tryBigInt(m.pow(this,e,t))},i.prototype.remainder=function(i,e){var t=this.divideAndRemainder(i,e)[1];return e?S.assign(this,t):t},i.prototype.setBase=function(e,t){return i.tryBigInt(M.setBase(this,e,t))},i.prototype.signum=function(){return B.signum(this)},i.prototype.square=function(e){return i.tryBigInt(N.square(this,e))},i.prototype.subtract=function(e,t){return i.tryBigInt(E.subtract(this,e,t))},i.prototype.toString=function(){return w.toString(this)},i.tryBigInt=function(e){return i.isBigInt(e)?e:S.assign(i.ZERO,e)},i}();e.BigInt=O},function(i,e,t){"use strict";function r(i,e,t,r,a,c,u,p){for(var f,v=1,g=[1];c+1<u||1<a[c];)f=void 0,d=n.halve(a,c,u,p),u=d[0],f=d[1],0<f&&(g.length=v-e+t,v=o.karatsubaMultiplication(g,0,v,i,e,t,r)),t=s.karatsubaSquare(i,e,t,r);return 1<g.length&&(t=o.karatsubaMultiplication(i,e,t,g,0,v,r)),t;var d}var n=t(20),s=t(38),o=t(22);e.exponentiation=r},function(i,e,t){"use strict";function r(i,e,t,r,a,c,u){var p=i.slice(e,t),f=p.length,v=r.slice(a,c),g=v.length;return d=o.steinGCD(p,0,f,v,0,g,u),p=d[0],f=d[2],l=n.basicDivision(i,e,t,p,0,f,u),p=l[0],f=l[2],f=s.karatsubaMultiplication(p,0,f,r,a,c,u),[p,f];var d,l}var n=t(36),s=t(22),o=t(41);e.lcm=r},function(i,e,t){"use strict";function r(i,e,t,r,o,a,c){var u=a-o,p=e+u;n.safeShiftUp(i,e,t,u),s.zero(i,e,p);for(var f=t+u,v=p;v<f;++v){for(var g,d=0,l=v-u,b=o;b<a;++b)g=i[v]*r[b]+i[l]+d,g<c?d=0:(d=0|g/c,g%=c),i[l++]=g;i[l]=d}return 0===i[f-1]?f-1:f}var n=t(2),s=t(6);e.longMultiplication=r},function(i,e,t){"use strict";function r(i,e,t,r){var o=t-e;n.unsafeShiftUp(i,e,t,o),s.zero(i,e,t),o+=t;for(var a=e,c=t;a<o;a+=2){var u=i[c++],p=0;i[a]+=u*u,i[a]>=r&&(p=0|i[a]/r,i[a]%=r);for(var f=a+1,v=c;v<o;++f){var g=0,d=i[v++]*u;d>=r&&(g=0|d/r,d%=r),g<<=1,d<<=1,i[f]=i[f]+d+p,p=g,i[f]>=r&&(p+=0|i[f]/r,i[f]%=r)}i[f]=p}return 0===i[o-1]?o-1:o}var n=t(2),s=t(6);e.longSquare=r},function(i,e,t){"use strict";function r(i,e,t,r,n,s,o){for(var a,c=0;e<t;)a=r[n++]-c-i[e],0>a?(c=1,a+=o):c=0,i[e++]=a;if(0<c){for(c=o-1;0===r[n];++n)i[e++]=c;i[e++]=r[n++]-1}if(n<s){do i[e++]=r[n++];while(n<s)}else for(;0===i[e-1];)--e;return e}e.reverseSubtraction=r},function(i,e,t){"use strict";function r(i,e,t,r,n){if(t===e||r===n)return[i,t];for(var s=0,o=Array(Math.ceil((t-e)*Math.log(r)/Math.log(n)));;){for(var a=0,c=t;c>e;a%=n)a=a*r+i[--c],i[c]=0|a/n;for(o[s++]=a;0===i[t-1];)if(--t===e)return[o,s]}}e.setBase=r},function(i,e,t){"use strict";function r(i,e,t,r,n){for(var s=0,o=t;o-- >e;s%=r)s=s*n+i[o],i[o]=0|s/r;return 0===i[t-1]&&--t,[t,s]}e.singleDigitDivision=r},function(i,e,t){"use strict";var r=t(5);e.__globals__=r.Globals;var n=t(23);e.abs=n.abs;var s=t(10);e.add=s.add;var o=t(42);e.clone=o.clone;var a=t(4);e.compare=a.compare;var c=t(3);e.copy=c.copy;var u=t(11);e.decrement=u.decrement;var p=t(24);e.divideAndRemainder=p.divideAndRemainder;var f=t(12);e.double=f.double;var v=t(25);e.gcd=v.gcd;var g=t(26);e.halve=g.halve;var d=t(27);e.increment=d.increment;var l=t(13);e.isEven=l.isEven;var b=t(14);e.isInteger=b.isInteger;var y=t(28);e.lcm=y.lcm;var h=t(29);e.max=h.max;var m=t(30);e.min=m.min;var B=t(31);e.multiply=B.multiply;var M=t(8);e.negate=M.negate;var E=t(32);e.pow=E.pow;var N=t(1);e.setBase=N.setBase;var A=t(33);e.signum=A.signum;var I=t(15);e.square=I.square;var w=t(16);e.subtract=w.subtract;var S=t(34);e.toInteger=S.toInteger;var O=t(35);e.toString=O.toString;var _=t(43);e.Int=_.BigInt}])});