!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Big=e():t.Big=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return t[r].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";var r=n(1);e.Int=r.default},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var i=n(2),u=r(i),o=n(59),a=r(o),s=n(62),f=r(s),c=n(63),l=r(c),v=n(67),d=n(68),g=n(69),h=n(70),y=n(71),p=n(72),b=n(73),m=n(75),_=n(76),k=n(77),x=n(74),N=function(){function t(e){if((0,f.default)(this,t),t.isBigInt(e))t.clone(this,e);else if(x.isNumber(e))this.convertNumber(e);else{if(!x.isString(e))throw TypeError("Expecting type BigInt | string | number");this.convertString(e)}}return(0,l.default)(t,[{key:"convertNumber",value:function(e){var n=e,r=t.DEFAULT_BASE;n=(this.isNegative=n<0)?-n:n;for(var i=Math.ceil(Math.log(n)/Math.log(r)),u=new Array(i),o=0;0!=n;++o)u[o]=n%r,n=(n-u[o])/r;this.base=r,this.digits=i,this.integer=u}},{key:"convertString",value:function(e){if(e=e.trim(),(0,a.default)(e))throw TypeError("NaN");this.isNegative="-"===e[0],e=e.replace(/^[-+]?0+|\.[0-9]+$/gm,""),this.base=10,this.digits=e.length;for(var n=this.integer=new Array(this.digits),r=0,i=this.digits;i>0;n[r++]=0|e[--i]);this.toBase(t.DEFAULT_BASE)}},{key:"abs",value:function(){return this.clone().mAbs()}},{key:"mAbs",value:function(){return this.isNegative=!1,this}},{key:"negate",value:function(){return this.clone().mNegate()}},{key:"mNegate",value:function(){return this.isNegative=0!==this.digits&&this.isNegative===!1,this}},{key:"signum",value:function(){return this.isNegative?-1:0===this.digits?0:1}},{key:"clone",value:function(){return new t(this)}},{key:"toZero",value:function(){this.isNegative=!1,this.integer=[],this.digits=0}},{key:"toOne",value:function(){this.isNegative=!1,this.integer=[1],this.digits=1}},{key:"getBase",value:function(){return this.base}},{key:"setBase",value:function(t){return this.clone().mSetBase(t)}},{key:"mSetBase",value:function(e){if(e|=0,this.base===e)return this;if(e<t.MIN_BASE)throw RangeError(e+" < BigInt.MIN_BASE ("+t.MIN_BASE+")");if(e>t.MAX_BASE)throw RangeError(e+" > BigInt.MAX_BASE ("+t.MAX_BASE+")");return this.toBase(e),this}},{key:"toBase",value:function(t){for(var e=this,n=e.integer,r=e.base,i=e.digits,u=new Array(Math.ceil(i*Math.log(r)/Math.log(t))),o=0,a=i;a>0;++o){for(var s=0,f=a;f-- >0;s%=t)s=s*r+n[f],n[f]=s<t?0:0|s/t;for(u[o]=s;n[a-1]<1;--a);}u.length=o,e.base=t,e.digits=o,e.integer=u}},{key:"toString",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.base,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:x.CIPHER,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";if(this.base!==t)return this.setBase(t).toString(t,e,n);if((null===e||e instanceof Array&&t>e.length)&&!function(){var n=new Array((""+(t-1)).length+1).join("0");e=function(t,e,r){var i=""+t;return e+1===r?i:n.substring(i.length)+i}}(),0===this.digits)return e instanceof Array?e[0]:e(0,0,0);var r=void 0,i=this.integer;if(e instanceof Array){r=e[i[0]];for(var u=1,o=this.digits;u<o;r=e[i[u++]]+n+r);}else{r=e(i[0],0,this.digits);for(var a=1,s=this.digits;a<s;++a)r=e(i[a],a,s)+n+r}return this.isNegative&&(r="-"+r),r}},{key:"lt",value:function(t){return this.compareTo(t)<0}},{key:"lessThan",value:function(t){return this.lt(t)}},{key:"lteq",value:function(t){return this.compareTo(t)<=0}},{key:"lessThanEquals",value:function(t){return this.lteq(t)}},{key:"eq",value:function(t){return 0===this.compareTo(t)}},{key:"equals",value:function(t){return this.eq(t)}},{key:"gteq",value:function(t){return this.compareTo(t)>=0}},{key:"greaterThanEquals",value:function(t){return this.gteq(t)}},{key:"gt",value:function(t){return this.compareTo(t)>0}},{key:"greaterThan",value:function(t){return this.gt(t)}},{key:"compareTo",value:function(e){var n=this,r=t.toBigInt(e);if(n===r)return 0;if(n.isNegative!==r.isNegative)return n.isNegative?-1:1;if(n.digits<2&&r.digits<2)return n.digits!==r.digits?n.digits<r.digits?-1:1:0===n.digits||n.integer[0]===r.integer[0]?0:n.integer[0]<r.integer[0]?-1:1;if(n.base===r.base)return x.compare(n.integer,0,n.digits,r.integer,0,r.digits);var i=-1;if(n.base>r.base){var u=n;n=r,r=u,i=1}var o=Math.log(n.base)/Math.log(r.base);return r.digits<Math.ceil(n.digits*o)?-i:r.digits>Math.ceil((n.digits+1)*o)?i:(n=n.clone(),n.toBase(r.base),i*x.compare(n.integer,0,n.digits,r.integer,0,r.digits))}},{key:"isOdd",value:function(){return!this.isEven()}},{key:"isEven",value:function(){if(0===this.digits)return!0;if(0===(1&this.base))return 0===(1&this.integer[0]);for(var t=0,e=this.integer,n=0,r=this.digits;n<r;t^=e[n++]);return 0===(1&t)}},{key:"not",value:function(){return this.clone().mNot()}},{key:"mNot",value:function(){return this.add(t.ONE).mNegate()}},{key:"and",value:function(t){return this.clone().mAnd(t)}},{key:"mAnd",value:function(t){throw Error("D")}},{key:"andNot",value:function(t){return this.clone().mAndNot(t)}},{key:"mAndNot",value:function(e){return this.mAnd(t.toBigInt(e).not())}},{key:"or",value:function(t){return this.clone().mOr(t)}},{key:"mOr",value:function(t){throw Error("D")}},{key:"xor",value:function(t){return this.clone().mXor(t)}},{key:"mXor",value:function(t){throw Error("D")}},{key:"gcd",value:function(t){return this.clone().mgcd(t)}},{key:"mgcd",value:function(e){var n=this,r=t.toBigInt(e);if(n===r||0===r.digits)return n.mAbs();if(0===n.digits){var i=n.base;return t.clone(n,r),i!==n.base&&n.toBase(i),n.mAbs()}return r=r.clone(),n.base!==r.base&&r.toBase(n.base),r=n._gcd(r),n!==r&&t.clone(n,r),n}},{key:"_gcd",value:function(e){for(var n=this,r=t.ONE;n.isEven()&&e.isEven();)n._half(),e._half(),r._double();for(;n.isEven();)n._half();do{for(;e.isEven();)e._half();e._subtract(n).mAbs()}while(0!==e.digits);return n._multiply(r)}},{key:"lcm",value:function(t){return this.clone().mlcm(t)}},{key:"mlcm",value:function(e){var n=this,r=t.toBigInt(e);if(n===r)return n;if(0===n.digits||0===r.digits)return n.toZero(),n;if(1===r.digits&&1===r.integer[0])return n.mAbs();if(1===n.digits&&1===n.integer[0]){var i=n.base;return t.clone(n,r),i!==n.base&&n.toBase(i),n.mAbs()}return n.mDivide(n.gcd(r)).mMultiply(r).mAbs()}},{key:"add",value:function(t){return this.clone().mAdd(t)}},{key:"mAdd",value:function(e){var n=this,r=t.toBigInt(e);if(n===r)return n.mDouble();if(0===r.digits)return n;if(0===n.digits){var i=n.base;return t.clone(n,r),i!==n.base&&n.toBase(i),n}return n.base!==r.base&&(r=r.clone(),r.toBase(n.base)),n.isNegative!==r.isNegative?n.mNegate()._subtract(r).mNegate():n._add(r)}},{key:"_add",value:function(t){var e=this;return t.integer.length=t.digits=(t.digits<e.digits?d.default:v.default)(t.integer,0,t.digits,e.integer,0,e.digits,t.base),t}},{key:"subtract",value:function(t){return this.clone().mSubtract(t)}},{key:"mSubtract",value:function(e){var n=this,r=t.toBigInt(e);if(n===r)return n.toZero(),n;if(0===r.digits)return n;if(0===n.digits){var i=n.base;return t.clone(n,r),i!==n.base&&n.toBase(i),n.mNegate()}return n.base!==r.base&&(r=r.clone(),r.toBase(n.base)),n.isNegative!==r.isNegative?n.mNegate()._add(r).mNegate():n._subtract(r)}},{key:"_subtract",value:function(t){var e=this,n=e.compareTo(t);return 0===n?(e.toZero(),e):(n<0?(e.mNegate(),e.integer.length=e.digits=p.default(e.integer,0,e.digits,t.integer,0,t.digits,e.base)):e.integer.length=e.digits=y.default(e.integer,0,e.digits,t.integer,0,t.digits,e.base),e)}},{key:"double",value:function(){return this.clone().mDouble()}},{key:"mDouble",value:function(){return 0===this.digits?this:this._double()}},{key:"_double",value:function(){return this.integer.length=this.digits=g.default(this.integer,this.digits,this.base),this}},{key:"square",value:function(){return this.clone().mSquare()}},{key:"mSquare",value:function(){var t=this;if(0===t.digits)return t;if(t.isNegative&&(t.isNegative=!1),1===t.digits){if(1===t.integer[0])return t;if(2===t.integer[0])return t._double()}return t._square()}},{key:"_square",value:function(){var t=this;return t.integer.length=2*t.digits,t.integer.length=t.digits=b.default(t.integer,t.digits,t.base),t}},{key:"multiply",value:function(t){return this.clone().mMultiply(t)}},{key:"mMultiply",value:function(e){var n=this,r=t.toBigInt(e);if(n===r)return n.mSquare();if(0===n.digits)return n;if(0===r.digits)return n.toZero(),n;if(n.isNegative=n.isNegative!==r.isNegative,1===n.digits&&n.integer[0]<3){var i=n.base;return t.clone(n,r),n.base!==i&&n.toBase(i),2===n.integer[0]&&n._double(),n}return 1===r.digits&&r.integer[0]<3?1===r.integer[0]?n:n._double():(n.base!==r.base&&(r=r.clone(),r.toBase(n.base)),n._multiply(r))}},{key:"_multiply",value:function(t){var e=this;return e.integer.length=e.digits+t.digits,e.integer.length=e.digits=m.default(e.integer,e.digits,t.integer,t.digits,e.base),e}},{key:"pow",value:function(t){return this.clone().mPow(t)}},{key:"mPow",value:function(e){var n=this,r=t.toBigInt(e);return 0===r.digits?(n.toOne(),n):r.isNegative?(n.toZero(),n):(n.isNegative&&r.isEven()&&(n.isNegative=!1),0===n.digits||1===n.digits&&1===n.integer[0]?n:n._pow(r.clone()))}},{key:"_pow",value:function(t){var e=this;if(1===t.digits&&1===t.integer[0])return e;var n=void 0,r=t._half(),i=(0,u.default)(r,2);if(n=i[1],n.digits>0){var o=e.clone();return e._square()._pow(t)._multiply(o)}return e._square()._pow(t)}},{key:"half",value:function(){return this.clone().mHalf()}},{key:"mHalf",value:function(){return 0===this.digits?[this,t.ZERO]:this._half()}},{key:"_half",value:function(){var e=void 0,n=h.default(this.integer,this.digits,this.base,this.isNegative),r=(0,u.default)(n,2);return this.digits=r[0],e=r[1],this.integer.length=this.digits,[this,0===e?t.ZERO:t.ONE]}},{key:"divide",value:function(t){return this.clone().mDivide(t)}},{key:"mDivide",value:function(t){return this.mDivideAndRemainder(t)[0]}},{key:"remainder",value:function(t){return this.clone().mRemainder(t)}},{key:"mRemainder",value:function(t){return this.mDivideAndRemainder(t)[1]}},{key:"divideAndRemainder",value:function(t){return this.clone().mDivideAndRemainder(t)}},{key:"mDivideAndRemainder",value:function(e){var n=this,r=t.toBigInt(e);if(0===r.digits)throw EvalError("Divide by Zero");if(n===r)return n.toOne(),[n,t.ZERO];if(0===n.digits)return[n,t.ZERO];if(n.isNegative=n.isNegative!==r.isNegative,1===r.digits&&r.integer[0]<3)return 1===r.integer[0]?[n,t.ZERO]:n._half();if(n.base!==r.base){var i=Math.log(r.base)/Math.log(n.base);if(n.digits<Math.ceil(r.digits*i)){var u=n.clone();return n.toZero(),[n,u]}r=r.clone(),r.toBase(n.base)}if(n.digits<r.digits){var o=n.clone();return n.toZero(),[n,o]}return n._divideAndRemainder(r)}},{key:"_divideAndRemainder",value:function(e){var n=this,r=t.ZERO,i=e.digits<2?k.default(n.integer,n.digits,e.integer[0],n.base):_.default(n.integer,n.digits,e.integer,e.digits,n.base),o=(0,u.default)(i,4);return n.integer=o[0],r.integer=o[1],n.digits=o[2],r.digits=o[3],n.integer.length=n.digits,r.integer.length=r.digits,[n,r]}}],[{key:"isBigInt",value:function(e){return e instanceof t}},{key:"toBigInt",value:function(e){return t.isBigInt(e)?e:new t(e)}},{key:"clone",value:function(t,e){t.isNegative=e.isNegative,t.integer=e.integer.slice(0),t.base=e.base,t.digits=e.digits}},{key:"min",value:function(e,n){return t.mMin(e,n).clone()}},{key:"mMin",value:function(e,n){var r=t.toBigInt(e),i=t.toBigInt(n);return r.compareTo(i)>0?r:i}},{key:"max",value:function(e,n){return t.mMax(e,n).clone()}},{key:"mMax",value:function(e,n){var r=t.toBigInt(e),i=t.toBigInt(n);return r.compareTo(i)<0?i:r}},{key:"MIN_BASE",get:function(){return 2}},{key:"MAX_BASE",get:function(){return 94906265}},{key:"DEFAULT_BASE",get:function(){return 94906264}},{key:"MAX_DIGITS",get:function(){return 4294967295}},{key:"MINUS_ONE",get:function(){return new t(-1)}},{key:"ZERO",get:function(){return new t(0)}},{key:"ONE",get:function(){return new t(1)}}]),t}();Object.defineProperty(e,"__esModule",{value:!0}),e.default=N},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var i=n(3),u=r(i),o=n(55),a=r(o);e.default=function(){function t(t,e){var n=[],r=!0,i=!1,u=void 0;try{for(var o,s=(0,a.default)(t);!(r=(o=s.next()).done)&&(n.push(o.value),!e||n.length!==e);r=!0);}catch(t){i=!0,u=t}finally{try{!r&&s.return&&s.return()}finally{if(i)throw u}}return n}return function(e,n){if(Array.isArray(e))return e;if((0,u.default)(Object(e)))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}()},function(t,e,n){t.exports={default:n(4),__esModule:!0}},function(t,e,n){n(5),n(51),t.exports=n(53)},function(t,e,n){n(6);for(var r=n(17),i=n(21),u=n(9),o=n(48)("toStringTag"),a=["NodeList","DOMTokenList","MediaList","StyleSheetList","CSSRuleList"],s=0;s<5;s++){var f=a[s],c=r[f],l=c&&c.prototype;l&&!l[o]&&i(l,o,f),u[f]=u.Array}},function(t,e,n){"use strict";var r=n(7),i=n(8),u=n(9),o=n(10);t.exports=n(14)(Array,"Array",function(t,e){this._t=o(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,i(1)):"keys"==e?i(0,n):"values"==e?i(0,t[n]):i(0,[n,t[n]])},"values"),u.Arguments=u.Array,r("keys"),r("values"),r("entries")},function(t,e){t.exports=function(){}},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e){t.exports={}},function(t,e,n){var r=n(11),i=n(13);t.exports=function(t){return r(i(t))}},function(t,e,n){var r=n(12);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e,n){"use strict";var r=n(15),i=n(16),u=n(31),o=n(21),a=n(32),s=n(9),f=n(33),c=n(47),l=n(49),v=n(48)("iterator"),d=!([].keys&&"next"in[].keys()),g="@@iterator",h="keys",y="values",p=function(){return this};t.exports=function(t,e,n,b,m,_,k){f(n,e,b);var x,N,w,A=function(t){if(!d&&t in S)return S[t];switch(t){case h:return function(){return new n(this,t)};case y:return function(){return new n(this,t)}}return function(){return new n(this,t)}},O=e+" Iterator",M=m==y,E=!1,S=t.prototype,B=S[v]||S[g]||m&&S[m],j=B||A(m),I=m?M?A("entries"):j:void 0,T="Array"==e?S.entries||B:B;if(T&&(w=l(T.call(new t)),w!==Object.prototype&&(c(w,O,!0),r||a(w,v)||o(w,v,p))),M&&B&&B.name!==y&&(E=!0,j=function(){return B.call(this)}),r&&!k||!d&&!E&&S[v]||o(S,v,j),s[e]=j,s[O]=p,m)if(x={values:M?j:A(y),keys:_?j:A(h),entries:I},k)for(N in x)N in S||u(S,N,x[N]);else i(i.P+i.F*(d||E),e,x);return x}},function(t,e){t.exports=!0},function(t,e,n){var r=n(17),i=n(18),u=n(19),o=n(21),a="prototype",s=function(t,e,n){var f,c,l,v=t&s.F,d=t&s.G,g=t&s.S,h=t&s.P,y=t&s.B,p=t&s.W,b=d?i:i[e]||(i[e]={}),m=b[a],_=d?r:g?r[e]:(r[e]||{})[a];d&&(n=e);for(f in n)c=!v&&_&&void 0!==_[f],c&&f in b||(l=c?_[f]:n[f],b[f]=d&&"function"!=typeof _[f]?n[f]:y&&c?u(l,r):p&&_[f]==l?function(t){var e=function(e,n,r){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,r)}return t.apply(this,arguments)};return e[a]=t[a],e}(l):h&&"function"==typeof l?u(Function.call,l):l,h&&((b.virtual||(b.virtual={}))[f]=l,t&s.R&&m&&!m[f]&&o(m,f,l)))};s.F=1,s.G=2,s.S=4,s.P=8,s.B=16,s.W=32,s.U=64,s.R=128,t.exports=s},function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e){var n=t.exports={version:"2.4.0"};"number"==typeof __e&&(__e=n)},function(t,e,n){var r=n(20);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,i){return t.call(e,n,r,i)}}return function(){return t.apply(e,arguments)}}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e,n){var r=n(22),i=n(30);t.exports=n(26)?function(t,e,n){return r.f(t,e,i(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var r=n(23),i=n(25),u=n(29),o=Object.defineProperty;e.f=n(26)?Object.defineProperty:function(t,e,n){if(r(t),e=u(e,!0),r(n),i)try{return o(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e,n){var r=n(24);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,n){t.exports=!n(26)&&!n(27)(function(){return 7!=Object.defineProperty(n(28)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){t.exports=!n(27)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e,n){var r=n(24),i=n(17).document,u=r(i)&&r(i.createElement);t.exports=function(t){return u?i.createElement(t):{}}},function(t,e,n){var r=n(24);t.exports=function(t,e){if(!r(t))return t;var n,i;if(e&&"function"==typeof(n=t.toString)&&!r(i=n.call(t)))return i;if("function"==typeof(n=t.valueOf)&&!r(i=n.call(t)))return i;if(!e&&"function"==typeof(n=t.toString)&&!r(i=n.call(t)))return i;throw TypeError("Can't convert object to primitive value")}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e,n){t.exports=n(21)},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){"use strict";var r=n(34),i=n(30),u=n(47),o={};n(21)(o,n(48)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=r(o,{next:i(1,n)}),u(t,e+" Iterator")}},function(t,e,n){var r=n(23),i=n(35),u=n(45),o=n(42)("IE_PROTO"),a=function(){},s="prototype",f=function(){var t,e=n(28)("iframe"),r=u.length,i="<",o=">";for(e.style.display="none",n(46).appendChild(e),e.src="javascript:",t=e.contentWindow.document,t.open(),t.write(i+"script"+o+"document.F=Object"+i+"/script"+o),t.close(),f=t.F;r--;)delete f[s][u[r]];return f()};t.exports=Object.create||function(t,e){var n;return null!==t?(a[s]=r(t),n=new a,a[s]=null,n[o]=t):n=f(),void 0===e?n:i(n,e)}},function(t,e,n){var r=n(22),i=n(23),u=n(36);t.exports=n(26)?Object.defineProperties:function(t,e){i(t);for(var n,o=u(e),a=o.length,s=0;a>s;)r.f(t,n=o[s++],e[n]);return t}},function(t,e,n){var r=n(37),i=n(45);t.exports=Object.keys||function(t){return r(t,i)}},function(t,e,n){var r=n(32),i=n(10),u=n(38)(!1),o=n(42)("IE_PROTO");t.exports=function(t,e){var n,a=i(t),s=0,f=[];for(n in a)n!=o&&r(a,n)&&f.push(n);for(;e.length>s;)r(a,n=e[s++])&&(~u(f,n)||f.push(n));return f}},function(t,e,n){var r=n(10),i=n(39),u=n(41);t.exports=function(t){return function(e,n,o){var a,s=r(e),f=i(s.length),c=u(o,f);if(t&&n!=n){for(;f>c;)if(a=s[c++],a!=a)return!0}else for(;f>c;c++)if((t||c in s)&&s[c]===n)return t||c||0;return!t&&-1}}},function(t,e,n){var r=n(40),i=Math.min;t.exports=function(t){return t>0?i(r(t),9007199254740991):0}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},function(t,e,n){var r=n(40),i=Math.max,u=Math.min;t.exports=function(t,e){return t=r(t),t<0?i(t+e,0):u(t,e)}},function(t,e,n){var r=n(43)("keys"),i=n(44);t.exports=function(t){return r[t]||(r[t]=i(t))}},function(t,e,n){var r=n(17),i="__core-js_shared__",u=r[i]||(r[i]={});t.exports=function(t){return u[t]||(u[t]={})}},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e,n){t.exports=n(17).document&&document.documentElement},function(t,e,n){var r=n(22).f,i=n(32),u=n(48)("toStringTag");t.exports=function(t,e,n){t&&!i(t=n?t:t.prototype,u)&&r(t,u,{configurable:!0,value:e})}},function(t,e,n){var r=n(43)("wks"),i=n(44),u=n(17).Symbol,o="function"==typeof u,a=t.exports=function(t){return r[t]||(r[t]=o&&u[t]||(o?u:i)("Symbol."+t))};a.store=r},function(t,e,n){var r=n(32),i=n(50),u=n(42)("IE_PROTO"),o=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=i(t),r(t,u)?t[u]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?o:null}},function(t,e,n){var r=n(13);t.exports=function(t){return Object(r(t))}},function(t,e,n){"use strict";var r=n(52)(!0);n(14)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=r(e,n),this._i+=t.length,{value:t,done:!1})})},function(t,e,n){var r=n(40),i=n(13);t.exports=function(t){return function(e,n){var u,o,a=String(i(e)),s=r(n),f=a.length;return s<0||s>=f?t?"":void 0:(u=a.charCodeAt(s),u<55296||u>56319||s+1===f||(o=a.charCodeAt(s+1))<56320||o>57343?t?a.charAt(s):u:t?a.slice(s,s+2):(u-55296<<10)+(o-56320)+65536)}}},function(t,e,n){var r=n(54),i=n(48)("iterator"),u=n(9);t.exports=n(18).isIterable=function(t){var e=Object(t);return void 0!==e[i]||"@@iterator"in e||u.hasOwnProperty(r(e))}},function(t,e,n){var r=n(12),i=n(48)("toStringTag"),u="Arguments"==r(function(){return arguments}()),o=function(t,e){try{return t[e]}catch(t){}};t.exports=function(t){var e,n,a;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=o(e=Object(t),i))?n:u?r(e):"Object"==(a=r(e))&&"function"==typeof e.callee?"Arguments":a}},function(t,e,n){t.exports={default:n(56),__esModule:!0}},function(t,e,n){n(5),n(51),t.exports=n(57)},function(t,e,n){var r=n(23),i=n(58);t.exports=n(18).getIterator=function(t){var e=i(t);if("function"!=typeof e)throw TypeError(t+" is not iterable!");return r(e.call(t))}},function(t,e,n){var r=n(54),i=n(48)("iterator"),u=n(9);t.exports=n(18).getIteratorMethod=function(t){if(void 0!=t)return t[i]||t["@@iterator"]||u[r(t)]}},function(t,e,n){t.exports={default:n(60),__esModule:!0}},function(t,e,n){n(61),t.exports=n(18).Number.isNaN},function(t,e,n){var r=n(16);r(r.S,"Number",{isNaN:function(t){return t!=t}})},function(t,e){"use strict";e.__esModule=!0,e.default=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var i=n(64),u=r(i);e.default=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),(0,u.default)(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}()},function(t,e,n){t.exports={default:n(65),__esModule:!0}},function(t,e,n){n(66);var r=n(18).Object;t.exports=function(t,e,n){return r.defineProperty(t,e,n)}},function(t,e,n){var r=n(16);r(r.S+r.F*!n(26),"Object",{defineProperty:n(22).f})},function(t,e){"use strict";function n(t,e,n,r,i,u,o){for(var a=0;i<u;++e,++i)t[e]=t[e]+r[i]+a,t[e]<o?a=0:(t[e]=t[e]-o,a=1);if(a>0){for(a=o-1;e<n&&t[e]===a;t[e++]=0);e===n?t[n++]=1:t[e]=t[e]+1}return n}Object.defineProperty(e,"__esModule",{value:!0}),e.default=n},function(t,e,n){"use strict";function r(t,e,n,r,u,o,a){for(var s=u-e+n,f=s;f<o;t[n++]=r[f++]);return i.default(t,e,n,r,u,s,a)}var i=n(67);Object.defineProperty(e,"__esModule",{value:!0}),e.default=r},function(t,e){"use strict";function n(t,e,n){for(var r=0,i=0;i<e;++i)t[i]=(t[i]<<1)+r,t[i]<n?r=0:(r=1,t[i]=t[i]-n);return r>0&&(t[e++]=1),e}Object.defineProperty(e,"__esModule",{value:!0}),e.default=n},function(t,e){"use strict";function n(t,e,n,r){for(var i=0,u=e;u-- >0;t[u]=t[u]>>>1)t[u]=t[u]+i,i=n&-(1&t[u]);if(0!==i&&r){var o=0;for(i=n-1;t[o]===i;t[o++]=0);t[o]=t[o]+1}return[0===t[e-1]?e-1:e,i]}Object.defineProperty(e,"__esModule",{value:!0}),e.default=n},function(t,e){"use strict";function n(t,e,n,r,i,u,o){for(var a=e,s=0;i<u;++a,++i)t[a]=t[a]-s-r[i],t[a]<0?(t[a]=t[a]+o,s=1):s=0;if(s>0){for(s=o-1;0===t[a];t[a++]=s);t[a]=t[a]-1,++a}if(a===n)for(;n>e&&0===t[n-1];--n);return n}Object.defineProperty(e,"__esModule",{value:!0}),e.default=n},function(t,e){"use strict";function n(t,e,n,r,i,u,o){for(var a=0;e<n;++e)t[e]=r[e]-a-t[e],t[e]<0?(t[e]=t[e]+o,a=1):a=0;if(a>0){for(a=o-1;0===r[e];t[e++]=a);t[e]=r[e]-1,++e}for(;e<u;)t[e]=r[e],++e;for(;0===t[e-1];)--e;return e}Object.defineProperty(e,"__esModule",{value:!0}),e.default=n},function(t,e,n){"use strict";function r(t,e,n){return i(t,0,e,n)}function i(t,e,n,r){var s=n-e;if(s<2)return s=t[e]*t[e],s<r?t[n]=0:(t[n++]=0|s/r,s%=r),t[e]=s,n;s=s+1>>>1;var f=e+s,c=new Array(2*s+2);u.copy(c,0,t,e,f);var l=o.default(c,0,s,t,f,n,r);t[n]=0,u.basicShiftUp(t,f,n,s);var v=i(t,e,f,r);u.zero(t,v,n);var d=f+s;return n=i(t,d,n+s,r),l=i(c,0,l,r),l=a.default(c,0,l,t,e,v,r),l=a.default(c,0,l,t,d,n,r),o.default(t,f,n,c,0,l,r)}var u=n(74),o=n(67),a=n(71);Object.defineProperty(e,"__esModule",{value:!0}),e.default=r},function(t,e){"use strict";function n(t,e,n,r){for(var i=e+r;e<n;t[i++]=t[e++]);}function r(t,e,n,r){for(var i=n+r;n>e;t[--i]=t[--n]);}function i(t,e,n,r){for(var i=e-r;e<n;t[i++]=t[e++]);}function u(t,e,n){for(;e<n;)t[e++]=0}function o(t,e,n,r,i){for(;r<i;)t[e++]=n[r++]}function a(t,e,n,r,i){var u="";for(null==r&&(r=i=n,n=e);e<n;u=" "+t[e++]+u);for(u=" ]"+u;e<r;u=" "+t[e++]+u);for(u=" ["+u;e<i;u=" "+t[e++]+u);return u}function s(t,e){return t>e?e:t}function f(t,e){return t<e?e:t}function c(t){return"number"==typeof t}function l(t){return"string"==typeof t}function v(t,e,n,r,i,u){var o=n-e-u+i;if(0!==o)return o<0?-1:1;for(;n>e;)if(t[--n]!==r[--u])return t[n]<r[u]?-1:1;return 0}e.CIPHER=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],e.basicShiftUp=n,e.reverseShiftUp=r,e.basicShiftDown=i,e.zero=u,e.copy=o,e.print=a,e.min=s,e.max=f,e.isNumber=c,e.isString=l,e.compare=v},function(t,e,n){"use strict";function r(t,e,n,r,u){return i(t,0,e,n,0,r,u)}function i(t,e,n,r,f,c,l){var v=u.max(n-e,c-f);if(v<2)return v=t[e]*r[f],v<l?t[n]=0:(t[n++]=0|v/l,v%=l),t[e]=v,n;v=v+1>>>1;var d=e+v,g=u.min(d,n),h=u.min(f+v,c),y=new Array(h-f+1);u.copy(y,0,r,f,h);var p=a.default(y,0,h-f,r,h,c,l),b=new Array(g-e+1+p);u.copy(b,0,t,e,g);var m=a.default(b,0,g-e,t,g,n,l);m=i(b,0,m,y,0,p,l),t[n]=0,u.basicShiftUp(t,g,n,v);var _=i(t,e,g,r,f,h,l);if(m=s.default(b,0,m,t,e,_,l),g===n||h===c)return m>_-d?o.default(t,d,_,b,0,m,l):a.default(t,d,_,b,0,m,l);u.zero(t,_,n);var k=g+v;return n=i(t,k,n+v,r,h,c,l),m=s.default(b,0,m,t,k,n,l),a.default(t,d,n,b,0,m,l)}var u=n(74),o=n(68),a=n(67),s=n(71);Object.defineProperty(e,"__esModule",{value:!0}),e.default=r},function(t,e,n){"use strict";function r(t,e,n,r,s){var f=e-r,c=new Array(f+1);for(o.zero(c,0,f+1);o.compare(t,f,e,n,0,r)>=0;)++c[f],e=a.default(t,f,e,n,0,r,s);for(var l=new Array(r+1),v=r-1,d=v+f;d>v;--d){var g=d-v-1;c[g]=i(t[d],t[d-1],t[d-2],n[v],n[v-1],s);var h=u(n,0,r,c[g],l,s);for(o.compare(l,0,h,t,g,e)>0&&(--c[g],h=a.default(l,0,h,n,0,r,s)),e=a.default(t,g,e,l,0,h,s);e>0&&0===t[e-1];)--e}return[c,t,0===c[f]?f:f+1,e]}function i(t,e,n,r,i,u){var o=t*u+e,a=o%r;return o=0|o/r,a=a*u-o*i+n,a<0&&(a=a+r*u+i,o=a<0?o-2:o-1),o}function u(t,e,n,r,i,u){if(0===r)return 0;for(var o=0,a=0;o<n;)i[o]=t[e++]*r+a,i[o]<u?a=0:(a=0|i[o]/u,i[o]=i[o]%u),++o;return a>0&&(i[o++]=a),o}var o=n(74),a=n(71);Object.defineProperty(e,"__esModule",{value:!0}),e.default=r},function(t,e){"use strict";function n(t,e,n,r){if(1===n)return[t,[],e,0];for(var i=0,u=e;u-- >0;t[u]=0|t[u]/n)t[u]=t[u]+i*r,i=t[u]%n;return[t,[i],0===t[e-1]?e-1:e,0===i?0:1]}Object.defineProperty(e,"__esModule",{value:!0}),e.default=n}])});