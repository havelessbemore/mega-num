import * as chai from 'chai';
import {BigInt} from '../../src/oop/bigInt';

function testState(n: BigInt, isNegative: boolean, digits: number[], precision: number): void {
  chai.expect(n['isNegative']).to.equal(isNegative);
  chai.expect(n['digits']).to.deep.equal(digits);
  chai.expect(n['precision']).to.equal(precision);
}

describe('BigInt', () => {

  describe('MINUS_ONE', () => {
    it('should return new BigInt(-1)', () => {
      const n: BigInt = BigInt.MINUS_ONE;
      // tslint:disable-next-line:no-unused-expression
      chai.expect(n).to.be.not.null;
      testState(n, true, [1], 1);
    });
  });

  describe('ZERO', () => {
    it('should return new BigInt(0)', () => {
      const n: BigInt = BigInt.ZERO;
      // tslint:disable-next-line:no-unused-expression
      chai.expect(n).to.be.not.null;
      testState(n, false, [], 0);
    });
  });

  describe('ONE', () => {
    it('should return new BigInt(1)', () => {
      const n: BigInt = BigInt.ONE;
      // tslint:disable-next-line:no-unused-expression
      chai.expect(n).to.be.not.null;
      testState(n, false, [1], 1);
    });
  });

  describe('isBigInt', () => {
    it('should return true when input is instance of class', () => {
      const n: BigInt = new BigInt(0);
      chai.expect(BigInt.isBigInt(n)).to.equal(true);
    });

    it('should return false when input is not instance of class', () => {
      // tslint:disable-next-line:no-any
      const inputs: any[] = [
        null, undefined, 0, 1, [], [1,2,3], {}, {foo: 'bar'}, false, true, () => {}
      ];
      for(const input of inputs){
        chai.expect(BigInt.isBigInt(input)).to.equal(false);
      }
    });
  });

  /*
  describe('toBigInt', () => {
    it('should cast a valid input to class', () => {
      const n: BigInt = BigInt.toBigInt(0, true);
      chai.expect(n instanceof BigInt).to.equal(true);
    });

    it('should return input if input is already class', () => {
      const n: BigInt = new BigInt(0);
      const m: BigInt = BigInt.toBigInt(n, true);
      chai.expect(n).to.equal(m);
    });
  });
  */

  describe('abs', () => {
    it('should return the absolute value of the number', () => {
      for(const v of [-1, -12, 0, 1, 12]){
        const n: BigInt = new BigInt(v).abs();
        chai.expect(n['isNegative']).to.equal(false);
      }
    });
  });

  describe('double', () => {
    it('should return self if zero', () => {
      const n: BigInt = new BigInt(0).double();
      testState(n, false, [], 0);
    });

    it('should double number', () => {
      const s: number[] = [1, 2, 25, 123];
      const d: number[] = [2, 4, 50, 246];
      for(let i = 0, n: number = s.length; i < n; ++i){
        const n: BigInt = new BigInt(s[i]).double();
        testState(n, false, [d[i]], 1);
      }
    });
  });

  describe('halve', () => {
    it('should return self remainder zero if number is zero', () => {
      let r: BigInt;
      let n: BigInt = new BigInt(0);
      [n, r] = n.halve();
      n.digits.length = n.precision;
      testState(n, false, [], 0);
      testState(r, false, [], 0);
    });

    it('should return self remainder zero if number is even', () => {
      let r: BigInt;
      let n: BigInt = new BigInt(12).setBase(10);
      [n, r] = n.halve();
      n.digits.length = n.precision;
      testState(n, false, [6], 1);
      testState(r, false, [], 0);
    });

    it('should return self remainder one if number is odd', () => {
      let r: BigInt;
      let n: BigInt = new BigInt(15).setBase(10);
      [n, r] = n.halve();
      n.digits.length = n.precision;
      testState(n, false, [7], 1);
      testState(r, false, [1], 1);
    });
  });

  describe('isEven', () => {
    it('should return true for zero', () => {
      const n: BigInt = new BigInt(0);
      chai.expect(n.isEven()).to.equal(true);
    });

    it('should return true if given even number in even base', () => {
      const n: BigInt = new BigInt(12345678);
      for(const base of [2, 8, 10, 16, 124]){
        chai.expect(n.setBase(base).isEven()).to.equal(true);
      }
    });

    it('should return false if given odd number in even base', () => {
      const n: BigInt = new BigInt(123456789);
      for(const base of [2, 8, 10, 16, 124]){
        chai.expect(n.setBase(base).isEven()).to.equal(false);
      }
    });

    it('should return true if given even number in odd base', () => {
      const n: BigInt = new BigInt(12345678);
      for(const base of [3, 7, 11, 15, 123]){
        chai.expect(n.setBase(base).isEven()).to.equal(true);
      }
    });

    it('should return false if given odd number in odd base', () => {
      const n: BigInt = new BigInt(123456789);
      for(const base of [3, 7, 11, 15, 123]){
        chai.expect(n.setBase(base).isEven()).to.equal(false);
      }
    });
  });

  describe('isOdd', () => {
    it('should return false for zero', () => {
      const n: BigInt = new BigInt(0);
      chai.expect(n.isOdd()).to.equal(false);
    });

    it('should return false if given even number in even base', () => {
      const n: BigInt = new BigInt(12345678);
      for(const base of [2, 8, 10, 16, 124]){
        chai.expect(n.setBase(base).isOdd()).to.equal(false);
      }
    });

    it('should return true if given odd number in even base', () => {
      const n: BigInt = new BigInt(123456789);
      for(const base of [2, 8, 10, 16, 124]){
        chai.expect(n.setBase(base).isOdd()).to.equal(true);
      }
    });

    it('should return false if given even number in odd base', () => {
      const n: BigInt = new BigInt(12345678);
      for(const base of [3, 7, 11, 15, 123]){
        chai.expect(n.setBase(base).isOdd()).to.equal(false);
      }
    });

    it('should return true if given odd number in odd base', () => {
      const n: BigInt = new BigInt(123456789);
      for(const base of [3, 7, 11, 15, 123]){
        chai.expect(n.setBase(base).isOdd()).to.equal(true);
      }
    });
  });

  describe('negate', () => {
    it('should ensure -0 === 0', () => {
      const n: BigInt = new BigInt(0).negate();
      testState(n, false, [], 0);
    });

    it('should switch a positive number to negative', () => {
      const n: BigInt = new BigInt(1).negate();
      testState(n, true, [1], 1);
    });

    it('should switch a negative number to positive', () => {
      const n: BigInt = new BigInt(-1).negate();
      testState(n, false, [1], 1);
    });
  });

  describe('signum', () => {
    it('should return one if number is positive', () => {
      const n: BigInt = new BigInt(12);
      chai.expect(n.signum()).to.equal(1);
    });

    it('should return zero if number is zero', () => {
      const n: BigInt = new BigInt(0);
      chai.expect(n.signum()).to.equal(0);
    });

    it('should return negative one if number is negative', () => {
      const n: BigInt = new BigInt(-12);
      chai.expect(n.signum()).to.equal(-1);
    });
  });

  describe('square', () => {
    it('should return itself if zero', () => {
      const n: BigInt = new BigInt(0);
      n.square();
      n.digits.length = n.precision;
      testState(n, false, [], 0);
    });

    it('should return itself if one', () => {
      const n: BigInt = new BigInt(1);
      n.square();
      n.digits.length = n.precision;
      testState(n, false, [1], 1);
    });

    it('should return itself if negative one', () => {
      const n: BigInt = new BigInt(-1);
      n.square();
      n.digits.length = n.precision;
      testState(n, false, [1], 1);
    });

    it('should square normally', () => {
      const n: BigInt = new BigInt(5).setBase(10);
      n.square();
      n.digits.length = n.precision;
      testState(n, false, [5, 2], 2);
    });
  });

  describe('subtract', () => {
    it('should return zero when passed itself', () => {
      const n: BigInt = new BigInt(5);
      n.subtract(n);
      testState(n, false, [], 0);
    });

    it('should return number if passed zero', () => {
      const a: BigInt = new BigInt(5);
      const b: BigInt = new BigInt(0);
      a.subtract(b);
      testState(a, false, [5], 1);
    });

    it('should return negative input when subtracting from zero', () => {
      let a: BigInt = new BigInt(0);
      const b: BigInt = new BigInt(5);
      a.subtract(b);
      testState(a, true, [5], 1);

      a = new BigInt(0);
      a.subtract(b.negate());
      testState(a, false, [5], 1);
    });

    it('should "add" numbers if signs differ', () => {
      let a: BigInt = new BigInt(4);
      const b: BigInt = new BigInt(-5);
      a.subtract(b);
      testState(a, false, [9], 1);

      a = new BigInt(-4);
      a.subtract(b.negate());
      testState(a, true, [9], 1);
    });

    it('should return zero when subtracting the same value', () => {
      const a: BigInt = new BigInt(5);
      const b: BigInt = new BigInt(5);
      a.subtract(b);
      testState(a, false, [], 0);
    });

    it('should normalize bases if needed', () => {
      const a: BigInt = new BigInt(5);
      const b: BigInt = new BigInt(5).setBase(2);
      a.subtract(b);
      testState(a, false, [], 0);
    });

    it('should subtract normally when minuend > subtrahend', () => {
      const a: BigInt = new BigInt(9);
      const b: BigInt = new BigInt(4);
      a.subtract(b);
      testState(a, false, [5], 1);
      //TODO: Check if normal subtraction called
    });

    it('should reverse subtract when minuend < subtrahend', () => {
      const a: BigInt = new BigInt(4);
      const b: BigInt = new BigInt(9);
      a.subtract(b);
      testState(a, true, [5], 1);
      //TODO: Check if reverse subtraction called
    });
  });
});
