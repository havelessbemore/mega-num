import * as Constants from './constants';
import {Integer} from './integer';
import {abs} from './functional/abs';
import {add} from './functional/add';
import {assign} from './functional/assign';
import {compare} from './functional/compare';
import {copy} from './functional/copy';
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
import {setBase} from './functional/setBase';
import {subtract} from './functional/subtract';
import {square} from './functional/square';
import {CIPHER, strToDigits} from './util/numUtils';

export default class BigMint {

  ////////////////////////
  // CONSTANTS
  ////////////////////////

  public static readonly MIN_BASE: number = Constants.MIN_BASE;
  public static readonly MAX_BASE: number = Constants.MAX_BASE;
  public static readonly DEFAULT_BASE: number = Constants.DEFAULT_BASE;
  public static readonly MAX_PRECISION: number = Constants.MAX_PRECISION;

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
      assign(this, input);
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
    this.setBase(BigMint.DEFAULT_BASE);
  }

  ////////////////////////
  // UPDATE
  ////////////////////////

  public clone(): BigMint {
    return new BigMint(this);
  }

  public copy(source: BigMint | number | string): BigMint {
    const base: number = this.base;
    copy(this, BigMint.toBigMint(source));
    this.setBase(base);
    return this;
  }

  ////////////////////////
  // BASE
  ////////////////////////

  public getBase(): number {
    return this.base;
  }

  public setBase(base: number): BigMint {
    setBase(this, base);
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
    this.divideAndRemainder(divisor);
    return this;
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
    this.digits.length = this.precision;
    return this;
  }

  public remainder(divisor: BigMint | number | string): BigMint {
    assign(this, this.divideAndRemainder(divisor)[1]);
    return this;
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
