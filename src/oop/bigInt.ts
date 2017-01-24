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

export class BigInt {
  public static get MINUS_ONE(): BigInt {return new BigInt(-1)};
  public static get ZERO(): BigInt {return new BigInt(0)};
  public static get ONE(): BigInt {return new BigInt(1)};

  public base: number;
  public digits: number[];
  public precision: number;
  public isNegative: boolean;

  constructor(input: Integer | number | string) {
    if(isInteger(input)){
      copy(this, input);
    } else {
      assign(this, toInteger(input));
    }
  }

  public abs(isMutable?: boolean): BigInt {
    return BigInt.tryBigInt(abs(this, isMutable));
  };

  public add(addend: Integer, isMutable?: boolean): BigInt {
    return BigInt.tryBigInt(add(this, addend, isMutable));
  }

  public clone(): BigInt {
    return new BigInt(this);
  }

  public compareTo(B: Integer): number {
    return compare(this, B);
  }

  public set(source: Integer): BigInt {
    return <BigInt>copy(this, source);
  }

  public divide(divisor: Integer, isMutable?: boolean): BigInt {
    return this.divideAndRemainder(divisor, isMutable)[0];
  }

  public divideAndRemainder(divisor: Integer, isMutable?: boolean): [BigInt, BigInt] {
    const [Q, R]: [Integer, Integer] = divideAndRemainder(this, divisor, isMutable);
    return [BigInt.tryBigInt(Q), <BigInt>assign(BigInt.ZERO, R)];
  }

  public double(isMutable?: boolean): BigInt {
    return BigInt.tryBigInt(double(this, isMutable));
  }

  public gcd(B: Integer, isMutable?: boolean): BigInt {
    return BigInt.tryBigInt(gcd(this, B, isMutable));
  }

  public getBase(): number {
    return this.base;
  }

  public halve(isMutable?: boolean): [BigInt, BigInt] {
    const [Q, R]: [Integer, Integer] = halve(this, isMutable);
    return [BigInt.tryBigInt(Q), new BigInt(R.precision)];
  }

  public static isBigInt(n: any): n is BigInt {
    return n instanceof BigInt;
  }

  public isEven(): boolean {
    return isEven(this);
  }

  public isOdd(): boolean {
    return !isEven(this);
  }

  public lcm(B: Integer, isMutable?: boolean): BigInt {
    return BigInt.tryBigInt(lcm(this, B, isMutable));
  }

  public static max(A: Integer, B: Integer, isMutable?: boolean): BigInt {
    return BigInt.tryBigInt(max(A, B, isMutable));
  }

  public max(B: Integer, isMutable?: boolean): BigInt {
    const C: Integer = max(this, B, isMutable);
    if(C === this){
      return this;
    }
    if(C === B){
      return <BigInt>copy(this, C);
    }
    return <BigInt>assign(BigInt.ZERO, C);
  }

  public static min(A: Integer, B: Integer, isMutable?: boolean): BigInt {
    return BigInt.tryBigInt(min(A, B, isMutable));
  }

  public min(B: Integer, isMutable: boolean): BigInt {
    const C: Integer = min(this, B, isMutable);
    if(C === this){
      return this;
    }
    if(C === B){
      return <BigInt>copy(this, C);
    }
    return <BigInt>assign(BigInt.ZERO, C);
  }

  public minusminus(isMutable?: boolean): BigInt {
    return BigInt.tryBigInt(decrement(this, isMutable));
  }

  public multiply(multiplier: Integer, isMutable?: boolean): BigInt {
    return BigInt.tryBigInt(multiply(this, multiplier, isMutable));
  }

  public negate(isMutable?: boolean): BigInt {
    return BigInt.tryBigInt(negate(this, isMutable));
  };

  public plusplus(isMutable?: boolean): BigInt {
    return BigInt.tryBigInt(increment(this, isMutable));
  }

  public pow(power: Integer, isMutable?: boolean): BigInt {
    return BigInt.tryBigInt(pow(this, power, isMutable));
  }

  public remainder(divisor: Integer, isMutable?: boolean): BigInt {
    const R: BigInt = this.divideAndRemainder(divisor, isMutable)[1];
    return (isMutable) ? <BigInt>assign(this, R) : R;
  }

  public setBase(base: number, isMutable?: boolean): BigInt {
    return BigInt.tryBigInt(setBase(this, base, isMutable));
  }

  public signum(): number {
    return signum(this);
  };

  public square(isMutable?: boolean): BigInt {
    return BigInt.tryBigInt(square(this, isMutable));
  }

  public subtract(subtrahend: Integer, isMutable?: boolean): BigInt {
    return BigInt.tryBigInt(subtract(this, subtrahend, isMutable));
  }

  public toString(): string {
    return toString(this);
  }

  private static tryBigInt(A: BigInt | Integer): BigInt {
    return BigInt.isBigInt(A) ? A : <BigInt>assign(BigInt.ZERO, A);
  }
}
