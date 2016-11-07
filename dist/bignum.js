(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["BigNum"] = factory();
	else
		root["BigNum"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var bigInteger_1 = __webpack_require__(1);
	exports.BigInteger = bigInteger_1.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _isNan = __webpack_require__(2);

	var _isNan2 = _interopRequireDefault(_isNan);

	var _getPrototypeOf = __webpack_require__(20);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(31);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(32);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(36);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(83);

	var _inherits3 = _interopRequireDefault(_inherits2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var bigNumber_1 = __webpack_require__(91);
	var basicAdditionMethod_1 = __webpack_require__(92);
	var reverseAdditionMethod_1 = __webpack_require__(93);
	var basicDoubleMethod_1 = __webpack_require__(94);
	var basicHalfMethod_1 = __webpack_require__(95);
	var basicSubtractionMethod_1 = __webpack_require__(96);
	var reverseSubtractionMethod_1 = __webpack_require__(97);
	var karatsubaSquareMethod_1 = __webpack_require__(98);
	var basicMultiplicationMethod_1 = __webpack_require__(100);

	var BigInteger = function (_bigNumber_1$default) {
	    (0, _inherits3.default)(BigInteger, _bigNumber_1$default);

	    function BigInteger(input) {
	        (0, _classCallCheck3.default)(this, BigInteger);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (BigInteger.__proto__ || (0, _getPrototypeOf2.default)(BigInteger)).call(this));

	        if (isBigInteger(input)) {
	            BigInteger.clone(_this, input);
	        } else if (isNumber(input)) {
	            _this.convertNumber(input);
	        } else if (isString(input)) {
	            _this.convertString(input);
	        } else {
	            throw TypeError("Expecting type BigInteger | string | number");
	        }
	        return _this;
	    }

	    (0, _createClass3.default)(BigInteger, [{
	        key: 'convertNumber',
	        value: function convertNumber(input) {
	            var n = input;
	            var base = bigNumber_1.default.DEFAULT_BASE;
	            n = (this.isNegative = n < 0) ? -n : n;
	            var digits = Math.ceil(Math.log(n) / Math.log(base));
	            var integer = new Array(digits);
	            for (var i = 0; n != 0; ++i) {
	                integer[i] = n % base;
	                n = (n - integer[i]) / base;
	            }
	            this.base = base;
	            this.digits = digits;
	            this.integer = integer;
	        }
	    }, {
	        key: 'convertString',
	        value: function convertString(s) {
	            s = s.trim();
	            if ((0, _isNan2.default)(s)) {
	                throw TypeError("NaN");
	            }
	            this.isNegative = s[0] === '-';
	            s = s.replace(/^[-+]?0+|\.[0-9]+$/gm, '');
	            this.base = 10;
	            this.digits = s.length;
	            var integer = this.integer = new Array(this.digits);
	            for (var i = 0, j = this.digits; j > 0; integer[i++] = 0 | s[--j]) {}
	            BigInteger.toBase(this, bigNumber_1.default.DEFAULT_BASE);
	        }
	    }, {
	        key: 'abs',
	        value: function abs() {
	            return this.clone().mAbs();
	        }
	    }, {
	        key: 'mAbs',
	        value: function mAbs() {
	            this.isNegative = false;
	            return this;
	        }
	    }, {
	        key: 'negate',
	        value: function negate() {
	            return this.clone().mNegate();
	        }
	    }, {
	        key: 'mNegate',
	        value: function mNegate() {
	            this.isNegative = this.digits === 0 ? false : this.isNegative === false;
	            return this;
	        }
	    }, {
	        key: 'signum',
	        value: function signum() {
	            return this.isNegative ? -1 : this.digits === 0 ? 0 : 1;
	        }
	    }, {
	        key: 'clone',
	        value: function clone() {
	            return new BigInteger(this);
	        }
	    }, {
	        key: 'toZero',
	        value: function toZero() {
	            this.isNegative = false;
	            this.integer = [];
	            this.digits = 0;
	        }
	    }, {
	        key: 'toOne',
	        value: function toOne() {
	            this.isNegative = false;
	            this.integer = [1];
	            this.digits = 1;
	        }
	    }, {
	        key: 'setBase',
	        value: function setBase(base) {
	            return this.clone().mSetBase(base);
	        }
	    }, {
	        key: 'mSetBase',
	        value: function mSetBase(base) {
	            base = BigInteger.sanitizeBase(base);
	            if (this.base !== base) {
	                BigInteger.toBase(this, base);
	            }
	            return this;
	        }
	    }, {
	        key: 'equals',
	        value: function equals(n) {
	            return this.compareTo(n) === 0;
	        }
	    }, {
	        key: 'compareTo',
	        value: function compareTo(b) {
	            var a = this;
	            if (a === b) {
	                return 0;
	            }
	            if (a.isNegative !== b.isNegative) {
	                return a.isNegative ? -1 : 1;
	            }
	            if (a.digits < 2 && b.digits < 2) {
	                if (a.digits !== b.digits) {
	                    return a.digits < b.digits ? -1 : 1;
	                }
	                if (a.digits === 0 || a.integer[0] === b.integer[0]) {
	                    return 0;
	                }
	                return a.integer[0] < b.integer[0] ? -1 : 1;
	            }
	            var out = -1;
	            if (a.base !== b.base) {
	                if (a.base > b.base) {
	                    var c = a;
	                    a = b;
	                    b = c;
	                    out = 1;
	                }
	                var ratio = Math.log(a.base) / Math.log(b.base);
	                if (b.digits < Math.ceil(a.digits * ratio)) {
	                    return -out;
	                }
	                if (b.digits > Math.ceil((a.digits + 1) * ratio)) {
	                    return out;
	                }
	                a = a.clone();
	                BigInteger.toBase(a, b.base);
	            }
	            if (a.digits !== b.digits) {
	                return a.digits < b.digits ? out : -out;
	            }
	            for (var i = a.digits; i-- > 0;) {
	                if (a.integer[i] !== b.integer[i]) {
	                    return a.integer[i] < b.integer[i] ? out : -out;
	                }
	            }
	            return 0;
	        }
	    }, {
	        key: 'isOdd',
	        value: function isOdd() {
	            return !this.isEven();
	        }
	    }, {
	        key: 'isEven',
	        value: function isEven() {
	            if (this.digits === 0) {
	                return true;
	            }
	            if ((this.base & 1) === 0) {
	                return (this.integer[0] & 1) === 0;
	            }
	            var isEven = true;
	            var integer = this.integer;
	            for (var len = this.digits; len > 0; isEven = isEven === ((integer[--len] & 1) === 0)) {}
	            return isEven;
	        }
	    }, {
	        key: 'double',
	        value: function double() {
	            return this.clone().mDouble();
	        }
	    }, {
	        key: 'mDouble',
	        value: function mDouble() {
	            if (this.digits === 0) {
	                return this;
	            }
	            this.integer.length = this.digits = basicDoubleMethod_1.default(this.integer, this.digits, this.base);
	            return this;
	        }
	    }, {
	        key: 'half',
	        value: function half() {
	            return this.clone().mHalf();
	        }
	    }, {
	        key: 'mHalf',
	        value: function mHalf() {
	            if (this.digits === 0) {
	                return this;
	            }
	            this.integer.length = this.digits = basicHalfMethod_1.default(this.integer, this.digits, this.base, this.isNegative);
	            return this;
	        }
	    }, {
	        key: 'add',
	        value: function add(addend) {
	            return this.clone().mAdd(addend);
	        }
	    }, {
	        key: 'mAdd',
	        value: function mAdd(addend) {
	            var adduend = this;
	            if (adduend === addend) {
	                return adduend.mDouble();
	            }
	            if (addend.digits === 0) {
	                return adduend;
	            }
	            if (adduend.digits === 0) {
	                var base = adduend.base;
	                BigInteger.clone(adduend, addend);
	                if (base !== adduend.base) {
	                    BigInteger.toBase(adduend, base);
	                }
	                return adduend;
	            }
	            if (adduend.base !== addend.base) {
	                addend = addend.clone();
	                BigInteger.toBase(addend, adduend.base);
	            }
	            if (adduend.isNegative !== addend.isNegative) {
	                return adduend.mNegate().mSubtract(addend).mNegate();
	            }
	            adduend.integer.length = adduend.digits < addend.digits ? addend.digits + 1 : adduend.digits + 1;
	            adduend.integer.length = adduend.digits = (adduend.digits < addend.digits ? reverseAdditionMethod_1.default : basicAdditionMethod_1.default)(adduend.integer, 0, adduend.digits, addend.integer, 0, addend.digits, adduend.base);
	            return adduend;
	        }
	    }, {
	        key: 'subtract',
	        value: function subtract(subtrahend) {
	            return this.clone().mSubtract(subtrahend);
	        }
	    }, {
	        key: 'mSubtract',
	        value: function mSubtract(subtrahend) {
	            var minuend = this;
	            if (minuend === subtrahend) {
	                minuend.toZero();
	                return minuend;
	            }
	            if (subtrahend.digits === 0) {
	                return minuend;
	            }
	            if (minuend.digits === 0) {
	                var base = minuend.base;
	                BigInteger.clone(minuend, subtrahend);
	                if (base !== minuend.base) {
	                    BigInteger.toBase(minuend, base);
	                }
	                return minuend.mNegate();
	            }
	            if (minuend.base !== subtrahend.base) {
	                subtrahend = subtrahend.clone();
	                BigInteger.toBase(subtrahend, minuend.base);
	            }
	            if (minuend.isNegative !== subtrahend.isNegative) {
	                return minuend.mNegate().mAdd(subtrahend).mNegate();
	            }
	            var comparison = minuend.compareTo(subtrahend);
	            if (comparison === 0) {
	                minuend.toZero();
	                return minuend;
	            }
	            if (comparison < 0) {
	                minuend.mNegate();
	                minuend.integer.length = minuend.digits = reverseSubtractionMethod_1.default(minuend.integer, minuend.digits, subtrahend.integer, subtrahend.digits, minuend.base);
	            } else {
	                minuend.integer.length = minuend.digits = basicSubtractionMethod_1.default(minuend.integer, 0, minuend.digits, subtrahend.integer, 0, subtrahend.digits, minuend.base);
	            }
	            return minuend;
	        }
	    }, {
	        key: 'square',
	        value: function square() {
	            return this.clone().mSquare();
	        }
	    }, {
	        key: 'mSquare',
	        value: function mSquare() {
	            var multiplicand = this;
	            if (multiplicand.digits === 0) {
	                return multiplicand;
	            }
	            if (multiplicand.isNegative) {
	                multiplicand.isNegative = false;
	            }
	            if (multiplicand.digits === 1) {
	                if (multiplicand.integer[0] === 1) {
	                    return multiplicand;
	                }
	                if (multiplicand.integer[0] === 2) {
	                    return multiplicand.mDouble();
	                }
	            }
	            multiplicand.integer.length = 2 * multiplicand.digits;
	            multiplicand.integer.length = multiplicand.digits = karatsubaSquareMethod_1.default(multiplicand.integer, multiplicand.digits, multiplicand.base);
	            return multiplicand;
	        }
	    }, {
	        key: 'multiply',
	        value: function multiply(multiplier) {
	            return this.clone().mMultiply(multiplier);
	        }
	    }, {
	        key: 'mMultiply',
	        value: function mMultiply(multiplier) {
	            var multiplicand = this;
	            if (multiplicand === multiplier) {
	                return multiplicand.mSquare();
	            }
	            if (multiplicand.digits === 0) {
	                return multiplicand;
	            }
	            if (multiplier.digits === 0) {
	                multiplicand.toZero();
	                return multiplicand;
	            }
	            multiplicand.isNegative = multiplicand.isNegative !== multiplier.isNegative;
	            if (multiplicand.digits === 1 && multiplicand.integer[0] < 3) {
	                var base = multiplicand.base;
	                BigInteger.clone(multiplicand, multiplier);
	                if (multiplicand.base !== base) {
	                    BigInteger.toBase(multiplicand, base);
	                }
	                if (multiplicand.integer[0] === 2) {
	                    multiplicand.mDouble();
	                }
	                return multiplicand;
	            }
	            if (multiplier.digits === 1 && multiplier.integer[0] < 3) {
	                return multiplier.integer[0] === 1 ? multiplicand : multiplicand.mDouble();
	            }
	            if (multiplicand.base !== multiplier.base) {
	                multiplier = multiplier.clone();
	                BigInteger.toBase(multiplier, multiplicand.base);
	            }
	            multiplicand.integer.length = multiplicand.digits + multiplier.digits;
	            multiplicand.integer.length = multiplicand.digits = basicMultiplicationMethod_1.default(multiplicand.integer, multiplicand.digits, multiplier.integer, multiplier.digits, multiplicand.base);
	            return multiplicand;
	        }
	    }, {
	        key: 'divide',
	        value: function divide(divisor) {
	            return this.clone().mDivide(divisor);
	        }
	    }, {
	        key: 'mDivide',
	        value: function mDivide(divisor) {
	            var dividend = this;
	            if (dividend === divisor) {
	                dividend.toOne();
	                return dividend;
	            }
	            if (divisor.digits === 0) {
	                throw EvalError("Divide by Zero");
	            }
	            if (dividend.digits === 0) {
	                return dividend;
	            }
	            dividend.isNegative = dividend.isNegative !== divisor.isNegative;
	            if (divisor.digits === 1 && divisor.integer[0] < 3) {
	                return divisor.integer[0] === 1 ? dividend : dividend.mHalf();
	            }
	            throw Error("D");
	        }
	    }], [{
	        key: 'clone',
	        value: function clone(_clone, original) {
	            _clone.isNegative = original.isNegative;
	            _clone.integer = original.integer.slice(0);
	            _clone.base = original.base;
	            _clone.digits = original.digits;
	        }
	    }, {
	        key: 'sanitizeBase',
	        value: function sanitizeBase(base) {
	            base = 0 | base;
	            if (base < BigInteger.MIN_BASE) {
	                throw RangeError(base + " < BigInteger.MIN_BASE (" + BigInteger.MIN_BASE + ")");
	            }
	            if (base > BigInteger.MAX_BASE) {
	                throw RangeError(base + " > BigInteger.MAX_BASE (" + BigInteger.MAX_BASE + ")");
	            }
	            return base;
	        }
	    }, {
	        key: 'toBase',
	        value: function toBase(n, newBase) {
	            var curInteger = n.integer;
	            var curBase = n.base;
	            var curDigits = n.digits;
	            var newInteger = new Array(Math.ceil(curDigits * Math.log(curBase) / Math.log(newBase)));
	            var newDigits = 0;
	            for (var len = curDigits; len > 0; ++newDigits) {
	                var remainder = 0;
	                for (var i = len; i-- > 0; remainder = remainder % newBase) {
	                    remainder = remainder * curBase + curInteger[i];
	                    curInteger[i] = remainder < newBase ? 0 : 0 | remainder / newBase;
	                }
	                for (newInteger[newDigits] = remainder; curInteger[len - 1] < 1; --len) {}
	            }
	            newInteger.length = newDigits;
	            n.base = newBase;
	            n.digits = newDigits;
	            n.integer = newInteger;
	        }
	    }, {
	        key: 'min',
	        value: function min(a, b) {
	            return BigInteger.mMin(a, b).clone();
	        }
	    }, {
	        key: 'mMin',
	        value: function mMin(a, b) {
	            return a.compareTo(b) > 0 ? b : a;
	        }
	    }, {
	        key: 'max',
	        value: function max(a, b) {
	            return BigInteger.mMax(a, b).clone();
	        }
	    }, {
	        key: 'mMax',
	        value: function mMax(a, b) {
	            return a.compareTo(b) < 0 ? b : a;
	        }
	    }]);
	    return BigInteger;
	}(bigNumber_1.default);

	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = BigInteger;
	function isBigInteger(n) {
	    return n instanceof BigInteger;
	}
	function isNumber(n) {
	    return typeof n === "number";
	}
	function isString(s) {
	    return typeof s === "string";
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(3), __esModule: true };

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(4);
	module.exports = __webpack_require__(7).Number.isNaN;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.4 Number.isNaN(number)
	var $export = __webpack_require__(5);

	$export($export.S, 'Number', {
	  isNaN: function isNaN(number){
	    return number != number;
	  }
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(6)
	  , core      = __webpack_require__(7)
	  , ctx       = __webpack_require__(8)
	  , hide      = __webpack_require__(10)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 6 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 7 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(9);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(11)
	  , createDesc = __webpack_require__(19);
	module.exports = __webpack_require__(15) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(12)
	  , IE8_DOM_DEFINE = __webpack_require__(14)
	  , toPrimitive    = __webpack_require__(18)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(15) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(13);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(15) && !__webpack_require__(16)(function(){
	  return Object.defineProperty(__webpack_require__(17)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(16)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(13)
	  , document = __webpack_require__(6).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(13);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(21), __esModule: true };

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(22);
	module.exports = __webpack_require__(7).Object.getPrototypeOf;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject        = __webpack_require__(23)
	  , $getPrototypeOf = __webpack_require__(25);

	__webpack_require__(30)('getPrototypeOf', function(){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(24);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(26)
	  , toObject    = __webpack_require__(23)
	  , IE_PROTO    = __webpack_require__(27)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(28)('keys')
	  , uid    = __webpack_require__(29);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(6)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(5)
	  , core    = __webpack_require__(7)
	  , fails   = __webpack_require__(16);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 31 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(33);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(34), __esModule: true };

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(35);
	var $Object = __webpack_require__(7).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(5);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(15), 'Object', {defineProperty: __webpack_require__(11).f});

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _typeof2 = __webpack_require__(37);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(38);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(67);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(39), __esModule: true };

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(40);
	__webpack_require__(62);
	module.exports = __webpack_require__(66).f('iterator');

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(41)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(43)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(42)
	  , defined   = __webpack_require__(24);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 42 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(44)
	  , $export        = __webpack_require__(5)
	  , redefine       = __webpack_require__(45)
	  , hide           = __webpack_require__(10)
	  , has            = __webpack_require__(26)
	  , Iterators      = __webpack_require__(46)
	  , $iterCreate    = __webpack_require__(47)
	  , setToStringTag = __webpack_require__(60)
	  , getPrototypeOf = __webpack_require__(25)
	  , ITERATOR       = __webpack_require__(61)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(10);

/***/ },
/* 46 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(48)
	  , descriptor     = __webpack_require__(19)
	  , setToStringTag = __webpack_require__(60)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(10)(IteratorPrototype, __webpack_require__(61)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(12)
	  , dPs         = __webpack_require__(49)
	  , enumBugKeys = __webpack_require__(58)
	  , IE_PROTO    = __webpack_require__(27)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(17)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(59).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(11)
	  , anObject = __webpack_require__(12)
	  , getKeys  = __webpack_require__(50);

	module.exports = __webpack_require__(15) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(51)
	  , enumBugKeys = __webpack_require__(58);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(26)
	  , toIObject    = __webpack_require__(52)
	  , arrayIndexOf = __webpack_require__(55)(false)
	  , IE_PROTO     = __webpack_require__(27)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(53)
	  , defined = __webpack_require__(24);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(54);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 54 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(52)
	  , toLength  = __webpack_require__(56)
	  , toIndex   = __webpack_require__(57);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(42)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(42)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 58 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(6).document && document.documentElement;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(11).f
	  , has = __webpack_require__(26)
	  , TAG = __webpack_require__(61)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(28)('wks')
	  , uid        = __webpack_require__(29)
	  , Symbol     = __webpack_require__(6).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(63);
	var global        = __webpack_require__(6)
	  , hide          = __webpack_require__(10)
	  , Iterators     = __webpack_require__(46)
	  , TO_STRING_TAG = __webpack_require__(61)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(64)
	  , step             = __webpack_require__(65)
	  , Iterators        = __webpack_require__(46)
	  , toIObject        = __webpack_require__(52);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(43)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 64 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 65 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(61);

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(68), __esModule: true };

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(69);
	__webpack_require__(80);
	__webpack_require__(81);
	__webpack_require__(82);
	module.exports = __webpack_require__(7).Symbol;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(6)
	  , has            = __webpack_require__(26)
	  , DESCRIPTORS    = __webpack_require__(15)
	  , $export        = __webpack_require__(5)
	  , redefine       = __webpack_require__(45)
	  , META           = __webpack_require__(70).KEY
	  , $fails         = __webpack_require__(16)
	  , shared         = __webpack_require__(28)
	  , setToStringTag = __webpack_require__(60)
	  , uid            = __webpack_require__(29)
	  , wks            = __webpack_require__(61)
	  , wksExt         = __webpack_require__(66)
	  , wksDefine      = __webpack_require__(71)
	  , keyOf          = __webpack_require__(72)
	  , enumKeys       = __webpack_require__(73)
	  , isArray        = __webpack_require__(76)
	  , anObject       = __webpack_require__(12)
	  , toIObject      = __webpack_require__(52)
	  , toPrimitive    = __webpack_require__(18)
	  , createDesc     = __webpack_require__(19)
	  , _create        = __webpack_require__(48)
	  , gOPNExt        = __webpack_require__(77)
	  , $GOPD          = __webpack_require__(79)
	  , $DP            = __webpack_require__(11)
	  , $keys          = __webpack_require__(50)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(78).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(75).f  = $propertyIsEnumerable;
	  __webpack_require__(74).f = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(44)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(10)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(29)('meta')
	  , isObject = __webpack_require__(13)
	  , has      = __webpack_require__(26)
	  , setDesc  = __webpack_require__(11).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(16)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(6)
	  , core           = __webpack_require__(7)
	  , LIBRARY        = __webpack_require__(44)
	  , wksExt         = __webpack_require__(66)
	  , defineProperty = __webpack_require__(11).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(50)
	  , toIObject = __webpack_require__(52);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(50)
	  , gOPS    = __webpack_require__(74)
	  , pIE     = __webpack_require__(75);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 74 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 75 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(54);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(52)
	  , gOPN      = __webpack_require__(78).f
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(51)
	  , hiddenKeys = __webpack_require__(58).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(75)
	  , createDesc     = __webpack_require__(19)
	  , toIObject      = __webpack_require__(52)
	  , toPrimitive    = __webpack_require__(18)
	  , has            = __webpack_require__(26)
	  , IE8_DOM_DEFINE = __webpack_require__(14)
	  , gOPD           = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(15) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 80 */
/***/ function(module, exports) {

	

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(71)('asyncIterator');

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(71)('observable');

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _setPrototypeOf = __webpack_require__(84);

	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

	var _create = __webpack_require__(88);

	var _create2 = _interopRequireDefault(_create);

	var _typeof2 = __webpack_require__(37);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }

	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(85), __esModule: true };

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(86);
	module.exports = __webpack_require__(7).Object.setPrototypeOf;

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(5);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(87).set});

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(13)
	  , anObject = __webpack_require__(12);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(8)(Function.call, __webpack_require__(79).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(89), __esModule: true };

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(90);
	var $Object = __webpack_require__(7).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(5)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(48)});

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _classCallCheck2 = __webpack_require__(31);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(32);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var BigNumber = function () {
	    function BigNumber() {
	        (0, _classCallCheck3.default)(this, BigNumber);
	    }

	    (0, _createClass3.default)(BigNumber, [{
	        key: "getBase",
	        value: function getBase() {
	            return this.base;
	        }
	    }], [{
	        key: "MIN_BASE",
	        get: function get() {
	            return 2;
	        }
	    }, {
	        key: "MAX_BASE",
	        get: function get() {
	            return 94906265;
	        }
	    }]);
	    return BigNumber;
	}();

	BigNumber.DECIMAL_BASE = 10000000;
	BigNumber.BINARY_BASE = 67108864;
	BigNumber.DEFAULT_BASE = BigNumber.BINARY_BASE;
	BigNumber.MAX_DIGITS = 4294967295;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = BigNumber;

/***/ },
/* 92 */
/***/ function(module, exports) {

	"use strict";

	function BasicAdditionMethod(A, minA, maxA, B, minB, maxB, base) {
	    var carry = 0;
	    for (; minB < maxB; ++minA, ++minB) {
	        A[minA] = A[minA] + B[minB] + carry;
	        if (A[minA] < base) {
	            carry = 0;
	        } else {
	            A[minA] = A[minA] - base;
	            carry = 1;
	        }
	    }
	    if (carry > 0) {
	        for (carry = base - 1; minA < maxA && A[minA] === carry; A[minA++] = 0) {}
	        if (minA === maxA) {
	            A[maxA++] = 1;
	        } else {
	            A[minA] = A[minA] + 1;
	        }
	    }
	    return maxA;
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = BasicAdditionMethod;

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var basicAdditionMethod_1 = __webpack_require__(92);
	function ReverseAdditionMethod(A, minA, maxA, B, minB, maxB, base) {
	    var newMaxB = minB - minA + maxA;
	    for (var b = newMaxB; b < maxB; A[maxA++] = B[b++]) {}
	    return basicAdditionMethod_1.default(A, minA, maxA, B, minB, newMaxB, base);
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = ReverseAdditionMethod;

/***/ },
/* 94 */
/***/ function(module, exports) {

	"use strict";

	function basicDoubleMethod(A, len, base) {
	    var carry = 0;
	    for (var i = 0; i < len; ++i) {
	        A[i] = (A[i] << 1) + carry;
	        if (A[i] < base) {
	            carry = 0;
	        } else {
	            carry = 1;
	            A[i] = A[i] - base;
	        }
	    }
	    if (carry > 0) {
	        A[len++] = 1;
	    }
	    return len;
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = basicDoubleMethod;

/***/ },
/* 95 */
/***/ function(module, exports) {

	"use strict";

	function basicHalfMethod(integer, digits, base, isNegative) {
	    var remainder = 0;
	    for (var i = digits; i-- > 0; integer[i] = integer[i] >> 1) {
	        remainder = remainder === 0 ? 0 : base;
	        integer[i] = integer[i] + remainder;
	        remainder = integer[i] & 1;
	    }
	    if (remainder !== 0 && isNegative) {
	        var _i = 0;
	        for (remainder = base - 1; integer[_i] === remainder; integer[_i++] = 0) {}
	        integer[_i] = integer[_i] + 1;
	    }
	    return integer[digits - 1] === 0 ? digits - 1 : digits;
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = basicHalfMethod;
	;

/***/ },
/* 96 */
/***/ function(module, exports) {

	"use strict";

	function BasicSubtractionMethod(A, minA, maxA, B, minB, maxB, base) {
	    var a = minA;
	    var borrow = 0;
	    for (; minB < maxB; ++a, ++minB) {
	        A[a] = A[a] - borrow - B[minB];
	        if (A[a] < 0) {
	            A[a] = A[a] + base;
	            borrow = 1;
	        } else {
	            borrow = 0;
	        }
	    }
	    if (borrow > 0) {
	        for (borrow = base - 1; A[a] === 0; A[a++] = borrow) {}
	        A[a] = A[a] - 1;
	        ++a;
	    }
	    if (a === maxA) {
	        for (; maxA > minA && A[maxA - 1] === 0; --maxA) {}
	    }
	    return maxA;
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = BasicSubtractionMethod;

/***/ },
/* 97 */
/***/ function(module, exports) {

	"use strict";

	function reverseSubtractionMethod(A, lenA, B, lenB, base) {
	    var i = 0;
	    for (var borrow = 0; i < lenA; ++i) {
	        A[i] = B[i] - borrow - A[i];
	        if (A[i] < 0) {
	            A[i] = A[i] + base;
	            borrow = 1;
	        } else {
	            borrow = 0;
	        }
	    }
	    for (var j = base - 1; i < lenB && B[i] === 0; A[i++] = j) {}
	    for (A[i] = B[i] - 1; ++i < lenB; A[i] = B[i]) {}
	    return B[lenB - 1] === 0 ? lenB - 1 : lenB;
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = reverseSubtractionMethod;

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var util_1 = __webpack_require__(99);
	var basicAdditionMethod_1 = __webpack_require__(92);
	var basicSubtractionMethod_1 = __webpack_require__(96);
	function KaratsubaSquareMethod(A, len, base) {
	    A[len] = 0;
	    return square(A, 0, len, base);
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = KaratsubaSquareMethod;
	function square(A, min, max, base) {
	    var halfLen = max - min;
	    if (halfLen < 2) {
	        halfLen = A[min] * A[min];
	        if (halfLen < base) {
	            A[max] = 0;
	        } else {
	            A[max++] = 0 | halfLen / base;
	            halfLen = halfLen % base;
	        }
	        A[min] = halfLen;
	        return max;
	    }
	    halfLen = halfLen + 1 >> 1;
	    var mid = min + halfLen;
	    var medium = new Array(halfLen + 1 << 1);
	    util_1.copy(medium, 0, A, min, mid);
	    var mediumMax = basicAdditionMethod_1.default(medium, 0, halfLen, A, mid, max, base);
	    util_1.basicShiftUp(A, mid, max, halfLen);
	    var lowMax = square(A, min, mid, base);
	    var highMin = mid + halfLen;
	    util_1.zero(A, lowMax, highMin);
	    max = square(A, highMin, max + halfLen, base);
	    medium[mediumMax] = 0;
	    mediumMax = square(medium, 0, mediumMax, base);
	    mediumMax = basicSubtractionMethod_1.default(medium, 0, mediumMax, A, min, lowMax, base);
	    mediumMax = basicSubtractionMethod_1.default(medium, 0, mediumMax, A, highMin, max, base);
	    return basicAdditionMethod_1.default(A, mid, max, medium, 0, mediumMax, base);
	}

/***/ },
/* 99 */
/***/ function(module, exports) {

	"use strict";

	function basicShiftUp(A, min, max, shifts) {
	    for (var i = min + shifts; min < max; A[i++] = A[min++]) {}
	}
	exports.basicShiftUp = basicShiftUp;
	function reverseShiftUp(A, min, max, shifts) {
	    var mid = max - shifts;
	    basicShiftUp(A, mid, max, shifts);
	    basicShiftUp(A, min, mid, shifts);
	}
	exports.reverseShiftUp = reverseShiftUp;
	function basicShiftDown(A, min, max, shifts) {
	    for (var i = min - shifts; min < max; A[i++] = A[min++]) {}
	}
	exports.basicShiftDown = basicShiftDown;
	function zero(A, min, max) {
	    while (min < max) {
	        A[min++] = 0;
	    }
	}
	exports.zero = zero;
	function copy(A, minA, B, minB, maxB) {
	    while (minB < maxB) {
	        A[minA++] = B[minB++];
	    }
	}
	exports.copy = copy;
	function print(A, min, low, high, max) {
	    var s = "";
	    if (high == null) {
	        high = max = low;
	        low = min;
	    }
	    for (; min < low; s = " " + A[min++] + s) {}
	    s = " ]" + s;
	    for (; min < high; s = " " + A[min++] + s) {}
	    s = " [" + s;
	    for (; min < max; s = " " + A[min++] + s) {}
	    return s;
	}
	exports.print = print;

/***/ },
/* 100 */
/***/ function(module, exports) {

	"use strict";

	function BasicMultiplicationMethod(A, lenA, B, lenB, base) {
	    var lenC = lenA + lenB;
	    for (var i = lenA - lenB, j = lenA; i < lenA; A[j++] = A[i++]) {}
	    for (var _i = 0, _j = lenB; _j < lenA; A[_j++] = A[_i++]) {}
	    for (var _i2 = 0; _i2 < lenB; A[_i2++] = 0) {}
	    for (var a = lenB; a < lenC; ++a) {
	        var carry = 0;
	        var _i3 = a - lenB;
	        for (var b = 0; b < lenB; ++b) {
	            var result = A[a] * B[b] + A[_i3] + carry;
	            if (result < base) {
	                carry = 0;
	            } else {
	                carry = 0 | result / base;
	                result = result % base;
	            }
	            A[_i3++] = result;
	        }
	        A[_i3] = carry;
	    }
	    return A[lenC - 1] === 0 ? lenC - 1 : lenC;
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = BasicMultiplicationMethod;

/***/ }
/******/ ])
});
;