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
import {isInteger} from '../functional/isInteger';
import {toInteger} from '../functional/toInteger';
import {toString} from '../functional/toString';
import {assign} from '../util/intUtils';

export class BigInt implements Integer {
  static get MINUS_ONE(): BigInt {return new BigInt(-1);}
  static get ZERO(): BigInt {return new BigInt(0);}
  static get ONE(): BigInt {return new BigInt(1);}

  base!: number;
  digits!: number[];
  precision!: number;
  isNegative!: boolean;

  constructor(input: Integer | number | string) {
    if(isInteger(input)){
      copy(this, input);
    } else {
      assign(this, toInteger(input));
    }
  }

  abs(): BigInt {
    return BigInt.tryBigInt(abs(this));
  }

  add(addend: Integer): BigInt {
    return BigInt.tryBigInt(add(this, addend));
  }

  clone(): BigInt {
    return new BigInt(this);
  }

  compareTo(B: Integer): number {
    return compare(this, B);
  }

  divide(divisor: Integer): BigInt {
    return this.divideAndRemainder(divisor)[0];
  }

  divideAndRemainder(divisor: Integer): [BigInt, BigInt] {
    const [Q, R]: [Integer, Integer] = divideAndRemainder(this, divisor);
    return [BigInt.tryBigInt(Q), assign(BigInt.ZERO, R) as BigInt];
  }

  double(): BigInt {
    return BigInt.tryBigInt(double(this));
  }

  gcd(B: Integer): BigInt {
    return BigInt.tryBigInt(gcd(this, B));
  }

  getBase(): number {
    return this.base;
  }

  halve(): [BigInt, BigInt] {
    const [Q, R]: [Integer, Integer] = halve(this);
    return [BigInt.tryBigInt(Q), new BigInt(R.precision)];
  }

  // tslint:disable-next-line:no-any
  static isBigInt(n: any): n is BigInt {
    return n instanceof BigInt;
  }

  isEven(): boolean {
    return isEven(this);
  }

  isOdd(): boolean {
    return !isEven(this);
  }

  lcm(B: Integer): BigInt {
    return BigInt.tryBigInt(lcm(this, B));
  }

  static max(A: Integer, B: Integer): BigInt {
    return BigInt.tryBigInt(max(A, B));
  }

  max(B: Integer): BigInt {
    const C: Integer = max(this, B);
    if(C === this){
      return this;
    }
    if(C === B){
      return copy(this, C) as BigInt;
    }
    return assign(BigInt.ZERO, C) as BigInt;
  }

  static min(A: Integer, B: Integer): BigInt {
    return BigInt.tryBigInt(min(A, B));
  }

  min(B: Integer): BigInt {
    const C: Integer = min(this, B);
    if(C === this){
      return this;
    }
    if(C === B){
      return copy(this, C) as BigInt;
    }
    return assign(BigInt.ZERO, C) as BigInt;
  }

  minusminus(): BigInt {
    return BigInt.tryBigInt(decrement(this));
  }

  multiply(multiplier: Integer): BigInt {
    return BigInt.tryBigInt(multiply(this, multiplier));
  }

  negate(): BigInt {
    return BigInt.tryBigInt(negate(this));
  }

  plusplus(): BigInt {
    return BigInt.tryBigInt(increment(this));
  }

  pow(power: Integer): BigInt {
    return BigInt.tryBigInt(pow(this, power));
  }

  remainder(divisor: Integer): BigInt {
    const R: BigInt = this.divideAndRemainder(divisor)[1];
    return assign(this, R) as BigInt;
  }

  set(source: Integer): BigInt {
    return copy(this, source) as BigInt;
  }

  setBase(base: number): BigInt {
    return BigInt.tryBigInt(setBase(this, base));
  }

  signum(): number {
    return signum(this);
  }

  square(): BigInt {
    return BigInt.tryBigInt(square(this));
  }

  subtract(subtrahend: Integer): BigInt {
    return BigInt.tryBigInt(subtract(this, subtrahend));
  }

  toString(): string {
    return toString(this);
  }

  private static tryBigInt(A: Integer): BigInt {
    return BigInt.isBigInt(A) ? A : assign(BigInt.ZERO, A) as BigInt;
  }
}
