import * as chai from 'chai';
//import * as sinon from 'sinon';
import {BigInt} from '../../src/oop/bigInt';

function testState(n: BigInt, isNegative: boolean, digits: number[], precision: number): void {
  chai.expect(n['isNegative']).to.equal(isNegative);
  chai.expect(n['digits']).to.deep.equal(digits);
  chai.expect(n['precision']).to.equal(precision);
}

describe('BigInt', function(){

  describe('MINUS_ONE', function(){
    it('should return new BigInt(-1)', function(){
      const n: BigInt = BigInt.MINUS_ONE;
      chai.expect(n).to.be.not.null;
      testState(n, true, [1], 1);
    });
  });

  describe('ZERO', function(){
    it('should return new BigInt(0)', function(){
      const n: BigInt = BigInt.ZERO;
      chai.expect(n).to.be.not.null;
      testState(n, false, [], 0);
    });
  });

  describe('ONE', function(){
    it('should return new BigInt(1)', function(){
      const n: BigInt = BigInt.ONE;
      chai.expect(n).to.be.not.null;
      testState(n, false, [1], 1);
    });
  });

  describe('isBigInt', function(){
    it('should return true when input is instance of class', function(){
      const n: BigInt = new BigInt(0);
      chai.expect(BigInt.isBigInt(n)).to.equal(true);
    });

    it('should return false when input is not instance of class', function(){
      const inputs: any[] = [
        null, undefined, 0, 1, [], [1,2,3], {}, {foo: 'bar'}, false, true, function(){}
      ];
      for(const input of inputs){
        chai.expect(BigInt.isBigInt(input)).to.equal(false);
      }
    });
  });

  describe('toBigInt', function(){
    it('should cast a valid input to class', function(){
      const n: BigInt = BigInt.toBigInt(0, true);
      chai.expect(n instanceof BigInt).to.equal(true);
    });

    it('should return input if input is already class', function(){
      const n: BigInt = new BigInt(0);
      const m: BigInt = BigInt.toBigInt(n, true);
      chai.expect(n).to.equal(m);
    });
  });

  describe('abs', function(){
    it('should return the absolute value of the number', function(){
      for(const v of [-1, -12, 0, 1, 12]){
        const n: BigInt = new BigInt(v).abs(true);
        chai.expect(n['isNegative']).to.equal(false);
      }
    })
  });

  describe('double', function(){
    it('should return self if zero', function(){
      const n: BigInt = new BigInt(0).double(true);
      testState(n, false, [], 0);
    });

    it('should double number', function(){
      let s: number[] = [1, 2, 25, 123];
      let d: number[] = [2, 4, 50, 246];
      for(let i: number = 0, n: number = s.length; i < n; ++i){
        const n: BigInt = new BigInt(s[i]).double(true);
        testState(n, false, [d[i]], 1);
      }
    });
  });

  describe('half', function(){
    it('should return self remainder zero if number is zero', function(){
      let r: BigInt;
      let n: BigInt = new BigInt(0);
      [n, r] = n.half(true);
      testState(n, false, [], 0);
      testState(r, false, [], 0);
    });

    it('should return self remainder zero if number is even', function(){
      let r: BigInt;
      let n: BigInt = new BigInt(12).setBase(10, true);
      [n, r] = n.half(true);
      testState(n, false, [6], 1);
      testState(r, false, [], 0);
    });

    it('should return self remainder one if number is odd', function(){
      let r: BigInt;
      let n: BigInt = new BigInt(15).setBase(10, true);
      [n, r] = n.half(true);
      testState(n, false, [7], 1);
      testState(r, false, [1], 1);
    });
  });

  describe('isEven', function(){
    it('should return true for zero', function(){
      const n: BigInt = new BigInt(0);
      chai.expect(n.isEven()).to.equal(true);
    });

    it('should return true if given even number in even base', function(){
      const n: BigInt = new BigInt(12345678);
      for(let base of [2, 8, 10, 16, 124]){
        chai.expect(n.setBase(base, true).isEven()).to.equal(true);
      }
    });

    it('should return false if given odd number in even base', function(){
      const n: BigInt = new BigInt(123456789);
      for(let base of [2, 8, 10, 16, 124]){
        chai.expect(n.setBase(base, true).isEven()).to.equal(false);
      }
    });

    it('should return true if given even number in odd base', function(){
      const n: BigInt = new BigInt(12345678);
      for(let base of [3, 7, 11, 15, 123]){
        chai.expect(n.setBase(base, true).isEven()).to.equal(true);
      }
    });

    it('should return false if given odd number in odd base', function(){
      const n: BigInt = new BigInt(123456789);
      for(let base of [3, 7, 11, 15, 123]){
        chai.expect(n.setBase(base, true).isEven()).to.equal(false);
      }
    });
  });

  describe('isOdd', function(){
    it('should return false for zero', function(){
      const n: BigInt = new BigInt(0);
      chai.expect(n.isOdd()).to.equal(false);
    });

    it('should return false if given even number in even base', function(){
      const n: BigInt = new BigInt(12345678);
      for(let base of [2, 8, 10, 16, 124]){
        chai.expect(n.setBase(base, true).isOdd()).to.equal(false);
      }
    });

    it('should return true if given odd number in even base', function(){
      const n: BigInt = new BigInt(123456789);
      for(let base of [2, 8, 10, 16, 124]){
        chai.expect(n.setBase(base, true).isOdd()).to.equal(true);
      }
    });

    it('should return false if given even number in odd base', function(){
      const n: BigInt = new BigInt(12345678);
      for(let base of [3, 7, 11, 15, 123]){
        chai.expect(n.setBase(base, true).isOdd()).to.equal(false);
      }
    });

    it('should return true if given odd number in odd base', function(){
      const n: BigInt = new BigInt(123456789);
      for(let base of [3, 7, 11, 15, 123]){
        chai.expect(n.setBase(base, true).isOdd()).to.equal(true);
      }
    });
  });

  describe('negate', function(){
    it('should ensure -0 === 0', function(){
      const n: BigInt = new BigInt(0).negate(true);
      testState(n, false, [], 0);
    });

    it('should switch a positive number to negative', function(){
      const n: BigInt = new BigInt(1).negate(true);
      testState(n, true, [1], 1);
    });

    it('should switch a negative number to positive', function(){
      const n: BigInt = new BigInt(-1).negate(true);
      testState(n, false, [1], 1);
    });
  });

  describe('signum', function(){
    it('should return one if number is positive', function(){
      const n: BigInt = new BigInt(12);
      chai.expect(n.signum()).to.equal(1);
    });

    it('should return zero if number is zero', function(){
      const n: BigInt = new BigInt(0);
      chai.expect(n.signum()).to.equal(0);
    });

    it('should return negative one if number is negative', function(){
      const n: BigInt = new BigInt(-12);
      chai.expect(n.signum()).to.equal(-1);
    });
  });

  describe('square', function(){
    it('should return itself if zero', function(){
      const n: BigInt = new BigInt(0);
      n.square(true);
      testState(n, false, [], 0);
    });

    it('should return itself if one', function(){
      const n: BigInt = new BigInt(1);
      n.square(true);
      testState(n, false, [1], 1);
    });

    it('should return itself if negative one', function(){
      const n: BigInt = new BigInt(-1);
      n.square(true);
      testState(n, false, [1], 1);
    });

    it('should square normally', function(){
      const n: BigInt = new BigInt(5).setBase(10, true);
      n.square(true);
      testState(n, false, [5, 2], 2);
    });
  })

  describe('subtract', function(){
    it('should return zero when passed itself', function(){
      const n: BigInt = new BigInt(5);
      n.subtract(n, true);
      testState(n, false, [], 0);
    });

    it('should return number if passed zero', function(){
      const a: BigInt = new BigInt(5);
      const b: BigInt = new BigInt(0);
      a.subtract(b, true);
      testState(a, false, [5], 1);
    });

    it('should return negative input when subtracting from zero', function(){
      let a: BigInt = new BigInt(0);
      let b: BigInt = new BigInt(5);
      a.subtract(b, true);
      testState(a, true, [5], 1);

      a = new BigInt(0);
      a.subtract(b.negate(true), true);
      testState(a, false, [5], 1);
    });

    it('should "add" numbers if signs differ', function(){
      let a: BigInt = new BigInt(4);
      let b: BigInt = new BigInt(-5);
      a.subtract(b, true);
      testState(a, false, [9], 1);

      a = new BigInt(-4);
      a.subtract(b.negate(true), true);
      testState(a, true, [9], 1);
    });

    it('should return zero when subtracting the same value', function(){
      let a: BigInt = new BigInt(5);
      let b: BigInt = new BigInt(5);
      a.subtract(b, true);
      testState(a, false, [], 0);
    });

    it('should normalize bases if needed', function(){
      let a: BigInt = new BigInt(5);
      let b: BigInt = new BigInt(5).setBase(2, true);
      a.subtract(b, true);
      testState(a, false, [], 0);
    });

    it('should subtract normally when minuend > subtrahend', function(){
      let a: BigInt = new BigInt(9);
      let b: BigInt = new BigInt(4);
      a.subtract(b, true);
      testState(a, false, [5], 1);
      //TODO: Check if normal subtraction called
    });

    it('should reverse subtract when minuend < subtrahend', function(){
      let a: BigInt = new BigInt(4);
      let b: BigInt = new BigInt(9);
      a.subtract(b, true);
      testState(a, true, [5], 1);
      //TODO: Check if reverse subtraction called
    });
  });
});
