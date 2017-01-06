import * as Constants from '../constants';
import {Integer} from '../integer';
import {abs} from '../functional/abs';
import {add} from '../functional/add';
import {assign} from '../functional/assign';
import {compare} from '../functional/compare';
import {copy} from '../functional/copy';
import {decrement} from '../functional/decrement';
import {divideAndRemainder} from '../functional/divideAndRemainder';
import {double} from '../functional/double';
import {gcd} from '../functional/gcd';
import {halve} from '../functional/halve';
import {increment} from '../functional/increment';
import {isEven} from '../functional/isEven';
import {lcm} from '../functional/lcm';
import {max} from '../functional/max';
import {min} from '../functional/min';
import {multiply} from '../functional/multiply';
import {negate} from '../functional/negate';
import {pow} from '../functional/pow';
import {signum} from '../functional/signum';
import {setBase} from '../functional/setBase';
import {subtract} from '../functional/subtract';
import {square} from '../functional/square';
import {toString} from '../functional/toString';
import {strToDigits} from '../util/numUtils';

export class BigInt {

  public static readonly MIN_BASE: number = Constants.MIN_BASE;
  public static readonly MAX_BASE: number = Constants.MAX_BASE;
  public static readonly DEFAULT_BASE: number = Constants.DEFAULT_BASE;
  public static readonly MAX_PRECISION: number = Constants.MAX_PRECISION;

  public static get MINUS_ONE(): BigInt {return new BigInt(-1)};
  public static get ZERO(): BigInt {return new BigInt(0)};
  public static get ONE(): BigInt {return new BigInt(1)};

  public base: number;
  public digits: number[];
  public precision: number;
  public isNegative: boolean;

  constructor(input: BigInt | number | string) {
    if(BigInt.isBigInt(input)){
      assign(this, input);
    } else if(typeof input === "number"){
      this.convertString('' + input);
    } else if(typeof input === "string"){
      this.convertString(input);
    } else {
      throw TypeError("Expecting type BigInt | string | number");
    }
  }

  public abs(): BigInt {
    abs(this);
    return this;
  };

  public add(n: BigInt | number | string): BigInt {
    add(this, BigInt.toBigInt(n));
    return this;
  }

  public clone(): BigInt {
    return new BigInt(this);
  }

  public compareTo(n: BigInt | number | string): number {
    return compare(this,  BigInt.toBigInt(n))
  }

  private convertString(s: String): void {

    //Convert string to base 10
    this.base = 10;
    [this.digits, this.isNegative] = strToDigits(s);
    this.precision = this.digits.length;

    //Convert to default base
    this.setBase(BigInt.DEFAULT_BASE);
  }

  public copy(source: BigInt | number | string): BigInt {
    const base: number = this.base;
    copy(this, BigInt.toBigInt(source));
    this.setBase(base);
    return this;
  }

  public divide(divisor: BigInt | number | string): BigInt {
    this.divideAndRemainder(divisor);
    return this;
  }

  public divideAndRemainder(n: BigInt | number | string): [BigInt, BigInt] {
    let Q: Integer;
    let R: Integer;
    [Q, R] = divideAndRemainder(this, BigInt.toBigInt(n));
    Q.digits.length = Q.precision;
    R.digits.length = R.precision;
    return [<BigInt>assign(this, Q), <BigInt>assign(BigInt.ZERO, R)];
  }

  public double(): BigInt {
    double(this);
    return this;
  }

  public gcd(n: BigInt | number | string): BigInt {
    gcd(this, BigInt.toBigInt(n));
    this.digits.length = this.precision;
    return this;
  }

  public getBase(): number {
    return this.base;
  }

  public half(): [BigInt, BigInt] {
    let remainder: Integer;
    [,remainder] = halve(this);
    this.digits.length = this.precision;
    return [this, (remainder.precision === 0) ? BigInt.ZERO : BigInt.ONE];
  }

  public static isBigInt(n: any): n is BigInt {
    return n instanceof BigInt;
  }

  public isEven(): boolean {
    return isEven(this);
  }

  public isOdd(): boolean {
    return !this.isEven();
  }

  //See: https://en.wikipedia.org/wiki/Least_common_multiple
  public lcm(n: BigInt | number | string): BigInt {
    lcm(this, BigInt.toBigInt(n));
    this.digits.length = this.precision;
    return this;
  }

  public static max(a: BigInt | number | string, b: BigInt | number | string): BigInt {
    const c: BigInt = BigInt.toBigInt(a);
    const d: BigInt = BigInt.toBigInt(b);
    return <BigInt>max(c, d);
  }

  public static min(a: BigInt | number | string, b: BigInt | number | string): BigInt {
    const c: BigInt = BigInt.toBigInt(a);
    const d: BigInt = BigInt.toBigInt(b);
    return <BigInt>min(c, d);
  }

  public minusminus(): BigInt {
    decrement(this);
    return this;
  }

  public multiply(n: BigInt | number | string): BigInt {
    multiply(this, BigInt.toBigInt(n));
    this.digits.length = this.precision;
    return this;
  }

  public negate(): BigInt {
    negate(this);
    return this;
  };

  public plusplus(): BigInt {
    increment(this);
    return this;
  }

  public pow(n: BigInt | number | string): BigInt {
    pow(this, BigInt.toBigInt(n));
    this.digits.length = this.precision;
    return this;
  }

  public remainder(divisor: BigInt | number | string): BigInt {
    assign(this, this.divideAndRemainder(divisor)[1]);
    return this;
  }

  public setBase(base: number): BigInt {
    setBase(this, base);
    this.digits.length = this.precision;
    return this;
  }

  public signum(): number {
    return signum(this);
  };

  public square(): BigInt {
    square(this);
    this.digits.length = this.precision;
    return this;
  }

  public subtract(n: BigInt | number | string): BigInt {
    subtract(this, BigInt.toBigInt(n));
    return this;
  }

  public static toBigInt(input: BigInt | number | string): BigInt {
    return BigInt.isBigInt(input) ? input : new BigInt(input);
  }

  public toString(sep: string = null, cipher: ReadonlyArray<string> = Constants.CIPHER): string {
    return toString(this, sep, cipher);
  }
}
