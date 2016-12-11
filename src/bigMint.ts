import BasicAdditionMethod from './add/basicAdditionMethod';
import ReverseAdditionMethod from './add/reverseAdditionMethod';
import BasicDoubleMethod from './mul/basicDoubleMethod';
import BasicHalfMethod from './div/basicHalfMethod';
import BasicSubtractionMethod from './sub/basicSubtractionMethod';
import ReverseSubtractionMethod from './sub/reverseSubtractionMethod';
import KaratsubaSquareMethod from './mul/karatsubaSquareMethod';
import KaratsubaMultiplicationMethod from './mul/karatsubaMultiplicationMethod';
import BasicDivisionMethod from './div/basicDivisionMethod';
import SimpleDivisionMethod from './div/simpleDivisionMethod';
import SimpleMultiplicationMethod from './mul/simpleMultiplicationMethod';
import {CIPHER, compare, isNumber, isString} from './util';

export default class BigMint {

  ////////////////////////
  // CONSTANTS
  ////////////////////////

  public static readonly MIN_BASE: number = 2;
  public static readonly MAX_BASE: number = 94906265; //2^26 < sqrt(Number.MAX_SAFE_INTEGER) < 2^27
  private static readonly DEFAULT_BASE: number = 94906264;
  //private static readonly MAX_DIGITS: number = 4294967295; //2^32 - 1

  ////////////////////////
  // PROPERTIES
  ///////////////////////

  private base: number;
  private digits: number;
  private integer: number[];
  private isNegative: boolean;

  ////////////////////////
  // CONSTRUCTOR
  ////////////////////////
  public static get MINUS_ONE(): BigMint {return new BigMint(-1)};
  public static get ZERO(): BigMint {return new BigMint(0)};
  public static get ONE(): BigMint {return new BigMint(1)};

  constructor(input: BigMint | number | string) {
    if(BigMint.isBigMint(input)){
      this._assign(input);
    } else if(isNumber(input)){
      this.convertNumber(input);
    } else if(isString(input)){
      this.convertString(input);
    } else {
      throw TypeError("Expecting type BigMint | string | number");
    }
  }

  public static isBigMint(n: any): n is BigMint {
    return n instanceof BigMint;
  }

  public static toBigMint(input: BigMint | number | string): BigMint {
    return BigMint.isBigMint(input) ? input : new BigMint(input);
  }

  private convertNumber(n: number): void {
    const base: number = this.base = BigMint.DEFAULT_BASE;

    //If n is between [-1, 1]
    if((n >>> 1) === 0){
      if(n === 0){
        this.toZero();
      } else {
        this.toOne();
        if(n < 0){
          this.isNegative = true;
        }
      }
      return;
    }

    n = (this.isNegative = n < 0) ? -n : n;
    const digits: number = Math.ceil(Math.log(n) / Math.log(base));
    const integer: number[] = new Array<number>(digits);
    for(let i: number = 0; n != 0; ++i){
      integer[i] = n % base;
      n = (n - integer[i]) / base;
    }
    this.digits = digits;
    this.integer = integer;
  }

  private convertString(s: String): void {
    s = s.trim();

    //Check if string is a number
    if(Number.isNaN(<any>s)){
      throw TypeError("NaN");
    }

    //Check for leading sign
    this.isNegative = s[0] === '-';

    //Trim signs, leading zeros and decimal part
    s = s.replace(/^[-+]?0+|\.[0-9]+$/gm, '');

    //Convert to decimal array
    this.base = 10;
    this.digits = s.length;
    const integer: number[] = this.integer = new Array<number>(this.digits);
    for(let i = 0, j = this.digits; j > 0; integer[i++] = 0 | <any>s[--j]){
    }

    //Convert to default base
    this.toBase(BigMint.DEFAULT_BASE);
  }

  ////////////////////////
  // SIGN
  ////////////////////////

  public abs(): BigMint {

    //Make number positive
    this.isNegative = false;

    return this;
  };

  public signum(): number {
    return this.isNegative ? -1 : this.digits === 0 ? 0 : 1;
  };

  ////////////////////////
  // UPDATE
  ////////////////////////

  public clone(): BigMint {
    return new BigMint(this);
  }

  //private tryClone(v: BigMint | number | string): BigMint {
  //  return BigMint.isBigMint(v) ? v.clone() : new BigMint(v);
  //}

  private copy(source: BigMint): BigMint {
    this.isNegative = source.isNegative;
    this.integer = source.integer;
    this.digits = source.digits;
    this.base = source.base;
    return this;
  }

  public assign(source: BigMint | number | string, keepBase: boolean = false): BigMint {
    return this._assign(BigMint.toBigMint(source), keepBase);
  }

  private _assign(source: BigMint, keepBase: boolean = false): BigMint {
    const originalBase: number = this.base;
    const target: BigMint = this.copy(source);
    target.integer = target.integer.slice(0);
    if(keepBase && target.base !== originalBase){
      target.toBase(originalBase);
    }
    return target;
  }

  private toZero(): BigMint {
    this.isNegative = false;
    this.integer = [];
    this.digits = 0;
    return this;
  }

  private toOne(): BigMint {
    this.isNegative = false;
    this.integer = [1];
    this.digits = 1;
    return this;
  }

  ////////////////////////
  // BASE
  ////////////////////////

  public getBase(): number {
    return this.base;
  }

  public setBase(base: number): BigMint {

    //Sanitize base
    base = 0 | base;

    //Check if already in base
    if(this.base === base){
      return this;
    }

    //Check if new base too low
    if(base < BigMint.MIN_BASE){
      throw RangeError(base + " < BigMint.MIN_BASE (" + BigMint.MIN_BASE + ")");
    }

    //Check if new base too high
    if(base > BigMint.MAX_BASE){
      throw RangeError(base + " > BigMint.MAX_BASE (" + BigMint.MAX_BASE + ")");
    }

    //Convert to base
    return this.toBase(base);
  }

  private toBase(newBase: number): BigMint {
    const n: BigMint = this;
    const curInteger: number[] = n.integer;
    const curBase: number = n.base;
    const curDigits: number = n.digits;
    const newInteger: number[] = new Array(Math.ceil(
      curDigits * Math.log(curBase) / Math.log(newBase)
    ));

    //Update number
    let newDigits: number = 0;
    for(let len = curDigits; len > 0; ++newDigits){
      let remainder: number = 0;
      for(let i: number = len; i-- > 0; remainder = remainder % newBase){
        remainder = remainder*curBase + curInteger[i];
        curInteger[i] = (remainder < newBase) ? 0 : 0 | (remainder / newBase);
      }
      for(newInteger[newDigits] = remainder; curInteger[len - 1] < 1; --len){
      }
    }

    newInteger.length = newDigits;
    n.base = newBase;
    n.digits = newDigits;
    n.integer = newInteger;

    return n;
  }

  ////////////////////////
  // TO STRING
  ////////////////////////

  public toString(base: number = this.base, cipher: string[] | ((v: number, i: number, n: number) => string) = CIPHER, sep: string = ""): string {

    //Set base
    if(this.base !== base){
      return this.setBase(base).toString(base, cipher, sep);
    }

    //Check cipher
    if(cipher === null || cipher instanceof Array && base > cipher.length){
      const pad: string = new Array(("" + (base-1)).length + 1).join('0');
      cipher = (v: number, i: number, n: number): string => {
        const s: string = "" + v;
        return i+1 === n ? s : pad.substring(s.length) + s;
      };
    }

    //Check if zero
    if(this.digits === 0){
      return (cipher instanceof Array) ? cipher[0] : cipher(0, 0, 0);
    }

    let s: string;
    const A: number[] = this.integer;

    //Print with cipher
    if(cipher instanceof Array){
      s = cipher[A[0]];
      for(let i: number = 1, j: number = this.digits; i < j; s = cipher[A[i++]] + sep + s){
      }

    //Print with custom function
    } else {
      s = cipher(A[0], 0, this.digits);
      for(let i: number = 1, j: number = this.digits; i < j; ++i){
        s = cipher(A[i], i, j) + sep + s;
      }
    }

    //If negative
    if(this.isNegative){
      s = "-" + s;
    }

    //Return string
    return s;
  }

  ////////////////////////
  // COMPARE
  ////////////////////////

  public lt(n: BigMint | number | string): boolean {
    return this.compareTo(n) < 0;
  }

  public lessThan(n: BigMint | number | string): boolean {
    return this.lt(n);
  }

  public lteq(n: BigMint | number | string): boolean {
    return this.compareTo(n) <= 0;
  }

  public lessThanEquals(n: BigMint | number | string): boolean {
    return this.lteq(n);
  }

  public eq(n: BigMint | number | string): boolean {
    return this.compareTo(n) === 0;
  }

  public equals(n: BigMint | number | string): boolean {
    return this.eq(n);
  }

  public gteq(n: BigMint | number | string): boolean {
    return this.compareTo(n) >= 0;
  }

  public greaterThanEquals(n: BigMint | number | string): boolean {
    return this.gteq(n);
  }

  public gt(n: BigMint | number | string): boolean {
    return this.compareTo(n) > 0;
  }

  public greaterThan(n: BigMint | number | string): boolean {
    return this.gt(n);
  }

  public static min(a: BigMint | number | string, b: BigMint | number | string): BigMint {
    const c: BigMint = BigMint.toBigMint(a);
    const d: BigMint = BigMint.toBigMint(b);
    return (c.compareTo(d) > 0) ? c : d;
  }

  public static max(a: BigMint | number | string, b: BigMint | number | string): BigMint {
    const c: BigMint = BigMint.toBigMint(a);
    const d: BigMint = BigMint.toBigMint(b);
    return (c.compareTo(d) < 0) ? d : c;
  }

  public compareTo(n: BigMint | number | string): number {
    let a: BigMint = this;
    let b: BigMint = BigMint.toBigMint(n);

    //If self
    if(a === b){
      return 0;
    }

    //Check if signs are different
    if (a.isNegative !== b.isNegative){
      return (a.isNegative) ? -1 : 1;
    }

    //Check if basic numbers
    if(a.digits < 2 && b.digits < 2){

      //Compare digits
      if(a.digits !== b.digits){
        return (a.digits < b.digits) ? -1 : 1;
      }

      //Check if same number
      if(a.digits === 0 || a.integer[0] === b.integer[0]){
        return 0;
      }

      //Compare numbers
      return (a.integer[0] < b.integer[0]) ? -1 : 1;
    }

    //If same base
    if(a.base === b.base){
      return compare(a.integer, 0, a.digits, b.integer, 0, b.digits);
    }

    let out: number = -1; // Assume a < b

    //Force a to represent smaller base
    if(a.base > b.base){
      const c: BigMint = a;
      a = b;
      b = c;
      out = 1;
    }

    //Estimate number of digits of A if converted to B's base
    const ratio: number = Math.log(a.base) / Math.log(b.base);
    if(b.digits < Math.ceil(a.digits * ratio)){
      return -out;
    }
    if(b.digits > Math.ceil((a.digits + 1) * ratio)){
      return out;
    }

    //Convert A to B's base
    a = a.clone().toBase(b.base);

    return out * compare(a.integer, 0, a.digits, b.integer, 0, b.digits);
  }

  public isOdd(): boolean {
    return !this.isEven();
  }

  public isEven(): boolean {

    //If zero
    if(this.digits === 0){
      return true;
    }

    //If even base
    if((this.base & 1) === 0){
      return (this.integer[0] & 1) === 0;
    }

    //If odd base
    let xor: number = 0;
    const integer: number[] = this.integer;
    for(let i: number = 0, n: number = this.digits; i < n; xor = xor ^ integer[i++]){
    }

    return (xor & 1) === 0;
  }

  ////////////////////////
  // BITWISE
  ////////////////////////

  //public not(): BigMint {
  //  return this.add(BigMint.ONE).negate();
  //}

  //TODO
  //public and(B: BigMint | number | string): BigMint {
  //  throw Error("D");
  //}

  //public andNot(B: BigMint | number | string): BigMint {
  //  return this.and(this.tryClone(B).not());
  //}

  //TODO
  //public or(B: BigMint | number | string): BigMint {
  //  throw Error("D");
  //}

  //TODO
  //public xor(B: BigMint | number | string): BigMint {
  //  throw Error("D");
  //}

  ////////////////////////
  // GCD
  ////////////////////////

  public gcd(n: BigMint | number | string): BigMint {
    const A: BigMint = this;

    //if gcd of self
    if(A === n){
      return A.abs();
    }

    //Convert to class iff necessary
    let B: BigMint = BigMint.toBigMint(n);

    //If B is zero
    if(B.digits === 0){
      return A.abs();
    }

    //If A is zero
    if(A.digits === 0){

      //Copy B and return to original base
      const base: number = A.base;
      A._assign(B);
      if(base !== A.base){
        A.toBase(base);
      }

      return A.abs();
    }

    //Make a copy of B iff necessary
    B = (n === B) ? B.clone() : B;

    //Normalize bases
    if(A.base !== B.base){
      B.toBase(A.base);
    }

    //Calculate GCD
    B = A._gcd(B);

    //Update A to be result iff needed
    return (A === B) ? A : A._assign(B);
  }

  //See: https://en.wikipedia.org/wiki/Binary_GCD_algorithm
  private _gcd(B: BigMint): BigMint {
    let A: BigMint = this;
    const C: BigMint = BigMint.ONE;

    //Remove and record common factors of 2
    while(A.isEven() && B.isEven()){
      A._half();
      B._half();
      C.double();
    }

    //Remove factors of 2 from A
    while(A.isEven()){
      A._half();
    }

    do {

      //Remove factors of 2 from B
      while(B.isEven()){
        B._half();
      }

      //Make sure A <= B. A and B are both odd, so B - A will be even.
      B.subtract(A).abs();

    //Continue until B is zero
    } while (B.digits !== 0);

    //Restore common factors of 2
    return A.multiply(C);
  }

  ////////////////////////
  // LCM
  ////////////////////////

  //See: https://en.wikipedia.org/wiki/Least_common_multiple
  public lcm(N: BigMint | number | string): BigMint {
    const A: BigMint = this;
    let B: BigMint = BigMint.toBigMint(N);

    //If lcm of self
    if(A === B){
      return A;
    }

    //If A is zero or B is zero
    if(A.digits === 0 || B.digits === 0){
      return A.toZero();
    }

    //If B is one
    if(B.digits === 1 && B.integer[0] === 1){
      return A.abs();
    }

    //If A is one
    if(A.digits === 1 && A.integer[0] === 1){

      //Turn A into B
      const base: number = A.base;
      A._assign(B);
      if(base !== A.base){
        A.toBase(base);
      }

      return A.abs();
    }

    //Calculate and return LCM
    return A.divide(A.gcd(B)).multiply(B).abs();
  }

  ////////////////////////
  // ADDITION
  ////////////////////////

  public add(n: BigMint | number | string): BigMint {
    const adduend: BigMint = this;

    //If self
    if(adduend === n){
      return adduend.double();
    }

    //Convert to class iff necessary
    let addend: BigMint = BigMint.toBigMint(n);

    //If addend is zero
    if(addend.digits === 0){
      return adduend;
    }

    //If adduend is zero
    if(adduend.digits === 0){

      //Copy addend and return to original base
      return adduend._assign(addend, true);
    }

    //Normalize bases
    if (adduend.base !== addend.base){
      addend = (n === addend) ? addend.clone() : addend;
      addend.toBase(adduend.base);
    }

    //If signs differ
    if (adduend.isNegative !== addend.isNegative){

      //Change sign, subtract, change sign again
      return adduend.negate().subtract(addend).negate();
    }

    //Make room for addition
    //adduend.integer.length = (adduend.digits < addend.digits) ? addend.digits + 1 : adduend.digits + 1;

    //Add
    adduend.integer.length = adduend.digits = (
      (adduend.digits < addend.digits) ? ReverseAdditionMethod : BasicAdditionMethod
    )(
      adduend.integer, 0, adduend.digits,
      addend.integer, 0, addend.digits,
      adduend.base
    );

    return adduend;
  }

  public divide(divisor: BigMint | number | string): BigMint {
    return this.divideAndRemainder(divisor)[0];
  }

  public divideAndRemainder(n: BigMint | number | string): [BigMint, BigMint] {
    const dividend: BigMint = this;
    let divisor: BigMint = BigMint.toBigMint(n);

    //If divisor is zero
    if(divisor.digits === 0){
      throw EvalError("Divide by Zero");
    }

    //If self
    if(dividend === divisor){
      return [dividend.toOne(), BigMint.ZERO];
    }

    //If dividend is zero
    if(dividend.digits === 0){
      return [dividend, BigMint.ZERO];
    }

    //Divide signs
    dividend.isNegative = dividend.isNegative !== divisor.isNegative;

    //If divisor is one or two
    if(divisor.digits === 1 && divisor.integer[0] < 3){
      return (divisor.integer[0] === 1) ? [dividend, BigMint.ZERO] : dividend.half();
    }

    //If different bases
    if(dividend.base !== divisor.base){

      //Estimate the least number of digits of the divisor if converted to the dividend's base
      //If the dividend is smaller than the divisor the quotient will be zero (less than 1)
      const ratio: number = Math.log(divisor.base) / Math.log(dividend.base);
      if(dividend.digits < Math.ceil(divisor.digits *  ratio)){
        const remainder: BigMint = BigMint.ZERO.copy(dividend);
        return [dividend.toZero(), remainder];
      }

      //Normalize bases
      divisor = (n === divisor) ? divisor.clone() : divisor;
      divisor.toBase(dividend.base);
    }

    //Check if the dividend has less digits than the divisor
    if(dividend.digits < divisor.digits){
      const remainder: BigMint = BigMint.ZERO.copy(dividend);
      return [dividend.toZero(), remainder];
    }

    const remainder: BigMint = BigMint.ZERO;

    [
      dividend.integer, remainder.integer,
      dividend.digits, remainder.digits
    ] = (divisor.digits < 2) ?
      SimpleDivisionMethod(
        dividend.integer, dividend.digits,
        divisor.integer[0], dividend.base
      ) :
      BasicDivisionMethod(
        dividend.integer, dividend.digits,
        divisor.integer, divisor.digits,
        dividend.base
      );
    dividend.integer.length = dividend.digits;
    remainder.integer.length = remainder.digits;
    return [dividend, remainder];
  }

  public double(): BigMint {
    if(this.digits === 0){
      return this;
    }

    //Double and set new length
    this.integer.length = this.digits = BasicDoubleMethod(
      this.integer, this.digits, this.base
    );

    return this;
  }

  public half(): [BigMint, BigMint] {

    //If zero
    if(this.digits === 0){
      return [this, BigMint.ZERO];
    }
    const remainder: number = this._half();
    return [this, remainder === 0 ? BigMint.ZERO : BigMint.ONE];
  }

  private _half(): number {
    let remainder: number;

    //Half
    [this.digits, remainder] = BasicHalfMethod(
      this.integer, this.digits, this.base, this.isNegative
    );
    this.integer.length = this.digits;

    return remainder;
  }

  public multiply(n: BigMint | number | string): BigMint {
    const multiplicand: BigMint = this;

    //If self
    if(multiplicand === n){
      return multiplicand.square();
    }

    //If zero
    if(multiplicand.digits === 0){
      return multiplicand;
    }

    //Convert to class if necessary
    let multiplier = BigMint.toBigMint(n);

    //If multiplying by zero
    if(multiplier.digits === 0){
      return multiplicand.toZero();
    }

    //Multiply signs
    multiplicand.isNegative = multiplicand.isNegative !== multiplier.isNegative;

    //Normalize bases
    if (multiplicand.base !== multiplier.base){
      multiplier = (n === multiplier) ? multiplier.clone() : multiplier;
      multiplier.toBase(multiplicand.base);
    }

    //If multiplying by single digit
    if(multiplier.digits === 1){
      multiplicand.digits = SimpleMultiplicationMethod(
        multiplicand.integer, 0, multiplicand.digits,
        multiplier.integer[0], multiplicand.base
      );
      return multiplicand;
    }

    //If single digit
    if(multiplicand.digits === 1){
      const n: number = multiplicand.integer[0];
      multiplicand.integer = multiplier.integer.slice(0);
      multiplicand.digits = SimpleMultiplicationMethod(
        multiplicand.integer, 0, multiplier.digits,
        n, multiplicand.base
      );
      return multiplicand;
    }

    //Make room for multiplication
    multiplicand.integer.length = multiplicand.digits + multiplier.digits;

    //Multiply
    //if(MEETS_THRESHOLD){
    multiplicand.integer.length = multiplicand.digits = KaratsubaMultiplicationMethod(
      multiplicand.integer, multiplicand.digits,
      multiplier.integer, multiplier.digits,
      multiplicand.base
    );
    /*
    }
    multiplicand.integer.length = multiplicand.digits = BasicMultiplicationMethod(
      multiplicand.integer, multiplicand.digits,
      multiplier.integer, multiplier.digits,
      multiplicand.base
    );*/

    return multiplicand;
  }

  public negate(): BigMint {

    //Negate sign
    this.isNegative = (this.digits === 0) ? false : this.isNegative === false;

    return this;
  };

  public plus(adduend: BigMint | number | string): BigMint {
    return this.add(adduend);
  }

  public pow(n: BigMint | number | string): BigMint {
    const base: BigMint = this;
    let power: BigMint = BigMint.toBigMint(n);

    //If raised to zero power
    if(power.digits === 0){

      //Make one
      return base.toOne();
    }

    //If raised to negative power
    if(power.isNegative){

      //Make zero
      return base.toZero();
    }

    //If base is zero
    if(base.digits === 0){
      return base;
    }

    //If negative base and even power
    if(base.isNegative && power.isEven()){

      //Switch sign
      base.isNegative = false;
    }

    //If base is one
    if(base.digits === 1 && base.integer[0] === 1){
      return base;
    }

    return base._pow((n === power) ? power.clone() : power);
  }

  private _pow(power: BigMint): BigMint {
    const base: BigMint = this;

    //If power is 1
    if(power.digits === 1 && power.integer[0] === 1){
      return base;
    }

    //Divide the power in half and check for remainder
    if(power._half() > 0){
      const baseClone: BigMint = base.clone();
      return base.square()._pow(power).multiply(baseClone);
    }

    //If power was even
    return base.square()._pow(power);
  }

  public remainder(divisor: BigMint | number | string): BigMint {
    return this.divideAndRemainder(divisor)[1];
  }

  public square(): BigMint {
    const multiplicand: BigMint = this;

    //If zero
    if (multiplicand.digits === 0){
      return multiplicand;
    }

    //If negative
    if(multiplicand.isNegative){
      multiplicand.isNegative = false;
    }

    //If 1 or 2
    if(multiplicand.digits === 1){
      if(multiplicand.integer[0] === 1){
        return multiplicand;
      }
      if(multiplicand.integer[0] === 2){
        return multiplicand.double();
      }
    }

    //Make room for squaring
    multiplicand.integer.length = 2*multiplicand.digits;

    //Square
    multiplicand.integer.length = multiplicand.digits = KaratsubaSquareMethod(
      multiplicand.integer, multiplicand.digits, multiplicand.base
    );

    return multiplicand;
  }

  public subtract(n: BigMint | number | string): BigMint {
    const minuend: BigMint = this;

    //If self
    if(minuend === n){
      return minuend.toZero();
    }

    //Convert to class iff necessary
    let subtrahend: BigMint = BigMint.toBigMint(n);

    //If subtrahend is zero
    if(subtrahend.digits === 0){
      return minuend;
    }

    //If minuend is zero
    if(minuend.digits === 0){

      //Copy subtrahend and return to original base
      return minuend._assign(subtrahend, true).negate();
    }

    //Normalize bases
    if (minuend.base !== subtrahend.base){
      subtrahend = (n === subtrahend) ? subtrahend.clone() : subtrahend;
      subtrahend.toBase(minuend.base);
    }

    //If signs differ
    if (minuend.isNegative !== subtrahend.isNegative){

      //Add
      return minuend.negate().add(subtrahend).negate();
    }

    //Compare A to B
    const comparison: number = minuend.compareTo(subtrahend);

    //If same number
    if(comparison === 0){

      //return zero
      return minuend.toZero();
    }

    //If A < B
    if(comparison < 0){
      minuend.negate();
      minuend.integer.length = minuend.digits = ReverseSubtractionMethod(
        minuend.integer, 0, minuend.digits,
        subtrahend.integer, 0, subtrahend.digits,
        minuend.base
      );

    //If A > B
    } else {
      minuend.integer.length = minuend.digits = BasicSubtractionMethod(
        minuend.integer, 0, minuend.digits,
        subtrahend.integer, 0, subtrahend.digits,
        minuend.base
      );
    }

    return minuend;
  }
}
