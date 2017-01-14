import {Globals} from '../globals';
import {Integer} from '../integer';
import {abs} from '../functional/abs';
import {add} from '../functional/add';
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
import {toInteger} from '../functional/toInteger';
import {toString} from '../functional/toString';
import {assign} from '../util/intUtils';

export class BigInt {
  public static get MINUS_ONE(): BigInt {return new BigInt(-1)};
  public static get ZERO(): BigInt {return new BigInt(0)};
  public static get ONE(): BigInt {return new BigInt(1)};

  public base: number;
  public digits: number[];
  public precision: number;
  public isNegative: boolean;

  constructor(input: Integer | number | string) {
    assign(this, toInteger(input, Globals.DEFAULT_BASE, false));
    this.digits.length = this.precision;
  }

  public abs(isMutable?: boolean): BigInt {
    return BigInt.toBigInt(abs(this, isMutable), true);
  };

  public add(addend: Integer, isMutable?: boolean): BigInt {
    const A: Integer = add(this, addend, isMutable);
    A.digits.length = A.precision;
    return BigInt.toBigInt(A, true);
  }

  public clone(): BigInt {
    return new BigInt(this);
  }

  public compareTo(B: Integer): number {
    return compare(this, B);
  }

  public copy(source: Integer): BigInt {
    copy(this, source);
    return this;
  }

  public divide(divisor: Integer, isMutable?: boolean): BigInt {
    return this.divideAndRemainder(divisor, isMutable)[0];
  }

  public divideAndRemainder(divisor: Integer, isMutable?: boolean): [BigInt, BigInt] {
    let Q: Integer;
    let R: Integer;
    [Q, R] = divideAndRemainder(this, divisor, isMutable);
    Q.digits.length = Q.precision;
    R.digits.length = R.precision;
    return [BigInt.toBigInt(Q, true), <BigInt>assign(BigInt.ZERO, R)];
  }

  public double(isMutable?: boolean): BigInt {
    return BigInt.toBigInt(double(this, isMutable), true);
  }

  public gcd(B: Integer, isMutable?: boolean): BigInt {
    const A: Integer = gcd(this, B, isMutable);
    A.digits.length = A.precision;
    return BigInt.toBigInt(A, true);
  }

  public getBase(): number {
    return this.base;
  }

  public half(isMutable?: boolean): [BigInt, BigInt] {
    let Q: Integer;
    let R: Integer;
    [Q, R] = halve(this, isMutable);
    Q.digits.length = Q.precision;
    return [BigInt.toBigInt(Q, true), new BigInt(R.precision)];
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
  public lcm(B: Integer, isMutable?: boolean): BigInt {
    const A: Integer = lcm(this, B, isMutable);
    A.digits.length = A.precision;
    return BigInt.toBigInt(A, true);
  }

  public static max(A: Integer, B: Integer, isMutable?: boolean): BigInt {
    return BigInt.toBigInt(max(A, B, isMutable), true);
  }

  public max(B: Integer, isMutable?: boolean): BigInt {
    const out: Integer = max(this, B, true);
    if(isMutable && this !== out){
      copy(this, B);
      return this;
    }
    return BigInt.toBigInt(out, isMutable);
  }

  public static min(A: Integer, B: Integer, isMutable?: boolean): BigInt {
    return BigInt.toBigInt(min(A, B, isMutable), true);
  }

  public min(B: Integer, isMutable?: boolean): BigInt {
    const out: Integer = min(this, B, true);
    if(isMutable && this !== out){
      copy(this, B);
      return this;
    }
    return BigInt.toBigInt(out, isMutable);
  }

  public minusminus(isMutable?: boolean): BigInt {
    const A: Integer = decrement(this, isMutable);
    A.digits.length = A.precision;
    return BigInt.toBigInt(A, true);
  }

  public multiply(multiplier: Integer, isMutable?: boolean): BigInt {
    const A: Integer = multiply(this, multiplier, isMutable);
    A.digits.length = A.precision;
    return BigInt.toBigInt(A, true);
  }

  public negate(isMutable?: boolean): BigInt {
    return BigInt.toBigInt(negate(this, isMutable), true);
  };

  public plusplus(isMutable?: boolean): BigInt {
    return BigInt.toBigInt(increment(this, isMutable), true);
  }

  public pow(power: Integer, isMutable?: boolean): BigInt {
    const A: Integer = pow(this, power, isMutable);
    A.digits.length = A.precision;
    return BigInt.toBigInt(A, true);
  }

  public remainder(divisor: Integer, isMutable?: boolean): BigInt {
    const R: BigInt = this.divideAndRemainder(divisor, isMutable)[1];
    if(isMutable){
      assign(this, R);
    }
    return this;
  }

  public setBase(base: number, isMutable?: boolean): BigInt {
    const A: Integer = setBase(this, base, isMutable);
    A.digits.length = A.precision;
    return BigInt.toBigInt(A, true);
  }

  public signum(): number {
    return signum(this);
  };

  public square(isMutable?: boolean): BigInt {
    const A: Integer = square(this, isMutable);
    A.digits.length = A.precision;
    return BigInt.toBigInt(A, true);
  }

  public subtract(subtrahend: Integer, isMutable?: boolean): BigInt {
    const A: Integer = subtract(this, subtrahend, isMutable);
    A.digits.length = A.precision;
    return BigInt.toBigInt(A, true);
  }

  public static toBigInt(input: Integer | number | string, isMutable?: boolean): BigInt {
    return (isMutable && BigInt.isBigInt(input)) ? input : new BigInt(input);
  }

  public toString(sep: string = null, cipher: ReadonlyArray<string> = null): string {
    return toString(this, sep, cipher);
  }
}
