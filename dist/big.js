!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Big=t():e.Big=t()}(this,function(){return function(e){function t(n){if(i[n])return i[n].exports;var r=i[n]={exports:{},id:n,loaded:!1};return e[n].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var i={};return t.m=e,t.c=i,t.p="",t(0)}([function(e,t,i){"use strict";var n=i(1);t.Int=n.default},function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}var r=i(2),u=n(r),o=i(20),a=n(o),s=i(21),f=n(s),c=i(25),l=i(26),g=i(27),v=i(28),d=i(29),h=i(30),y=i(31),b=i(33),p=i(32),m=function(){function e(t){if((0,a.default)(this,e),e.isBigInt(t))e.clone(this,t);else if(p.isNumber(t))this.convertNumber(t);else{if(!p.isString(t))throw TypeError("Expecting type BigInt | string | number");this.convertString(t)}}return(0,f.default)(e,[{key:"convertNumber",value:function(t){var i=t,n=e.DEFAULT_BASE;i=(this.isNegative=i<0)?-i:i;for(var r=Math.ceil(Math.log(i)/Math.log(n)),u=new Array(r),o=0;0!=i;++o)u[o]=i%n,i=(i-u[o])/n;this.base=n,this.digits=r,this.integer=u}},{key:"convertString",value:function(t){if(t=t.trim(),(0,u.default)(t))throw TypeError("NaN");this.isNegative="-"===t[0],t=t.replace(/^[-+]?0+|\.[0-9]+$/gm,""),this.base=10,this.digits=t.length;for(var i=this.integer=new Array(this.digits),n=0,r=this.digits;r>0;i[n++]=0|t[--r]);this.toBase(e.DEFAULT_BASE)}},{key:"abs",value:function(){return this.clone().mAbs()}},{key:"mAbs",value:function(){return this.isNegative=!1,this}},{key:"negate",value:function(){return this.clone().mNegate()}},{key:"mNegate",value:function(){return this.isNegative=0!==this.digits&&this.isNegative===!1,this}},{key:"signum",value:function(){return this.isNegative?-1:0===this.digits?0:1}},{key:"clone",value:function(){return new e(this)}},{key:"toZero",value:function(){this.isNegative=!1,this.integer=[],this.digits=0}},{key:"toOne",value:function(){this.isNegative=!1,this.integer=[1],this.digits=1}},{key:"getBase",value:function(){return this.base}},{key:"setBase",value:function(e){return this.clone().mSetBase(e)}},{key:"mSetBase",value:function(t){if(t|=0,this.base===t)return this;if(t<e.MIN_BASE)throw RangeError(t+" < BigInt.MIN_BASE ("+e.MIN_BASE+")");if(t>e.MAX_BASE)throw RangeError(t+" > BigInt.MAX_BASE ("+e.MAX_BASE+")");return this.toBase(t),this}},{key:"toBase",value:function(e){for(var t=this,i=t.integer,n=t.base,r=t.digits,u=new Array(Math.ceil(r*Math.log(n)/Math.log(e))),o=0,a=r;a>0;++o){for(var s=0,f=a;f-- >0;s%=e)s=s*n+i[f],i[f]=s<e?0:0|s/e;for(u[o]=s;i[a-1]<1;--a);}u.length=o,t.base=e,t.digits=o,t.integer=u}},{key:"toString",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.base,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:p.CIPHER,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";if(this.base!==e)return this.setBase(e).toString(e,t,i);if((null===t||t instanceof Array&&e>t.length)&&!function(){var i=new Array((""+(e-1)).length+1).join("0");t=function(e,t,n){var r=""+e;return t+1===n?r:i.substring(r.length)+r}}(),0===this.digits)return t instanceof Array?t[0]:t(0,0,0);var n=void 0,r=this.integer;if(t instanceof Array){n=t[r[0]];for(var u=1,o=this.digits;u<o;n=t[r[u++]]+i+n);}else{n=t(r[0],0,this.digits);for(var a=1,s=this.digits;a<s;++a)n=t(r[a],a,s)+i+n}return this.isNegative&&(n="-"+n),n}},{key:"lt",value:function(e){return this.compareTo(e)<0}},{key:"lessThan",value:function(e){return this.lt(e)}},{key:"lteq",value:function(e){return this.compareTo(e)<=0}},{key:"lessThanEquals",value:function(e){return this.lteq(e)}},{key:"eq",value:function(e){return 0===this.compareTo(e)}},{key:"equals",value:function(e){return this.eq(e)}},{key:"gteq",value:function(e){return this.compareTo(e)>=0}},{key:"greaterThanEquals",value:function(e){return this.gteq(e)}},{key:"gt",value:function(e){return this.compareTo(e)>0}},{key:"greaterThan",value:function(e){return this.gt(e)}},{key:"compareTo",value:function(t){var i=this,n=e.toBigInt(t);if(i===n)return 0;if(i.isNegative!==n.isNegative)return i.isNegative?-1:1;if(i.digits<2&&n.digits<2)return i.digits!==n.digits?i.digits<n.digits?-1:1:0===i.digits||i.integer[0]===n.integer[0]?0:i.integer[0]<n.integer[0]?-1:1;var r=-1;if(i.base!==n.base){if(i.base>n.base){var u=i;i=n,n=u,r=1}var o=Math.log(i.base)/Math.log(n.base);if(n.digits<Math.ceil(i.digits*o))return-r;if(n.digits>Math.ceil((i.digits+1)*o))return r;i=i.clone(),i.toBase(n.base)}if(i.digits!==n.digits)return i.digits<n.digits?r:-r;for(var a=i.digits;a-- >0;)if(i.integer[a]!==n.integer[a])return i.integer[a]<n.integer[a]?r:-r;return 0}},{key:"isOdd",value:function(){return!this.isEven()}},{key:"isEven",value:function(){if(0===this.digits)return!0;if(0===(1&this.base))return 0===(1&this.integer[0]);for(var e=0,t=this.integer,i=0,n=this.digits;i<n;e^=t[i++]);return 0===(1&e)}},{key:"not",value:function(){return this.clone().mNot()}},{key:"mNot",value:function(){return this.add(e.ONE).mNegate()}},{key:"and",value:function(e){return this.clone().mAnd(e)}},{key:"mAnd",value:function(e){throw Error("D")}},{key:"andNot",value:function(e){return this.clone().mAndNot(e)}},{key:"mAndNot",value:function(t){return this.mAnd(e.toBigInt(t).not())}},{key:"or",value:function(e){return this.clone().mOr(e)}},{key:"mOr",value:function(e){throw Error("D")}},{key:"xor",value:function(e){return this.clone().mXor(e)}},{key:"mXor",value:function(e){throw Error("D")}},{key:"gcd",value:function(e){return this.clone().mGcd(e)}},{key:"mGcd",value:function(t){var i=this,n=e.toBigInt(t);if(i===n||0===n.digits)return i.mAbs();if(0===i.digits){var r=i.base;return e.clone(i,n),r!==i.base&&i.toBase(r),i.mAbs()}return n=n.clone(),i.base!==n.base&&n.toBase(i.base),n=i._gcd(n),i!==n&&e.clone(i,n),i}},{key:"_gcd",value:function(t){for(var i=this,n=e.ONE;i.isEven()&&t.isEven();)i._half(),t._half(),n._double();for(;i.isEven();)i._half();do{for(;t.isEven();)t._half();t._subtract(i).mAbs()}while(0!==t.digits);return i._multiply(n)}},{key:"add",value:function(e){return this.clone().mAdd(e)}},{key:"mAdd",value:function(t){var i=this,n=e.toBigInt(t);if(i===n)return i.mDouble();if(0===n.digits)return i;if(0===i.digits){var r=i.base;return e.clone(i,n),r!==i.base&&i.toBase(r),i}return i.base!==n.base&&(n=n.clone(),n.toBase(i.base)),i.isNegative!==n.isNegative?i.mNegate()._subtract(n).mNegate():i._add(n)}},{key:"_add",value:function(e){var t=this;return e.integer.length=e.digits=(e.digits<t.digits?l.default:c.default)(e.integer,0,e.digits,t.integer,0,t.digits,e.base),e}},{key:"subtract",value:function(e){return this.clone().mSubtract(e)}},{key:"mSubtract",value:function(t){var i=this,n=e.toBigInt(t);if(i===n)return i.toZero(),i;if(0===n.digits)return i;if(0===i.digits){var r=i.base;return e.clone(i,n),r!==i.base&&i.toBase(r),i.mNegate()}return i.base!==n.base&&(n=n.clone(),n.toBase(i.base)),i.isNegative!==n.isNegative?i.mNegate()._add(n).mNegate():i._subtract(n)}},{key:"_subtract",value:function(e){var t=this,i=t.compareTo(e);return 0===i?(t.toZero(),t):(i<0?(t.mNegate(),t.integer.length=t.digits=h.default(t.integer,t.digits,e.integer,e.digits,t.base)):t.integer.length=t.digits=d.default(t.integer,0,t.digits,e.integer,0,e.digits,t.base),t)}},{key:"double",value:function(){return this.clone().mDouble()}},{key:"mDouble",value:function(){return 0===this.digits?this:this._double()}},{key:"_double",value:function(){return this.integer.length=this.digits=g.default(this.integer,this.digits,this.base),this}},{key:"square",value:function(){return this.clone().mSquare()}},{key:"mSquare",value:function(){var e=this;if(0===e.digits)return e;if(e.isNegative&&(e.isNegative=!1),1===e.digits){if(1===e.integer[0])return e;if(2===e.integer[0])return e._double()}return e._square()}},{key:"_square",value:function(){var e=this;return e.integer.length=2*e.digits,e.integer.length=e.digits=y.default(e.integer,e.digits,e.base),e}},{key:"multiply",value:function(e){return this.clone().mMultiply(e)}},{key:"mMultiply",value:function(t){var i=this,n=e.toBigInt(t);if(i===n)return i.mSquare();if(0===i.digits)return i;if(0===n.digits)return i.toZero(),i;if(i.isNegative=i.isNegative!==n.isNegative,1===i.digits&&i.integer[0]<3){var r=i.base;return e.clone(i,n),i.base!==r&&i.toBase(r),2===i.integer[0]&&i._double(),i}return 1===n.digits&&n.integer[0]<3?1===n.integer[0]?i:i._double():(i.base!==n.base&&(n=n.clone(),n.toBase(i.base)),i._multiply(n))}},{key:"_multiply",value:function(e){var t=this;return t.integer.length=t.digits+e.digits,t.integer.length=t.digits=b.default(t.integer,t.digits,e.integer,e.digits,t.base),t}},{key:"pow",value:function(e){return this.clone().mPow(e)}},{key:"mPow",value:function(t){var i=this,n=e.toBigInt(t);return 0===n.digits?(i.toOne(),i):n.isNegative?(i.toZero(),i):(i.isNegative&&n.isEven()&&(i.isNegative=!1),0===i.digits||1===i.digits&&1===i.integer[0]?i:i._pow(n.clone()))}},{key:"_pow",value:function(e){var t=this;if(1===e.digits&&1===e.integer[0])return t;if(e.isOdd()){var i=t.clone();return t._square()._pow(e._half())._multiply(i)}return t._square()._pow(e._half())}},{key:"half",value:function(){return this.clone().mHalf()}},{key:"mHalf",value:function(){return 0===this.digits?this:this._half()}},{key:"_half",value:function(){return this.integer.length=this.digits=v.default(this.integer,this.digits,this.base,this.isNegative),this}},{key:"divide",value:function(e){return this.clone().mDivide(e)}},{key:"mDivide",value:function(t){var i=this,n=e.toBigInt(t);if(0===n.digits)throw EvalError("Divide by Zero");if(i===n)return i.toOne(),i;if(0===i.digits)return i;if(i.isNegative=i.isNegative!==n.isNegative,1===n.digits&&n.integer[0]<3)return 1===n.integer[0]?i:i._half();if(i.base!==n.base){var r=Math.log(n.base)/Math.log(i.base);if(i.digits<Math.ceil(n.digits*r))return i.toZero(),i;n=n.clone(),n.toBase(i.base)}return i.digits<n.digits?(i.toZero(),i):i._divide(n)}},{key:"_divide",value:function(e){throw Error("D")}}],[{key:"isBigInt",value:function(t){return t instanceof e}},{key:"toBigInt",value:function(t){return e.isBigInt(t)?t:new e(t)}},{key:"clone",value:function(e,t){e.isNegative=t.isNegative,e.integer=t.integer.slice(0),e.base=t.base,e.digits=t.digits}},{key:"min",value:function(t,i){return e.mMin(t,i).clone()}},{key:"mMin",value:function(t,i){var n=e.toBigInt(t),r=e.toBigInt(i);return n.compareTo(r)>0?n:r}},{key:"max",value:function(t,i){return e.mMax(t,i).clone()}},{key:"mMax",value:function(t,i){var n=e.toBigInt(t),r=e.toBigInt(i);return n.compareTo(r)<0?r:n}},{key:"MIN_BASE",get:function(){return 2}},{key:"MAX_BASE",get:function(){return 94906265}},{key:"DEFAULT_BASE",get:function(){return 94906264}},{key:"MAX_DIGITS",get:function(){return 4294967295}},{key:"MINUS_ONE",get:function(){return new e(-1)}},{key:"ZERO",get:function(){return new e(0)}},{key:"ONE",get:function(){return new e(1)}}]),e}();Object.defineProperty(t,"__esModule",{value:!0}),t.default=m},function(e,t,i){e.exports={default:i(3),__esModule:!0}},function(e,t,i){i(4),e.exports=i(7).Number.isNaN},function(e,t,i){var n=i(5);n(n.S,"Number",{isNaN:function(e){return e!=e}})},function(e,t,i){var n=i(6),r=i(7),u=i(8),o=i(10),a="prototype",s=function(e,t,i){var f,c,l,g=e&s.F,v=e&s.G,d=e&s.S,h=e&s.P,y=e&s.B,b=e&s.W,p=v?r:r[t]||(r[t]={}),m=p[a],_=v?n:d?n[t]:(n[t]||{})[a];v&&(i=t);for(f in i)c=!g&&_&&void 0!==_[f],c&&f in p||(l=c?_[f]:i[f],p[f]=v&&"function"!=typeof _[f]?i[f]:y&&c?u(l,n):b&&_[f]==l?function(e){var t=function(t,i,n){if(this instanceof e){switch(arguments.length){case 0:return new e;case 1:return new e(t);case 2:return new e(t,i)}return new e(t,i,n)}return e.apply(this,arguments)};return t[a]=e[a],t}(l):h&&"function"==typeof l?u(Function.call,l):l,h&&((p.virtual||(p.virtual={}))[f]=l,e&s.R&&m&&!m[f]&&o(m,f,l)))};s.F=1,s.G=2,s.S=4,s.P=8,s.B=16,s.W=32,s.U=64,s.R=128,e.exports=s},function(e,t){var i=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=i)},function(e,t){var i=e.exports={version:"2.4.0"};"number"==typeof __e&&(__e=i)},function(e,t,i){var n=i(9);e.exports=function(e,t,i){if(n(e),void 0===t)return e;switch(i){case 1:return function(i){return e.call(t,i)};case 2:return function(i,n){return e.call(t,i,n)};case 3:return function(i,n,r){return e.call(t,i,n,r)}}return function(){return e.apply(t,arguments)}}},function(e,t){e.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e}},function(e,t,i){var n=i(11),r=i(19);e.exports=i(15)?function(e,t,i){return n.f(e,t,r(1,i))}:function(e,t,i){return e[t]=i,e}},function(e,t,i){var n=i(12),r=i(14),u=i(18),o=Object.defineProperty;t.f=i(15)?Object.defineProperty:function(e,t,i){if(n(e),t=u(t,!0),n(i),r)try{return o(e,t,i)}catch(e){}if("get"in i||"set"in i)throw TypeError("Accessors not supported!");return"value"in i&&(e[t]=i.value),e}},function(e,t,i){var n=i(13);e.exports=function(e){if(!n(e))throw TypeError(e+" is not an object!");return e}},function(e,t){e.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e}},function(e,t,i){e.exports=!i(15)&&!i(16)(function(){return 7!=Object.defineProperty(i(17)("div"),"a",{get:function(){return 7}}).a})},function(e,t,i){e.exports=!i(16)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(e,t){e.exports=function(e){try{return!!e()}catch(e){return!0}}},function(e,t,i){var n=i(13),r=i(6).document,u=n(r)&&n(r.createElement);e.exports=function(e){return u?r.createElement(e):{}}},function(e,t,i){var n=i(13);e.exports=function(e,t){if(!n(e))return e;var i,r;if(t&&"function"==typeof(i=e.toString)&&!n(r=i.call(e)))return r;if("function"==typeof(i=e.valueOf)&&!n(r=i.call(e)))return r;if(!t&&"function"==typeof(i=e.toString)&&!n(r=i.call(e)))return r;throw TypeError("Can't convert object to primitive value")}},function(e,t){e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},function(e,t){"use strict";t.__esModule=!0,t.default=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var r=i(22),u=n(r);t.default=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),(0,u.default)(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}()},function(e,t,i){e.exports={default:i(23),__esModule:!0}},function(e,t,i){i(24);var n=i(7).Object;e.exports=function(e,t,i){return n.defineProperty(e,t,i)}},function(e,t,i){var n=i(5);n(n.S+n.F*!i(15),"Object",{defineProperty:i(11).f})},function(e,t){"use strict";function i(e,t,i,n,r,u,o){for(var a=0;r<u;++t,++r)e[t]=e[t]+n[r]+a,e[t]<o?a=0:(e[t]=e[t]-o,a=1);if(a>0){for(a=o-1;t<i&&e[t]===a;e[t++]=0);t===i?e[i++]=1:e[t]=e[t]+1}return i}Object.defineProperty(t,"__esModule",{value:!0}),t.default=i},function(e,t,i){"use strict";function n(e,t,i,n,u,o,a){for(var s=u-t+i,f=s;f<o;e[i++]=n[f++]);return r.default(e,t,i,n,u,s,a)}var r=i(25);Object.defineProperty(t,"__esModule",{value:!0}),t.default=n},function(e,t){"use strict";function i(e,t,i){for(var n=0,r=0;r<t;++r)e[r]=(e[r]<<1)+n,e[r]<i?n=0:(n=1,e[r]=e[r]-i);return n>0&&(e[t++]=1),t}Object.defineProperty(t,"__esModule",{value:!0}),t.default=i},function(e,t){"use strict";function i(e,t,i,n){for(var r=0,u=t;u-- >0;e[u]=e[u]>>1)e[u]=e[u]+r,r=i&-(1&e[u]);if(0!==r&&n){var o=0;for(r=i-1;e[o]===r;e[o++]=0);e[o]=e[o]+1}return 0===e[t-1]?t-1:t}Object.defineProperty(t,"__esModule",{value:!0}),t.default=i},function(e,t){"use strict";function i(e,t,i,n,r,u,o){for(var a=t,s=0;r<u;++a,++r)e[a]=e[a]-s-n[r],e[a]<0?(e[a]=e[a]+o,s=1):s=0;if(s>0){for(s=o-1;0===e[a];e[a++]=s);e[a]=e[a]-1,++a}if(a===i)for(;i>t&&0===e[i-1];--i);return i}Object.defineProperty(t,"__esModule",{value:!0}),t.default=i},function(e,t){"use strict";function i(e,t,i,n,r){for(var u=0,o=0;u<t;++u)e[u]=i[u]-o-e[u],e[u]<0?(e[u]=e[u]+r,o=1):o=0;for(var a=r-1;u<n&&0===i[u];e[u++]=a);for(e[u]=i[u]-1;++u<n;e[u]=i[u]);return 0===i[n-1]?n-1:n}Object.defineProperty(t,"__esModule",{value:!0}),t.default=i},function(e,t,i){"use strict";function n(e,t,i){return r(e,0,t,i)}function r(e,t,i,n){var s=i-t;if(s<2)return s=e[t]*e[t],s<n?e[i]=0:(e[i++]=0|s/n,s%=n),e[t]=s,i;s=s+1>>>1;var f=t+s,c=new Array(2*s+2);u.copy(c,0,e,t,f);var l=o.default(c,0,s,e,f,i,n);e[i]=0,u.basicShiftUp(e,f,i,s);var g=r(e,t,f,n),v=f+s;return u.zero(e,g,v),i=r(e,v,i+s,n),l=r(c,0,l,n),l=a.default(c,0,l,e,t,g,n),l=a.default(c,0,l,e,v,i,n),o.default(e,f,i,c,0,l,n)}var u=i(32),o=i(25),a=i(29);Object.defineProperty(t,"__esModule",{value:!0}),t.default=n},function(e,t){"use strict";function i(e,t,i,n){for(var r=t+n;t<i;e[r++]=e[t++]);}function n(e,t,n,r){var u=n-r;i(e,u,n,r),i(e,t,u,r)}function r(e,t,i,n){for(var r=t-n;t<i;e[r++]=e[t++]);}function u(e,t,i){for(;t<i;)e[t++]=0}function o(e,t,i,n,r){for(;n<r;)e[t++]=i[n++]}function a(e,t,i,n,r){var u="";for(null==n&&(n=r=i,i=t);t<i;u=" "+e[t++]+u);for(u=" ]"+u;t<n;u=" "+e[t++]+u);for(u=" ["+u;t<r;u=" "+e[t++]+u);return u}function s(e){return"number"==typeof e}function f(e){return"string"==typeof e}t.CIPHER=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],t.basicShiftUp=i,t.reverseShiftUp=n,t.basicShiftDown=r,t.zero=u,t.copy=o,t.print=a,t.isNumber=s,t.isString=f},function(e,t,i){"use strict";function n(e,t,i,n,o){var a=t<n?n:t;for(u.zero(e,t,a),u.zero(i,n,a),r(e,0,a,i,0,a,o),a=t+n;0===e[a-1];--a);return a}function r(e,t,i,n,s,f,c){var l=i-t;if(l<2)return l=e[t]*n[s],l<c?e[i]=0:(e[i++]=0|l/c,l%=c),e[t]=l,i;l=l+1>>>1;var g=t+l,v=s+l,d=new Array(2*l+2);u.copy(d,0,e,t,g);var h=o.default(d,0,l,e,g,i,c),y=new Array(2*l+2);u.copy(y,0,n,s,v);var b=o.default(y,0,l,n,v,f,c);h<b?d[h++]=0:b<h&&(y[b++]=0),e[i]=0,u.basicShiftUp(e,g,i,l);var p=r(e,t,g,n,s,v,c),m=g+l;for(u.zero(e,p,m),i=r(e,m,i+l,n,v,f,c),h=r(d,0,h,y,0,b,c),h=a.default(d,0,h,e,t,p,c),h=a.default(d,0,h,e,m,i,c),i=o.default(e,g,i,d,0,h,c);i>t&&0===e[i-1];--i);return i}var u=i(32),o=i(25),a=i(29);Object.defineProperty(t,"__esModule",{value:!0}),t.default=n}])});