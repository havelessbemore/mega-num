import {Integer} from './integer';
import {abs} from './functional/abs';
import {add} from './functional/add';
import {compare} from './functional/compare';
import {decrement} from './functional/decrement';
import {divideAndRemainder} from './functional/divideAndRemainder';
import {double} from './functional/double';
import {gcd} from './functional/gcd';
import {halve} from './functional/halve';
import {increment} from './functional/increment';
import {isEven} from './functional/isEven';
import {lcm} from './functional/lcm';
import {max} from './functional/max';
import {min} from './functional/min';
import {multiply} from './functional/multiply';
import {negate} from './functional/negate';
import {pow} from './functional/pow';
import {signum} from './functional/signum';
import {subtract} from './functional/subtract';
import {square} from './functional/square';
import {assign, changeBase, copy} from './util/intUtils';
import {CIPHER, strToDigits} from './util/numUtils';

export default class BigMint {

  ////////////////////////
  // CONSTANTS
  ////////////////////////

  public static readonly MIN_BASE: number = 2;
  public static readonly MAX_BASE: number = 94906265; //2^26 < sqrt(Number.MAX_SAFE_INTEGER) < 2^27
  public static readonly DEFAULT_BASE: number = 94906264;
  public static readonly MAX_PRECISION: number = 4294967295; //2^32 - 1

  ////////////////////////
  // PROPERTIES
  ///////////////////////

  public base: number;
  public digits: number[];
  public precision: number;
  public isNegative: boolean;

  ////////////////////////
  // CONSTRUCTOR
  ////////////////////////
  public static get MINUS_ONE(): BigMint {return new BigMint(-1)};
  public static get ZERO(): BigMint {return new BigMint(0)};
  public static get ONE(): BigMint {return new BigMint(1)};

  constructor(input: BigMint | number | string) {
    if(BigMint.isBigMint(input)){
      this.assign(input);
    } else if(typeof input === "number"){
      this.convertString('' + input);
    } else if(typeof input === "string"){
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

  private convertString(s: String): void {

    //Convert string to base 10
    this.base = 10;
    [this.digits, this.isNegative] = strToDigits(s);
    this.precision = this.digits.length;

    //Convert to default base
    this._setBase(BigMint.DEFAULT_BASE);
  }

  ////////////////////////
  // UPDATE
  ////////////////////////

  public clone(): BigMint {
    return new BigMint(this);
  }

  public assign(source: BigMint | number | string, keepBase: boolean = false): BigMint {
    const originalBase: number = this.base;
    copy(this, BigMint.toBigMint(source));
    if(keepBase && this.base !== originalBase){
      this._setBase(originalBase);
    }
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
    return this._setBase(base);
  }

  private _setBase(base: number): BigMint {
    changeBase(this, base);
    this.digits.length = this.precision;
    return this;
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
    if(this.precision === 0){
      return (cipher instanceof Array) ? cipher[0] : cipher(0, 0, 0);
    }

    let s: string;
    const A: number[] = this.digits;

    //Print with cipher
    if(cipher instanceof Array){
      s = cipher[A[0]];
      for(let i: number = 1, j: number = this.precision; i < j; s = cipher[A[i++]] + sep + s){
      }

    //Print with custom function
    } else {
      s = cipher(A[0], 0, this.precision);
      for(let i: number = 1, j: number = this.precision; i < j; ++i){
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
    return <BigMint>min(c, d);
  }

  public static max(a: BigMint | number | string, b: BigMint | number | string): BigMint {
    const c: BigMint = BigMint.toBigMint(a);
    const d: BigMint = BigMint.toBigMint(b);
    return <BigMint>max(c, d);
  }

  public compareTo(n: BigMint | number | string): number {
    return compare(this,  BigMint.toBigMint(n))
  }

  public abs(): BigMint {
    abs(this);
    return this;
  };

  public add(n: BigMint | number | string): BigMint {
    add(this, BigMint.toBigMint(n));
    return this;
  }

  public divide(divisor: BigMint | number | string): BigMint {
    return this.divideAndRemainder(divisor)[0];
  }

  public divideAndRemainder(n: BigMint | number | string): [BigMint, BigMint] {
    let Q: Integer;
    let R: Integer;
    [Q, R] = divideAndRemainder(this, BigMint.toBigMint(n));
    Q.digits.length = Q.precision;
    R.digits.length = R.precision;
    return [<BigMint>assign(this, Q), <BigMint>assign(BigMint.ZERO, R)];
  }

  public double(): BigMint {
    double(this);
    return this;
  }

  public gcd(n: BigMint | number | string): BigMint {
    gcd(this, BigMint.toBigMint(n));
    this.digits.length = this.precision;
    return this;
  }

  public half(): [BigMint, BigMint] {
    let remainder: Integer;
    [,remainder] = halve(this);
    this.digits.length = this.precision;
    return [this, (remainder.precision === 0) ? BigMint.ZERO : BigMint.ONE];
  }

  public isEven(): boolean {
    return isEven(this);
  }

  public isOdd(): boolean {
    return !this.isEven();
  }

  //See: https://en.wikipedia.org/wiki/Least_common_multiple
  public lcm(n: BigMint | number | string): BigMint {
    lcm(this, BigMint.toBigMint(n));
    this.digits.length = this.precision;
    return this;
  }

  public minusminus(): BigMint {
    decrement(this);
    return this;
  }

  public multiply(n: BigMint | number | string): BigMint {
    multiply(this, BigMint.toBigMint(n));
    this.digits.length = this.precision;
    return this;
  }

  public negate(): BigMint {
    negate(this);
    return this;
  };

  public plusplus(): BigMint {
    increment(this);
    return this;
  }

  public pow(n: BigMint | number | string): BigMint {
    pow(this, BigMint.toBigMint(n));
    return this;
  }

  public remainder(divisor: BigMint | number | string): BigMint {
    return this.divideAndRemainder(divisor)[1];
  }

  public signum(): number {
    return signum(this);
  };

  public square(): BigMint {
    square(this);
    this.digits.length = this.precision;
    return this;
  }

  public subtract(n: BigMint | number | string): BigMint {
    subtract(this, BigMint.toBigMint(n));
    return this;
  }
}
