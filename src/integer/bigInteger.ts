import BigNumber from '../bigNumber';
import BasicAdditionMethod from './add/basicAdditionMethod';
import ReverseAdditionMethod from './add/reverseAdditionMethod';
import BasicDoubleMethod from './mul/basicDoubleMethod';
import BasicHalfMethod from './div/basicHalfMethod';
import BasicSubtractionMethod from './sub/basicSubtractionMethod';
import ReverseSubtractionMethod from './sub/reverseSubtractionMethod';
import KaratsubaSquareMethod from './mul/karatsubaSquareMethod';
import BasicMultiplicationMethod from './mul/basicMultiplicationMethod';
import {isNumber, isString} from '../util';

export function isBigInteger(n: any): n is BigInteger {
  return n instanceof BigInteger;
}

export default class BigInteger extends BigNumber {

  ////////////////////////
  // PROPERTIES
  ///////////////////////

  //TODO: Change back to private
  public isNegative: boolean;
  public integer: number[];
  public digits: number;

  ////////////////////////
  // CONSTRUCTOR
  ////////////////////////

  constructor(input: BigInteger | number | string) {
    super();

    if(isBigInteger(input)){
      BigInteger.clone(this, input);
    } else if(isNumber(input)){
      this.convertNumber(input);
    } else if(isString(input)){
      this.convertString(input);
    } else {
      throw TypeError("Expecting type BigInteger | string | number");
    }
  }

  private convertNumber(input: Number): void {
    let n: number = <number>input;
    let base: number = BigNumber.DEFAULT_BASE;
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
    BigInteger.toBase(this, BigNumber.DEFAULT_BASE);
  }

  ////////////////////////
  // SIGN
  ////////////////////////

  public abs(): BigInteger {
    return this.clone().mAbs();
  };

  public mAbs(): BigInteger {

    //Make number positive
    this.isNegative = false;

    return this;
  };

  public negate(): BigInteger {
      return this.clone().mNegate();
  };

  public mNegate(): BigInteger {

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

  public clone(): BigInteger {
    return new BigInteger(this);
  }

  private static clone(clone: BigInteger, original: BigInteger): void {
    clone.isNegative = original.isNegative;
    clone.integer = original.integer.slice(0);
    clone.base = original.base;
    clone.digits = original.digits;
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

  public setBase(base: number): BigInteger {
    return this.clone().mSetBase(base);
  }

  public mSetBase(base: number): BigInteger {

    //Sanitize base
    base = BigInteger.sanitizeBase(base);

    //Check if already in base
    if(this.base !== base){
      BigInteger.toBase(this, base);
    }

    return this;
  }

  private static sanitizeBase(base: number){
    base = 0 | base;

    if(base < BigInteger.MIN_BASE){
      throw RangeError(base + " < BigInteger.MIN_BASE (" + BigInteger.MIN_BASE + ")");
    }

    if(base > BigInteger.MAX_BASE){
      throw RangeError(base + " > BigInteger.MAX_BASE (" + BigInteger.MAX_BASE + ")");
    }

    return base;
  }

  private static toBase(n: BigInteger, newBase: number): void {
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
  }

  ////////////////////////
  // COMPARE
  ////////////////////////

  public equals(n: BigInteger): boolean {
    return this.compareTo(n) === 0;
  }

  public static min(a: BigInteger, b: BigInteger): BigInteger {
    return BigInteger.mMin(a, b).clone();
  }

  public static mMin(a: BigInteger, b: BigInteger): BigInteger {
    return (a.compareTo(b) > 0) ? b : a;
  }

  public static max(a: BigInteger, b: BigInteger): BigInteger {
    return BigInteger.mMax(a, b).clone();
  }

  public static mMax(a: BigInteger, b: BigInteger): BigInteger {
    return (a.compareTo(b) < 0) ? b : a;
  }

  public compareTo(b: BigInteger): number {
    let a: BigInteger = this;

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

    let out: number = -1; // Assume a < b

    //Compare bases
    if(a.base !== b.base){

      //Force a to represent smaller base
      if(a.base > b.base){
        let c: BigInteger = a;
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
      a = a.clone();
      BigInteger.toBase(a, b.base);
    }

    //Compare digits
    if(a.digits !== b.digits){
      return (a.digits < b.digits) ? out : -out;
    }

    //Compare numbers
    for(let i: number = a.digits; i-- > 0;){
      if(a.integer[i] !== b.integer[i]){
        return (a.integer[i] < b.integer[i]) ? out: -out;
      }
    }

    //Both numbers are equal
    return 0;
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
    let isEven: boolean = true;
    let integer: number[] = this.integer;
    for(let len: number = this.digits; len > 0; isEven = isEven === ((integer[--len] & 1) === 0)){
    }

    return isEven;
  }

  ////////////////////////
  // GCD
  ////////////////////////

  public gcd(B: BigInteger): BigInteger {
    return this.clone().mGcd(B);
  }

  public mGcd(B: BigInteger): BigInteger {
    const A: BigInteger = this;

    //If gcd of self or B is zero
    if(A === B || B.digits === 0){
      return A.mAbs();
    }

    //If A is zero
    if(A.digits === 0){

      //Copy B and return to original base
      const base: number = A.base;
      BigInteger.clone(A, B);
      if(base !== A.base){
        BigInteger.toBase(A, base);
      }

      return A.mAbs();
    }

    //Make a copy of B
    B = B.clone();

    //Normalize bases
    if(A.base !== B.base){
      BigInteger.toBase(B, A.base);
    }

    //Calculate GCD
    B = A._gcd(B);

    //Update A to be result
    if(A !== B){
      BigInteger.clone(A, B);
    }

    return A;
  }

  //See: https://en.wikipedia.org/wiki/Binary_GCD_algorithm
  private _gcd(B: BigInteger): BigInteger {
    let A: BigInteger = this;
    const C: BigInteger = new BigInteger(1);

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
  // ADDITION
  ////////////////////////

  public add(addend: BigInteger): BigInteger {
    return this.clone().mAdd(addend);
  }

  public mAdd(addend: BigInteger): BigInteger {
    let adduend: BigInteger = this;

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
      BigInteger.clone(adduend, addend);
      if(base !== adduend.base){
        BigInteger.toBase(adduend, base);
      }

      return adduend;
    }

    //Normalize bases
    if (adduend.base !== addend.base){
        addend = addend.clone();
        BigInteger.toBase(addend, adduend.base);
    }

    //If signs differ
    if (adduend.isNegative !== addend.isNegative){

      //Change sign, subtract, change sign again
      return adduend.mNegate()._subtract(addend).mNegate();
    }

    return adduend._add(addend);
  }

  private _add(adduend: BigInteger): BigInteger {
    const addend: BigInteger = this;

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

  public subtract(subtrahend: BigInteger): BigInteger {
    return this.clone().mSubtract(subtrahend);
  }

  public mSubtract(subtrahend: BigInteger): BigInteger {
    let minuend: BigInteger = this;

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
      BigInteger.clone(minuend, subtrahend);
      if(base !== minuend.base){
        BigInteger.toBase(minuend, base);
      }

      return minuend.mNegate();
    }

    //Normalize bases
    if (minuend.base !== subtrahend.base){
        subtrahend = subtrahend.clone();
        BigInteger.toBase(subtrahend, minuend.base);
    }

    //If signs differ
    if (minuend.isNegative !== subtrahend.isNegative){

      //Add
      return minuend.mNegate()._add(subtrahend).mNegate();
    }

    return minuend._subtract(subtrahend);
  }

  private _subtract(subtrahend: BigInteger): BigInteger {
    const minuend: BigInteger = this;

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
        minuend.integer, minuend.digits,
        subtrahend.integer, subtrahend.digits,
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

  public double(): BigInteger {
    return this.clone().mDouble();
  }

  public mDouble(): BigInteger {

    //If zero
    if(this.digits === 0){
      return this;
    }

    return this._double();
  }

  private _double(): BigInteger {

    //Double and set new length
    this.integer.length = this.digits = BasicDoubleMethod(
      this.integer, this.digits, this.base
    );

    return this;
  }

  ////////////////////////
  // SQUARE
  ////////////////////////

  public square(): BigInteger {
    return this.clone().mSquare();
  }

  public mSquare(): BigInteger {
    let multiplicand: BigInteger = this;

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

  private _square(): BigInteger {
    const multiplicand: BigInteger = this;

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

  public multiply(multiplier: BigInteger): BigInteger {
    return this.clone().mMultiply(multiplier);
  }

  public mMultiply(multiplier: BigInteger): BigInteger {
    let multiplicand: BigInteger = this;

    //If squaring
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
      BigInteger.clone(multiplicand, multiplier);
      if(multiplicand.base !== base){
        BigInteger.toBase(multiplicand, base);
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
        multiplier = multiplier.clone();
        BigInteger.toBase(multiplier, multiplicand.base);
    }

    return multiplicand._multiply(multiplier);
  }

  private _multiply(multiplier: BigInteger): BigInteger {
    const multiplicand: BigInteger = this;

    //Make room for multiplication
    multiplicand.integer.length = multiplicand.digits + multiplier.digits;

    //Multiply
    multiplicand.integer.length = multiplicand.digits = BasicMultiplicationMethod(
      multiplicand.integer, multiplicand.digits,
      multiplier.integer, multiplier.digits,
      multiplicand.base
    );

    return multiplicand;
  }

  ////////////////////////
  // POW
  ////////////////////////

  public pow(power: BigInteger): BigInteger {
    return this.clone().mPow(power);
  }

  public mPow(power: BigInteger): BigInteger {
    const base: BigInteger = this;

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

    return this._pow(power);
  }

  private _pow(power: BigInteger): BigInteger {
    const base: BigInteger = this;

    //If power is 1
    if(power.digits === 1 && power.integer[0] === 1){
      return base;
    }

    //If power is odd
    if(power.isOdd()){
      const baseClone: BigInteger = base.clone();
      return base._square()._pow(power._half())._multiply(baseClone);
    }

    //If power is even
    return base._square()._pow(power._half());
  }

  ////////////////////////
  // Half
  ////////////////////////

  public half(): BigInteger {
    return this.clone().mHalf();
  }

  public mHalf(): BigInteger {

    //If zero
    if(this.digits === 0){
      return this;
    }

    return this._half();
  }

  private _half(): BigInteger {

    //Half
    this.integer.length = this.digits = BasicHalfMethod(
      this.integer, this.digits, this.base, this.isNegative
    );

    return this;
  }

  ////////////////////////
  // DIVISION
  ////////////////////////

  public divide(divisor: BigInteger): BigInteger {
    return this.clone().mDivide(divisor);
  }

  public mDivide(divisor: BigInteger): BigInteger {
    let dividend: BigInteger = this;

    //If self
    if(dividend === divisor){
      dividend.toOne();
      return dividend;
    }

    //If divisor is zero
    if(divisor.digits === 0){
      throw EvalError("Divide by Zero");
    }

    //If dividend is zero
    if(dividend.digits === 0){
      return dividend;
    }

    //Divide signs
    dividend.isNegative = dividend.isNegative !== divisor.isNegative;

    //If divisor is one or two
    if(divisor.digits === 1 && divisor.integer[0] < 3){
      return (divisor.integer[0] === 1) ? dividend : dividend._half();
    }

    //Normalize bases
    if(dividend.base !== divisor.base){
      divisor = divisor.clone();
      BigInteger.toBase(divisor, dividend.base);
    }

    return dividend._divide(divisor);
  }

  private _divide(divisor: BigInteger): BigInteger {
    //const dividend: BigInteger = this;
    throw Error("D");
  }
}
