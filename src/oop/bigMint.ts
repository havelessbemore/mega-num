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
import {isInteger} from '../functional/isInteger';
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
import {toInteger} from '../functional/toInteger';
import {toString} from '../functional/toString';

export class BigMint {

  public static readonly MIN_BASE: number = Constants.MIN_BASE;
  public static readonly MAX_BASE: number = Constants.MAX_BASE;
  public static readonly DEFAULT_BASE: number = Constants.DEFAULT_BASE;
  public static readonly MAX_PRECISION: number = Constants.MAX_PRECISION;

  public static get MINUS_ONE(): BigMint {return new BigMint(-1)};
  public static get ZERO(): BigMint {return new BigMint(0)};
  public static get ONE(): BigMint {return new BigMint(1)};

  public base: number;
  public digits: number[];
  public precision: number;
  public isNegative: boolean;

  constructor(input: Integer | number | string) {
    if(isInteger(input)){
      this.copy(input);
    } else {
      assign(this, toInteger(input, BigMint.DEFAULT_BASE));
    }
    this.digits.length = this.precision;
  }

  public abs(): BigMint {
    abs(this);
    return this;
  };

  public add(addend: Integer): BigMint {
    add(this, addend);
    this.digits.length = this.precision;
    return this;
  }

  public clone(): BigMint {
    return new BigMint(this);
  }

  public compareTo(B: Integer): number {
    return compare(this, B);
  }

  public copy(source: Integer): BigMint {
    copy(this, source);
    return this;
  }

  public divide(divisor: Integer): BigMint {
    this.divideAndRemainder(divisor);
    return this;
  }

  public divideAndRemainder(divisor: Integer): [BigMint, BigMint] {
    let Q: Integer;
    let R: Integer;
    [Q, R] = divideAndRemainder(this, divisor);
    Q.digits.length = Q.precision;
    R.digits.length = R.precision;
    return [<BigMint>assign(this, Q), <BigMint>assign(BigMint.ZERO, R)];
  }

  public double(): BigMint {
    double(this);
    return this;
  }

  public gcd(B: Integer): BigMint {
    gcd(this, B);
    this.digits.length = this.precision;
    return this;
  }

  public getBase(): number {
    return this.base;
  }

  public half(): [BigMint, BigMint] {
    let remainder: Integer;
    [,remainder] = halve(this);
    this.digits.length = this.precision;
    return [this, (remainder.precision === 0) ? BigMint.ZERO : BigMint.ONE];
  }

  public static isBigMint(n: any): n is BigMint {
    return n instanceof BigMint;
  }

  public isEven(): boolean {
    return isEven(this);
  }

  public isOdd(): boolean {
    return !this.isEven();
  }

  //See: https://en.wikipedia.org/wiki/Least_common_multiple
  public lcm(B: Integer): BigMint {
    lcm(this, B);
    this.digits.length = this.precision;
    return this;
  }

  public static max(A: Integer, B: Integer): BigMint {
    return BigMint.toBigMint(max(A, B));
  }

  public static min(A: Integer, B: Integer): BigMint {
    return BigMint.toBigMint(min(A, B));
  }

  public minusminus(): BigMint {
    decrement(this);
    this.digits.length = this.precision;
    return this;
  }

  public multiply(multiplier: Integer): BigMint {
    multiply(this, multiplier);
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

  public pow(power: Integer): BigMint {
    pow(this, power);
    this.digits.length = this.precision;
    return this;
  }

  public remainder(divisor: Integer): BigMint {
    assign(this, this.divideAndRemainder(divisor)[1]);
    return this;
  }

  public setBase(base: number): BigMint {
    setBase(this, base);
    this.digits.length = this.precision;
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

  public subtract(subtrahend: Integer): BigMint {
    subtract(this, subtrahend);
    this.digits.length = this.precision;
    return this;
  }

  public static toBigMint(input: Integer | number | string): BigMint {
    return BigMint.isBigMint(input) ? input : new BigMint(input);
  }

  public toString(sep: string = null, cipher: ReadonlyArray<string> = null): string {
    return toString(this, sep, cipher);
  }
}
