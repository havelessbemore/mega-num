!function(i,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Big=t():i.Big=t()}(this,function(){return function(i){function t(r){if(e[r])return e[r].exports;var n=e[r]={exports:{},id:r,loaded:!1};return i[r].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var e={};return t.m=i,t.c=e,t.p="",t(0)}([function(i,t,e){"use strict";var r=e(51);t.Int=r.BigInt},function(i,t,e){"use strict";function r(i,t){return e=o.setBase(i.digits,0,i.precision,i.base,t),i.digits=e[0],i.precision=e[1],i.base=t,i;var e}function n(i){return i.precision=1,i.digits=[1],i.isNegative=!1,i}function s(i){return i.precision=0,i.digits=[],i.isNegative=!1,i}var o=e(36);t.changeBase=r,t.setOne=n,t.setZero=s},function(i,t){"use strict";function e(i,t,e,r){for(var n=t+r;t<e;i[n++]=i[t++]);}function r(i,t,e,r){for(var n=e+r;e>t;i[--n]=i[--e]);}function n(i,t,e,r,n){for(;r<n;)i[t++]=e[r++]}function s(i,t,e,r){for(;t<e;)i[t++]=r}function o(i,t,e,r,n){function s(i){return i.forEach(function(i,t,e){(null==i||i!==i)&&(e[t]=i+"")}),i}return void 0===r&&(r=t),void 0===n&&(n=e),"["+s(i.slice(t,r)).join(", ")+"|"+s(i.slice(r,n)).join(", ")+"|"+s(i.slice(n,e)).join(", ")+"]"}t.unsafeShiftUp=e,t.safeShiftUp=r,t.copy=n,t.set=s,t.printArr=o},function(i,t,e){"use strict";function r(i,t){return n.assign(i,t),i.digits=i.digits.slice(0,i.precision),i}var n=e(13);t.copy=r},function(i,t,e){"use strict";function r(i,t,e,r,s,o,c){for(var a=t,u=0;s<o;){var f=i[a]-u-r[s++];0>f?(u=1,f+=c):u=0,i[a++]=f}if(0<u)return n.decrement(i,a,e,c);if(a===e){for(;a-- >t&&0===i[a];);e=a+1}return e}var n=e(9);t.subtraction=r},function(i,t,e){"use strict";function r(i,t,e,r,s,o,c){for(var a=0;s<o;){var u=i[t]+r[s++]+a;u<c?a=0:(a=1,u-=c),i[t++]=u}return 0<a?n.increment(i,t,e,c):e}var n=e(11);t.addition=r},function(i,t){"use strict";t.MIN_BASE=2,t.MAX_BASE=94906265,t.DEFAULT_BASE=94906264,t.MAX_PRECISION=4294967295,t.CIPHER=Object.freeze(["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"])},function(i,t,e){"use strict";function r(i,t){if(i===t)return 0;if(i.isNegative!==t.isNegative)return i.isNegative?-1:1;if(i.base!==t.base){var e=Math.log(i.base)/Math.log(t.base);if(Math.ceil(i.precision*e)>t.base)return 1;if(Math.ceil((i.precision+1)*e)<t.precision)return-1}var r=i.base;n.changeBase(i,t.base);var o=s.compare(i.digits,0,i.precision,t.digits,0,t.precision);return n.changeBase(i,r),o}var n=e(1),s=e(8);t.compare=r},function(i,t){"use strict";function e(i,t,e,r,n,s){var o=e-t-s+n;if(0!==o)return 0>o?-1:1;for(;e>t;)if(i[--e]!==r[--s])return i[e]<r[s]?-1:1;return 0}t.compare=e},function(i,t){"use strict";function e(i,t,e,r){for(;0===i[t];i[t++]=r-1);return--i[t],t+1===e&&0===i[t]?e-1:e}t.decrement=e},function(i,t){"use strict";function e(i,t,e,r){for(var n=0,s=e;s-- >t;i[s]>>>=1)i[s]+=r&-n,n=1&i[s];return 0===i[e-1]&&--e,[e,n]}t.halve=e},function(i,t){"use strict";function e(i,t,e,r){for(--r;t<e&&i[t]===r;i[t++]=0);return t===e?i[e++]=1:++i[t],e}t.increment=e},function(i,t,e){"use strict";function r(i,t,e,u,f,p,g){var v=c.max(e-t,p-f);if(2>v)return v=i[t]*u[f],v<g?i[e]=0:(i[e++]=0|v/g,v%=g),i[t]=v,e;v=v+1>>>1;var d=t+v,h=c.min(d,e),l=c.min(f+v,p),b=Array(l-f+1);a.copy(b,0,u,f,l);var y=n.addition(b,0,l-f,u,l,p,g),m=Array(h-t+1+y);a.copy(m,0,i,t,h);var E=n.addition(m,0,h-t,i,h,e,g);E=r(m,0,E,b,0,y,g),i[e]=0,a.unsafeShiftUp(i,h,e,v);var B=r(i,t,h,u,f,l,g);if(E=o.subtraction(m,0,E,i,t,B,g),h===e||l===p)return B<=d?(e=d+E,a.set(i,B,d,0),a.copy(i,d,m,0,E)):e=E>B-d?s.reverseAddition(i,d,B,m,0,E,g):n.addition(i,d,B,m,0,E,g),e;a.set(i,B,e,0);var N=h+v;return e=r(i,N,e+v,u,l,p,g),E=o.subtraction(m,0,E,i,N,e,g),e=n.addition(i,d,e,m,0,E,g)}var n=e(5),s=e(19),o=e(4),c=e(30),a=e(2);t.karatsubaMultiplication=r},function(i,t){"use strict";function e(i,t){return i.base=t.base,i.digits=t.digits,i.precision=t.precision,i.isNegative=t.isNegative,i}t.assign=e},function(i,t){"use strict";function e(i){return 0<i.precision&&(i.isNegative=!i.isNegative),i}t.negate=e},function(i,t,e){"use strict";function r(i,t,e,r,u,f,p){var g=f-u,v=e-t-g,d=Array(v+1);a.set(d,0,v+1,0);for(var h=e;0<=s.compare(i,t+v,h,r,u,f);)++d[v],h=c.subtraction(i,t+v,h,r,u,f,p);for(var l=r[f-1],b=r[f-2],y=Array(g+1),m=e-1,E=v;0<E--;--m)if(d[E]=n(i[m],i[m-1],i[m-2],l,b,p),0!==d[E]){a.copy(y,0,r,u,f);var B=o.singleDigitMultiplication(y,0,g,d[E],p);0<s.compare(y,0,B,i,t+E,h)&&(--d[E],B=c.subtraction(y,0,B,r,u,f,p)),h=c.subtraction(i,t+E,h,y,0,B,p)}for(;h>t&&0===i[h-1];)--h;return[d,i,0===d[v]?v:v+1,h]}function n(i,t,e,r,n,s){var o=i*s+t,c=o%r;return o=0|o/r,c=c*s-o*n+e,0>c&&(c=c+r*s+n,o=0>c?o-2:o-1),o}var s=e(8),o=e(20),c=e(4),a=e(2);t.basicDivision=r},function(i,t){"use strict";function e(i,t,e,r){for(var n=0;t<e;){var s=(i[t]<<1)+n;s<r?n=0:(n=1,s-=r),i[t++]=s}return 0<n&&(i[t++]=1),t}t.double=e},function(i,t){"use strict";function e(i,t,e,r){if(t===e)return!0;if(0==(1&r))return 0==(1&i[t]);for(var n=0;t<e;)n^=i[t++];return 0==(1&n)}t.isEven=e},function(i,t,e){"use strict";function r(i,t,e,c){var a=e-t;if(2>a)return a=i[t]*i[t],a<c?i[e]=0:(i[e++]=0|a/c,a%=c),i[t]=a,e;a=a+1>>>1;var u=t+a,f=Array(2*a+2);o.copy(f,0,i,t,u);var p=n.addition(f,0,a,i,u,e,c);i[e]=0,o.unsafeShiftUp(i,u,e,a);var g=r(i,t,u,c);o.set(i,g,e,0);var v=u+a;return e=r(i,v,e+a,c),p=r(f,0,p,c),p=s.subtraction(f,0,p,i,t,g,c),p=s.subtraction(f,0,p,i,v,e,c),n.addition(i,u,e,f,0,p,c)}var n=e(5),s=e(4),o=e(2);t.karatsubaSquare=r},function(i,t,e){"use strict";function r(i,t,e,r,s,o,c){for(var a=s-t+e,u=a;u<o;i[e++]=r[u++]);return n.addition(i,t,e,r,s,a,c)}var n=e(5);t.reverseAddition=r},function(i,t){"use strict";function e(i,t,e,r,n){for(var s=0;t<e;){var o=i[t]*r+s;o<n?s=0:(s=0|o/n,o%=n),i[t++]=o}return 0<s&&(i[t++]=s),t}t.singleDigitMultiplication=e},function(i,t,e){"use strict";function r(i,t,e,r,u,f,p){for(var g=0;c.isEven(i,t,e,p)&&c.isEven(r,u,f,p);)e=o.halve(i,t,e,p)[0],f=o.halve(r,u,f,p)[0],++g;for(;c.isEven(i,t,e,p);)e=o.halve(i,t,e,p)[0];for(;;){for(;c.isEven(r,u,f,p);)f=o.halve(r,u,f,p)[0];var v=n.compare(i,t,e,r,u,f);if(0===v)break;if(0<v){var d=i;i=r,r=d,v=t,t=u,u=v,v=e,e=f,f=v}f=a.subtraction(r,u,f,i,t,e,p),f=o.halve(r,u,f,p)[0]}for(;0<g--;)e=s.double(i,t,e,p);return[i,t,e]}var n=e(8),s=e(16),o=e(10),c=e(17),a=e(4);t.steinGCD=r},function(i,t,e){"use strict";function r(i,t){if(i===t)return s.double(i);if(0===t.precision)return i;var e=i.base;return 0===i.precision?(n.copy(i,t),f.changeBase(i,e)):(f.changeBase(i,t.base),i.isNegative===t.isNegative?i.precision<t.precision?(i.digits.length<=t.precision&&(i.digits.length=t.precision+1),i.precision=u.reverseAddition(i.digits,0,i.precision,t.digits,0,t.precision,i.base)):i.precision=a.addition(i.digits,0,i.precision,t.digits,0,t.precision,i.base):(o.negate(i),c.subtract(i,t),o.negate(i)),f.changeBase(i,e))}var n=e(3),s=e(24),o=e(14),c=e(29),a=e(5),u=e(19),f=e(1);t.add=r},function(i,t,e){"use strict";function r(i){return i.isNegative?i.precision=s.increment(i.digits,0,i.precision,i.base):0===i.precision?(o.setOne(i),i.isNegative=!0):i.precision=n.decrement(i.digits,0,i.precision,i.base),i}var n=e(9),s=e(11),o=e(1);t.decrement=r},function(i,t,e){"use strict";function r(i){return i.precision=n.double(i.digits,0,i.precision,i.base),i}var n=e(16);t.double=r},function(i,t,e){"use strict";function r(i){return n.isEven(i.digits,0,i.precision,i.base)}var n=e(17);t.isEven=r},function(i,t){"use strict";function e(i){return i.hasOwnProperty("base")&&i.hasOwnProperty("digits")&&i.hasOwnProperty("precision")&&i.hasOwnProperty("isNegative")}t.isInteger=e},function(i,t,e){"use strict";function r(i,t){if(t|=0,i.base===t)return i;if(t<n.MIN_BASE)throw RangeError(t+" < MIN_BASE ("+n.MIN_BASE+")");if(t>n.MAX_BASE)throw RangeError(t+" > MAX_BASE ("+n.MAX_BASE+")");return s.changeBase(i,t)}var n=e(6),s=e(1);t.setBase=r},function(i,t,e){"use strict";function r(i){if(0===i.precision)return i;i.isNegative=!1;var t=2*i.precision;return i.digits.length<t&&(i.digits.length=t),i.precision=500>i.precision?s.longSquare(i.digits,0,i.precision,i.base):n.karatsubaSquare(i.digits,0,i.precision,i.base),i}var n=e(18),s=e(34);t.square=r},function(i,t,e){"use strict";function r(i,t){if(i===t)return f.setZero(i);if(0===t.precision)return i;var e=i.base;if(0===i.precision)return o.copy(i,t),c.negate(i),f.changeBase(i,e);if(i.isNegative!==t.isNegative)return c.negate(i),n.add(i,t),c.negate(i);f.changeBase(i,t.base);var r=s.compare(i,t);return 0===r?(i.base=e,f.setZero(i)):(0>r?(c.negate(i),i.digits.length<t.precision&&(i.digits.length=t.precision),i.precision=a.reverseSubtraction(i.digits,0,i.precision,t.digits,0,t.precision,i.base)):i.precision=u.subtraction(i.digits,0,i.precision,t.digits,0,t.precision,i.base),f.changeBase(i,e))}var n=e(22),s=e(7),o=e(3),c=e(14),a=e(35),u=e(4),f=e(1);t.subtract=r},function(i,t){"use strict";function e(i,t){return i<t?t:i}function r(i,t){return i>t?t:i}function n(i){if(i=i.trim(),1>i.length)throw new TypeError("NaN");var t="-"===i[0];if(i=i.replace(/^[-+]?0*/,"").replace(/\.[0-9]+$/,""),i.match(/[^\d]/))throw new TypeError("NaN");var e=i.length;if(0===e)return[[],!1];for(var r=Array(e),n=0,s=e;0<s;++n)r[n]=0|i[--s];return[r,t]}t.max=e,t.min=r,t.strToDigits=n},function(i,t,e){"use strict";function r(i,t,e,r,c,a,u,f){for(var p=1,g=[1];a+1<u||1<c[a];){var v=void 0;d=n.halve(c,a,u,f),u=d[0],v=d[1],0<v&&(g.length=p+e,p=o.karatsubaMultiplication(g,0,p,i,t,e,r)),e=s.karatsubaSquare(i,t,e,r)}return 1<g.length&&(e=o.karatsubaMultiplication(i,t,e,g,0,p,r)),e;var d}var n=e(10),s=e(18),o=e(12);t.exponentiation=r},function(i,t,e){"use strict";function r(i,t,e,r,a,u,f){var p=e-t,g=Array(p);s.copy(g,0,i,t,e);var v=u-a,d=Array(v);return s.copy(d,0,r,a,u),h=c.steinGCD(g,0,p,d,0,v,f),g=h[0],p=h[2],l=n.basicDivision(i,t,e,g,0,p,f),g=l[0],p=l[2],p=o.karatsubaMultiplication(g,0,p,r,a,u,f),[g,p];var h,l}var n=e(15),s=e(2),o=e(12),c=e(21);t.lcm=r},function(i,t,e){"use strict";function r(i,t,e,r,o,c,a){var u=c-o,f=t+u;s.safeShiftUp(i,t,e,u),n.set(i,t,f,0);for(var p=e+u,g=f;g<p;++g){for(var v=0,d=g-u,h=o;h<c;++h){var l=i[g]*r[h]+i[d]+v;l<a?v=0:(v=0|l/a,l%=a),i[d++]=l}i[d]=v}return 0===i[p-1]?p-1:p}var n=e(2),s=e(2);t.longMultiplication=r},function(i,t,e){"use strict";function r(i,t,e,r){var o=e-t;s.unsafeShiftUp(i,t,e,o),n.set(i,t,e,0),o+=e;for(var c=t,a=e;c<o;c+=2){var u=i[a++],f=0;i[c]+=u*u,i[c]>=r&&(f=0|i[c]/r,i[c]%=r);for(var p=c+1,g=a;g<o;++p){var v=0,d=i[g++]*u;d>=r&&(v=0|d/r,d%=r),v<<=1,d<<=1,i[p]=i[p]+d+f,f=v,i[p]>=r&&(f+=0|i[p]/r,i[p]%=r)}i[p]=f}return 0===i[o-1]?o-1:o}var n=e(2),s=e(2);t.longSquare=r},function(i,t){"use strict";function e(i,t,e,r,n,s,o){for(var c=0;t<e;){var a=r[n++]-c-i[t];0>a?(c=1,a+=o):c=0,i[t++]=a}if(0<c){for(c=o-1;0===r[n];++n)i[t++]=c;i[t++]=r[n++]-1}if(n<s){do i[t++]=r[n++];while(n<s)}else for(;0===i[t-1];)--t;return t}t.reverseSubtraction=e},function(i,t){"use strict";function e(i,t,e,r,n){if(e===t||r===n)return[i,e];for(var s=0,o=Array(Math.ceil((e-t)*Math.log(r)/Math.log(n)));;){for(var c=0,a=e;a>t;c%=n)c=c*r+i[--a],i[a]=0|c/n;for(o[s++]=c;0===i[e-1];)if(--e===t)return[o,s]}}t.setBase=e},function(i,t){"use strict";function e(i,t,e,r,n){for(var s=0,o=e;o-- >t;s%=r)s=s*n+i[o],i[o]=0|s/r;return 0===i[e-1]&&--e,[e,s]}t.singleDigitDivision=e},function(i,t){"use strict";function e(i){return i.isNegative=!1,i}t.abs=e},function(i,t,e){"use strict";function r(i,t){if(0===t.precision)throw new EvalError("Divide by zero");if(i===t)return[c.setOne(i),c.setZero({base:i.base})];if(0===i.precision)return[i,c.setZero({base:i.base})];if(i.isNegative=i.isNegative!==t.isNegative,1===t.precision&&1===t.digits[0])return[i,c.setZero({base:i.base})];if(1===i.precision&&1===i.digits[0])return[c.setZero(i),c.setOne({base:i.base})];var e=i.base;if(e!==t.base){var r=Math.log(t.base)/Math.log(e);if(i.precision<Math.ceil(t.precision*r)){var a=n.assign({},i);return[c.setZero(i),a]}c.changeBase(i,t.base)}if(i.precision<t.precision){c.changeBase(i,e);var a=n.assign({},i);return[c.setZero(i),a]}var u=c.setOne({base:i.base});return 2>t.precision?(f=o.singleDigitDivision(i.digits,0,i.precision,t.digits[0],i.base),i.precision=f[0],u.digits[0]=f[1]):(p=s.basicDivision(i.digits,0,i.precision,t.digits,0,t.precision,i.base),i.digits=p[0],u.digits=p[1],i.precision=p[2],u.precision=p[3]),c.changeBase(i,e),c.changeBase(u,e),[i,u];var f,p}var n=e(13),s=e(15),o=e(37),c=e(1);t.divideAndRemainder=r},function(i,t,e){"use strict";function r(i,t){if(i.isNegative=!1,i===t||0===t.precision)return i;var e=i.base;return 0===i.precision?(n.copy(i,t),i.isNegative=!1):(o.changeBase(i,t.base),r=s.steinGCD(i.digits,0,i.precision,t.digits,0,t.precision,i.base),i.digits=r[0],i.precision=r[2]),o.changeBase(i,e);var r}var n=e(3),s=e(21),o=e(1);t.gcd=r},function(i,t,e){"use strict";function r(i){var t={base:i.base};return 0===i.precision?[i,o.setZero(t)]:(e=s.halve(i.digits,0,i.precision,i.base),i.precision=e[0],t.precision=e[1],0===t.precision?[i,o.setZero(t)]:(i.isNegative&&n.decrement(i),[i,o.setOne(t)]));var e}var n=e(23),s=e(10),o=e(1);t.halve=r},function(i,t,e){"use strict";function r(i){return i.isNegative?(i.precision=n.decrement(i.digits,0,i.precision,i.base),0===i.precision&&(i.isNegative=!1)):i.precision=s.increment(i.digits,0,i.precision,i.base),i}var n=e(9),s=e(11);t.increment=r},function(i,t,e){"use strict";function r(i,t){if(i.isNegative=!1,i===t||0===i.precision||1===t.precision&&1===t.digits[0])return i;if(0===t.precision)return o.setZero(i);var e=i.base;return 1===i.precision&&1===i.digits[0]?(n.copy(i,t),i.isNegative=!1):(o.changeBase(i,t.base),r=s.lcm(i.digits,0,i.precision,t.digits,0,t.precision,i.base),i.digits=r[0],i.precision=r[1]),o.changeBase(i,e);var r}var n=e(3),s=e(32),o=e(1);t.lcm=r},function(i,t,e){"use strict";function r(i,t){return 0>n.compare(i,t)?t:i}var n=e(7);t.max=r},function(i,t,e){"use strict";function r(i,t){return 0<n.compare(i,t)?t:i}var n=e(7);t.min=r},function(i,t,e){"use strict";function r(i,t){if(i===t)return n.square(i);if(0===i.precision)return i;if(0===t.precision)return a.setZero(i);i.isNegative=i.isNegative!==t.isNegative;var e=i.base;if(a.changeBase(i,t.base),1===t.precision)return i.precision=c.singleDigitMultiplication(i.digits,0,i.precision,t.digits[0],i.base),a.changeBase(i,e);if(1===i.precision){var r=i.digits[0];return i.digits=t.digits.slice(0),i.precision=c.singleDigitMultiplication(i.digits,0,t.precision,r,i.base),a.changeBase(i,e)}var u=i.precision+t.precision;return i.digits.length<u&&(i.digits.length=u),i.precision=100>i.precision&&100>t.precision?o.longMultiplication(i.digits,0,i.precision,t.digits,0,t.precision,i.base):s.karatsubaMultiplication(i.digits,0,i.precision,t.digits,0,t.precision,i.base),a.changeBase(i,e)}var n=e(28),s=e(12),o=e(33),c=e(20),a=e(1);t.multiply=r},function(i,t,e){"use strict";function r(i,t){if(0===t.precision)return c.setOne(i);if(t.isNegative){if(0===i.precision)throw new EvalError("Divide by zero");return c.setZero(i)}return 0===i.precision?i:(i.isNegative&&s.isEven(t)&&(i.isNegative=!1),1===i.precision&&1===i.digits[0]?i:(t=n.copy({},t),i.precision=o.exponentiation(i.digits,0,i.precision,i.base,t.digits,0,t.precision,t.base),i))}var n=e(3),s=e(25),o=e(31),c=e(1);t.pow=r},function(i,t){"use strict";function e(i){return i.isNegative?-1:0===i.precision?0:1}t.signum=e},function(i,t,e){"use strict";function r(i,t){if(void 0===t&&(t=n.DEFAULT_BASE),o.isInteger(i))return i;if("number"==typeof i)i=""+i;else if("string"!=typeof i)throw TypeError("Expecting type Integer | string | number");var e=c.setZero({base:10});return r=a.strToDigits(i),e.digits=r[0],e.isNegative=r[1],e.precision=e.digits.length,s.setBase(e,t),e;var r}var n=e(6),s=e(27),o=e(26),c=e(1),a=e(30);t.toInteger=r},function(i,t,e){"use strict";function r(i,t,e){void 0===t&&(t=null),void 0===e&&(e=null);var r=i.isNegative?"-":"";if(null==e){if(n.CIPHER.length<i.base)return t=null==t?":":t,r+i.digits.slice(0).reverse().join(t);e=n.CIPHER}return t=null==t?"":t,r+i.digits.map(function(i){return e[i]}).reverse().join(t)}var n=e(6);t.toString=r},function(i,t,e){"use strict";var r=e(6),n=e(38),s=e(22),o=e(13),c=e(7),a=e(3),u=e(23),f=e(39),p=e(24),g=e(40),v=e(41),d=e(42),h=e(25),l=e(26),b=e(43),y=e(44),m=e(45),E=e(46),B=e(14),N=e(47),A=e(48),M=e(27),S=e(29),I=e(28),O=e(49),w=e(50),D=function(){function i(t){l.isInteger(t)?this.copy(t):o.assign(this,O.toInteger(t,i.DEFAULT_BASE)),this.digits.length=this.precision}return Object.defineProperty(i,"MINUS_ONE",{get:function(){return new i(-1)},enumerable:!0,configurable:!0}),Object.defineProperty(i,"ZERO",{get:function(){return new i(0)},enumerable:!0,configurable:!0}),Object.defineProperty(i,"ONE",{get:function(){return new i(1)},enumerable:!0,configurable:!0}),i.prototype.abs=function(){return n.abs(this),this},i.prototype.add=function(i){return s.add(this,i),this.digits.length=this.precision,this},i.prototype.clone=function(){return new i(this)},i.prototype.compareTo=function(i){return c.compare(this,i)},i.prototype.copy=function(i){return a.copy(this,i),this},i.prototype.divide=function(i){return this.divideAndRemainder(i),this},i.prototype.divideAndRemainder=function(t){var e,r;return n=f.divideAndRemainder(this,t),e=n[0],r=n[1],e.digits.length=e.precision,r.digits.length=r.precision,[o.assign(this,e),o.assign(i.ZERO,r)];var n},i.prototype.double=function(){return p.double(this),this},i.prototype.gcd=function(i){return g.gcd(this,i),this.digits.length=this.precision,this},i.prototype.getBase=function(){return this.base},i.prototype.half=function(){var t;return e=v.halve(this),t=e[1],this.digits.length=this.precision,[this,0===t.precision?i.ZERO:i.ONE];var e},i.isBigInt=function(t){return t instanceof i},i.prototype.isEven=function(){return h.isEven(this)},i.prototype.isOdd=function(){return!this.isEven()},i.prototype.lcm=function(i){return b.lcm(this,i),this.digits.length=this.precision,this},i.max=function(t,e){return i.toBigInt(y.max(t,e))},i.min=function(t,e){return i.toBigInt(m.min(t,e))},i.prototype.minusminus=function(){return u.decrement(this),this.digits.length=this.precision,this},i.prototype.multiply=function(i){return E.multiply(this,i),this.digits.length=this.precision,this},i.prototype.negate=function(){return B.negate(this),this},i.prototype.plusplus=function(){return d.increment(this),this},i.prototype.pow=function(i){return N.pow(this,i),this.digits.length=this.precision,this},i.prototype.remainder=function(i){return o.assign(this,this.divideAndRemainder(i)[1]),this},i.prototype.setBase=function(i){return M.setBase(this,i),this.digits.length=this.precision,this},i.prototype.signum=function(){return A.signum(this)},i.prototype.square=function(){return I.square(this),this.digits.length=this.precision,this},i.prototype.subtract=function(i){return S.subtract(this,i),this.digits.length=this.precision,this},i.toBigInt=function(t){return i.isBigInt(t)?t:new i(t)},i.prototype.toString=function(i,t){return void 0===i&&(i=null),void 0===t&&(t=null),w.toString(this,i,t)},i}();D.MIN_BASE=r.MIN_BASE,D.MAX_BASE=r.MAX_BASE,D.DEFAULT_BASE=r.DEFAULT_BASE,D.MAX_PRECISION=r.MAX_PRECISION,t.BigInt=D}])});
//# sourceMappingURL=big.js.map