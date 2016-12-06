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
import {CIPHER, compare, isNumber, isString} from './util';

export default class BigInt {

  ////////////////////////
  // CONSTANTS
  ////////////////////////

  public static get MIN_BASE(): number {return 2};
  public static get MAX_BASE(): number {return 94906265}; //2^26 < sqrt(Number.MAX_SAFE_INTEGER) < 2^27
  protected static get DEFAULT_BASE(): number {return 94906264};
  protected static get MAX_DIGITS(): number {return 4294967295}; //2^32 - 1

  /*TODO
  public static readonly MIN_BASE: number = 2;
  public static readonly MAX_BASE: number = 94906265; //2^26 < sqrt(Number.MAX_SAFE_INTEGER) < 2^27
  protected static readonly DEFAULT_BASE: number = 94906264;
  protected static readonly MAX_DIGITS: number = 4294967295; //2^32 - 1
  */

  ////////////////////////
  // PROPERTIES
  ///////////////////////

  protected isNegative: boolean;
  protected integer: number[];
  protected digits: number;
  protected base: number;

  ////////////////////////
  // CONSTRUCTOR
  ////////////////////////
  public static get MINUS_ONE(): BigInt {return new BigInt(-1)};
  public static get ZERO(): BigInt {return new BigInt(0)};
  public static get ONE(): BigInt {return new BigInt(1)};

  constructor(input: BigInt | number | string) {
    if(BigInt.isBigInt(input)){
      this._assign(input);
    } else if(isNumber(input)){
      this.convertNumber(input);
    } else if(isString(input)){
      this.convertString(input);
    } else {
      throw TypeError("Expecting type BigInt | string | number");
    }
  }

  public static isBigInt(n: any): n is BigInt {
    return n instanceof BigInt;
  }

  public static toBigInt(input: BigInt | number | string): BigInt {
    return BigInt.isBigInt(input) ? input : new BigInt(input);
  }

  private convertNumber(input: Number): void {
    let n: number = <number>input;
    let base: number = BigInt.DEFAULT_BASE;
    n = (this.isNegative = n < 0) ? -n : n;
    let digits: number = Math.ceil(Math.log(n) / Math.log(base));
    const integer: number[] = new Array<number>(digits);
    for(let i: number = 0; n != 0; ++i){
      integer[i] = n % base;
      n = (n - integer[i]) / base;
    }
    this.base = base;
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
    let integer: number[] = this.integer = new Array<number>(this.digits);
    for(let i = 0, j = this.digits; j > 0; integer[i++] = 0 | <any>s[--j]){
    }

    //Convert to default base
    this.toBase(BigInt.DEFAULT_BASE);
  }

  ////////////////////////
  // SIGN
  ////////////////////////

  public abs(): BigInt {
    return this.clone().mAbs();
  };

  public mAbs(): BigInt {

    //Make number positive
    this.isNegative = false;

    return this;
  };

  public negate(): BigInt {
      return this.clone().mNegate();
  };

  public mNegate(): BigInt {

    //Negate sign
    this.isNegative = (this.digits === 0) ? false : this.isNegative === false;

    return this;
  };

  public signum(): number {
    return this.isNegative ? -1 : this.digits === 0 ? 0 : 1;
  };

  ////////////////////////
  // UPDATE
  ////////////////////////

  public clone(): BigInt {
    return new BigInt(this);
  }

  public mAssign(source: BigInt | number | string): BigInt {
    return this._assign(BigInt.toBigInt(source));
  }

  private _assign(source: BigInt): BigInt {
    const target: BigInt = this;
    target.isNegative = source.isNegative;
    target.integer = source.integer.slice(0);
    target.base = source.base;
    target.digits = source.digits;
    return target;
  }

  private toZero(): void {
    this.isNegative = false;
    this.integer = [];
    this.digits = 0;
  }

  private toOne(): void {
    this.isNegative = false;
    this.integer = [1];
    this.digits = 1;
  }

  ////////////////////////
  // BASE
  ////////////////////////

  public getBase(): number {
    return this.base;
  }

  public setBase(base: number): BigInt {
    return this.clone().mSetBase(base);
  }

  public mSetBase(base: number): BigInt {

    //Sanitize base
    base = 0 | base;

    //Check if already in base
    if(this.base === base){
      return this;
    }

    //Check if new base too low
    if(base < BigInt.MIN_BASE){
      throw RangeError(base + " < BigInt.MIN_BASE (" + BigInt.MIN_BASE + ")");
    }

    //Check if new base too high
    if(base > BigInt.MAX_BASE){
      throw RangeError(base + " > BigInt.MAX_BASE (" + BigInt.MAX_BASE + ")");
    }

    //Convert to base
    return this.toBase(base);
  }

  private toBase(newBase: number): BigInt {
    const n: BigInt = this;
    let curInteger: number[] = n.integer;
    let curBase: number = n.base;
    let curDigits: number = n.digits;
    let newInteger: number[] = new Array(Math.ceil(
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

  public lt(n: BigInt | number | string): boolean {
    return this.compareTo(n) < 0;
  }

  public lessThan(n: BigInt | number | string): boolean {
    return this.lt(n);
  }

  public lteq(n: BigInt | number | string): boolean {
    return this.compareTo(n) <= 0;
  }

  public lessThanEquals(n: BigInt | number | string): boolean {
    return this.lteq(n);
  }

  public eq(n: BigInt | number | string): boolean {
    return this.compareTo(n) === 0;
  }

  public equals(n: BigInt | number | string): boolean {
    return this.eq(n);
  }

  public gteq(n: BigInt | number | string): boolean {
    return this.compareTo(n) >= 0;
  }

  public greaterThanEquals(n: BigInt | number | string): boolean {
    return this.gteq(n);
  }

  public gt(n: BigInt | number | string): boolean {
    return this.compareTo(n) > 0;
  }

  public greaterThan(n: BigInt | number | string): boolean {
    return this.gt(n);
  }

  public static min(a: BigInt | number | string, b: BigInt | number | string): BigInt {
    return BigInt.mMin(a, b).clone();
  }

  public static mMin(a: BigInt | number | string, b: BigInt | number | string): BigInt {
    const c: BigInt = BigInt.toBigInt(a);
    const d: BigInt = BigInt.toBigInt(b);
    return (c.compareTo(d) > 0) ? c : d;
  }

  public static max(a: BigInt | number | string, b: BigInt | number | string): BigInt {
    return BigInt.mMax(a, b).clone();
  }

  public static mMax(a: BigInt | number | string, b: BigInt | number | string): BigInt {
    const c: BigInt = BigInt.toBigInt(a);
    const d: BigInt = BigInt.toBigInt(b);
    return (c.compareTo(d) < 0) ? d : c;
  }

  public compareTo(n: BigInt | number | string): number {
    let a: BigInt = this;
    let b: BigInt = BigInt.toBigInt(n);

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
      let c: BigInt = a;
      a = b;
      b = c;
      out = 1;
    }

    //Estimate number of digits of A if converted to B's base
    let ratio: number = Math.log(a.base) / Math.log(b.base);
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

  public not(): BigInt {
    return this.clone().mNot();
  }

  public mNot(): BigInt {
    return this.add(BigInt.ONE).mNegate();
  }

  public and(B: BigInt | number | string): BigInt {
    return this.clone().mAnd(B);
  }

  public mAnd(B: BigInt | number | string): BigInt {
    throw Error("D");
  }

  public andNot(B: BigInt | number | string): BigInt {
    return this.clone().mAndNot(B);
  }

  public mAndNot(B: BigInt | number | string): BigInt {
    return this.mAnd(BigInt.toBigInt(B).not());
  }

  public or(B: BigInt | number | string): BigInt {
    return this.clone().mOr(B);
  }

  public mOr(B: BigInt | number | string): BigInt {
    throw Error("D");
  }

  public xor(B: BigInt | number | string): BigInt {
    return this.clone().mXor(B);
  }

  public mXor(B: BigInt | number | string): BigInt {
    throw Error("D");
  }

  ////////////////////////
  // GCD
  ////////////////////////

  public gcd(B: BigInt | number | string): BigInt {
    return this.clone().mgcd(B);
  }

  public mgcd(N: BigInt | number | string): BigInt {
    const A: BigInt = this;
    let B: BigInt = BigInt.toBigInt(N);

    //If gcd of self or B is zero
    if(A === B || B.digits === 0){
      return A.mAbs();
    }

    //If A is zero
    if(A.digits === 0){

      //Copy B and return to original base
      const base: number = A.base;
      A._assign(B);
      if(base !== A.base){
        A.toBase(base);
      }

      return A.mAbs();
    }

    //Make a copy of B
    B = B.clone();

    //Normalize bases
    if(A.base !== B.base){
      B.toBase(A.base);
    }

    //Calculate GCD
    B = A._gcd(B);

    //Update A to be result if needed
    return (A === B) ? A : A._assign(B);
  }

  //See: https://en.wikipedia.org/wiki/Binary_GCD_algorithm
  private _gcd(B: BigInt): BigInt {
    let A: BigInt = this;
    const C: BigInt = BigInt.ONE;

    //Remove and record common factors of 2
    while(A.isEven() && B.isEven()){
      A._half();
      B._half();
      C._double();
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
      B._subtract(A).mAbs();

    //Continue until B is zero
    } while (B.digits !== 0);

    //Restore common factors of 2
    return A._multiply(C);
  }

  ////////////////////////
  // LCM
  ////////////////////////

  public lcm(B: BigInt | number | string): BigInt {
    return this.clone().mlcm(B);
  }

  //See: https://en.wikipedia.org/wiki/Least_common_multiple
  public mlcm(N: BigInt | number | string): BigInt {
    const A: BigInt = this;
    let B: BigInt = BigInt.toBigInt(N);

    //If lcm of self
    if(A === B){
      return A;
    }

    //If A is zero or B is zero
    if(A.digits === 0 || B.digits === 0){
      A.toZero();
      return A;
    }

    //If B is one
    if(B.digits === 1 && B.integer[0] === 1){
      return A.mAbs();
    }

    //If A is one
    if(A.digits === 1 && A.integer[0] === 1){

      //Turn A into B
      const base: number = A.base;
      A._assign(B);
      if(base !== A.base){
        A.toBase(base);
      }

      return A.mAbs();
    }

    //Calculate and return LCM
    return A.mDivide(A.gcd(B)).mMultiply(B).mAbs();
  }

  ////////////////////////
  // ADDITION
  ////////////////////////

  public add(addend: BigInt | number | string): BigInt {
    return this.clone().mAdd(addend);
  }

  public mAdd(n: BigInt | number | string): BigInt {
    const adduend: BigInt = this;
    let addend: BigInt = BigInt.toBigInt(n);

    //If self
    if(adduend === addend){
      return adduend.mDouble();
    }

    //If addend is zero
    if(addend.digits === 0){
      return adduend;
    }

    //If adduend is zero
    if(adduend.digits === 0){

      //Copy addend and return to original base
      let base = adduend.base;
      adduend._assign(addend);
      if(base !== adduend.base){
        adduend.toBase(base);
      }

      return adduend;
    }

    //Normalize bases
    if (adduend.base !== addend.base){
        addend = addend.clone().toBase(adduend.base);
    }

    //If signs differ
    if (adduend.isNegative !== addend.isNegative){

      //Change sign, subtract, change sign again
      return adduend.mNegate()._subtract(addend).mNegate();
    }

    return adduend._add(addend);
  }

  private _add(adduend: BigInt): BigInt {
    const addend: BigInt = this;

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

  ////////////////////////
  // SUBTRACTION
  ////////////////////////

  public subtract(subtrahend: BigInt | number | string): BigInt {
    return this.clone().mSubtract(subtrahend);
  }

  public mSubtract(n: BigInt | number | string): BigInt {
    const minuend: BigInt = this;
    let subtrahend: BigInt = BigInt.toBigInt(n);

    //If self
    if(minuend === subtrahend){
      minuend.toZero();
      return minuend;
    }

    //If subtrahend is zero
    if(subtrahend.digits === 0){
      return minuend;
    }

    //If minuend is zero
    if(minuend.digits === 0){

      //Copy subtrahend and return to original base
      let base = minuend.base;
      minuend._assign(subtrahend);
      if(base !== minuend.base){
        minuend.toBase(base);
      }

      return minuend.mNegate();
    }

    //Normalize bases
    if (minuend.base !== subtrahend.base){
        subtrahend = subtrahend.clone().toBase(minuend.base);
    }

    //If signs differ
    if (minuend.isNegative !== subtrahend.isNegative){

      //Add
      return minuend.mNegate()._add(subtrahend).mNegate();
    }

    return minuend._subtract(subtrahend);
  }

  private _subtract(subtrahend: BigInt): BigInt {
    const minuend: BigInt = this;

    //Compare A to B
    const comparison: number = minuend.compareTo(subtrahend);

    //If same number
    if(comparison === 0){

      //return zero
      minuend.toZero();
      return minuend;
    }

    //If A < B
    if(comparison < 0){
      minuend.mNegate();
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

  ////////////////////////
  // Double
  ////////////////////////

  public double(): BigInt {
    return this.clone().mDouble();
  }

  public mDouble(): BigInt {

    //If zero
    if(this.digits === 0){
      return this;
    }

    return this._double();
  }

  private _double(): BigInt {

    //Double and set new length
    this.integer.length = this.digits = BasicDoubleMethod(
      this.integer, this.digits, this.base
    );

    return this;
  }

  ////////////////////////
  // SQUARE
  ////////////////////////

  public square(): BigInt {
    return this.clone().mSquare();
  }

  public mSquare(): BigInt {
    let multiplicand: BigInt = this;

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
        return multiplicand._double();
      }
    }

    return multiplicand._square();
  }

  private _square(): BigInt {
    const multiplicand: BigInt = this;

    //Make room for squaring
    multiplicand.integer.length = 2*multiplicand.digits;

    //Square
    multiplicand.integer.length = multiplicand.digits = KaratsubaSquareMethod(
      multiplicand.integer, multiplicand.digits, multiplicand.base
    );

    return multiplicand;
  }

  ////////////////////////
  // MULTIPLICATION
  ////////////////////////

  public multiply(multiplier: BigInt | number | string): BigInt {
    return this.clone().mMultiply(multiplier);
  }

  public mMultiply(n: BigInt | number | string): BigInt {
    const multiplicand: BigInt = this;
    let multiplier = BigInt.toBigInt(n);

    //If self
    if(multiplicand === multiplier){
      return multiplicand.mSquare();
    }

    //If zero
    if(multiplicand.digits === 0){
      return multiplicand;
    }

    //If multiplying by zero
    if(multiplier.digits === 0){
      multiplicand.toZero();
      return multiplicand;
    }

    //Multiply signs
    multiplicand.isNegative = multiplicand.isNegative !== multiplier.isNegative;

    //If 1 or 2
    if(multiplicand.digits === 1 && multiplicand.integer[0] < 3){
      let base: number = multiplicand.base;
      multiplicand._assign(multiplier);
      if(multiplicand.base !== base){
        multiplicand.toBase(base);
      }
      if(multiplicand.integer[0] === 2){
        multiplicand._double();
      }
      return multiplicand;
    }

    //If multiplying by 1 or 2
    if(multiplier.digits === 1 && multiplier.integer[0] < 3){
      return (multiplier.integer[0] === 1) ? multiplicand : multiplicand._double();
    }

    //Normalize bases
    if (multiplicand.base !== multiplier.base){
        multiplier = multiplier.clone().toBase(multiplicand.base);
    }

    return multiplicand._multiply(multiplier);
  }

  private _multiply(multiplier: BigInt): BigInt {
    const multiplicand: BigInt = this;

    //Make room for multiplication
    multiplicand.integer.length = multiplicand.digits + multiplier.digits;

    //Multiply
    multiplicand.integer.length = multiplicand.digits = KaratsubaMultiplicationMethod(
      multiplicand.integer, multiplicand.digits,
      multiplier.integer, multiplier.digits,
      multiplicand.base
    );
    /*multiplicand.integer.length = multiplicand.digits = BasicMultiplicationMethod(
      multiplicand.integer, multiplicand.digits,
      multiplier.integer, multiplier.digits,
      multiplicand.base
    );*/

    return multiplicand;
  }

  ////////////////////////
  // POW
  ////////////////////////

  public pow(power: BigInt | number | string): BigInt {
    return this.clone().mPow(power);
  }

  public mPow(n: BigInt | number | string): BigInt {
    const base: BigInt = this;
    let power: BigInt = BigInt.toBigInt(n);

    //If raised to zero power
    if(power.digits === 0){

      //Make one
      base.toOne();
      return base;
    }

    //If raised to negative power
    if(power.isNegative){

      //Make zero
      base.toZero();
      return base;
    }

    //If negative base and even power
    if(base.isNegative && power.isEven()){

      //Switch sign
      base.isNegative = false;
    }

    //If base is zero or one
    if(base.digits === 0 || (base.digits === 1 && base.integer[0] === 1)){
      return base;
    }

    return base._pow(power.clone());
  }

  private _pow(power: BigInt): BigInt {
    const base: BigInt = this;

    //If power is 1
    if(power.digits === 1 && power.integer[0] === 1){
      return base;
    }

    //Divide the power in half
    let remainder: BigInt;
    [, remainder] = power._half();

    //If power was odd
    if(remainder.digits > 0){
      const baseClone: BigInt = base.clone();
      return base._square()._pow(power)._multiply(baseClone);
    }

    //If power was even
    return base._square()._pow(power);
  }

  ////////////////////////
  // Half
  ////////////////////////

  public half(): [BigInt, BigInt] {
    return this.clone().mHalf();
  }

  public mHalf(): [BigInt, BigInt] {

    //If zero
    if(this.digits === 0){
      return [this, BigInt.ZERO];
    }

    return this._half();
  }

  private _half(): [BigInt, BigInt] {
    let remainder: number;

    //Half
    [this.digits, remainder] = BasicHalfMethod(
      this.integer, this.digits, this.base, this.isNegative
    );
    this.integer.length = this.digits;

    return [this, remainder === 0 ? BigInt.ZERO : BigInt.ONE];
  }

  ////////////////////////
  // DIVISION
  ////////////////////////

  public divide(divisor: BigInt | number | string): BigInt {
    return this.clone().mDivide(divisor);
  }

  public mDivide(divisor: BigInt | number | string): BigInt {
    return this.mDivideAndRemainder(divisor)[0];
  }

  public remainder(divisor: BigInt | number | string): BigInt {
    return this.clone().mRemainder(divisor);
  }

  public mRemainder(divisor: BigInt | number | string): BigInt {
    return this.mDivideAndRemainder(divisor)[1];
  }

  public divideAndRemainder(divisor: BigInt | number | string): [BigInt, BigInt] {
    return this.clone().mDivideAndRemainder(divisor);
  }

  public mDivideAndRemainder(n: BigInt | number | string): [BigInt, BigInt] {
    const dividend: BigInt = this;
    let divisor: BigInt = BigInt.toBigInt(n);

    //If divisor is zero
    if(divisor.digits === 0){
      throw EvalError("Divide by Zero");
    }

    //If self
    if(dividend === divisor){
      dividend.toOne();
      return [dividend, BigInt.ZERO];
    }

    //If dividend is zero
    if(dividend.digits === 0){
      return [dividend, BigInt.ZERO];
    }

    //Divide signs
    dividend.isNegative = dividend.isNegative !== divisor.isNegative;

    //If divisor is one or two
    if(divisor.digits === 1 && divisor.integer[0] < 3){
      return (divisor.integer[0] === 1) ? [dividend, BigInt.ZERO] : dividend._half();
    }

    //If different bases
    if(dividend.base !== divisor.base){

      //Estimate the least number of digits of the divisor if converted to the dividend's base
      //If the dividend is smaller than the divisor the quotient will be zero (less than 1)
      const ratio: number = Math.log(divisor.base) / Math.log(dividend.base);
      if(dividend.digits < Math.ceil(divisor.digits *  ratio)){
        const remainder: BigInt = dividend.clone();
        dividend.toZero();
        return [dividend, remainder];
      }

      //Normalize bases
      divisor = divisor.clone().toBase(dividend.base);
    }

    //Check if the dividend is smaller than the divisor
    if(dividend.digits < divisor.digits){
      const remainder: BigInt = dividend.clone();
      dividend.toZero();
      return [dividend, remainder];
    }

    //Divide
    return dividend._divideAndRemainder(divisor);
  }

  private _divideAndRemainder(divisor: BigInt): [BigInt, BigInt] {
    const dividend: BigInt = this;
    const remainder: BigInt = BigInt.ZERO;

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
}
