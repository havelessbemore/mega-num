import * as chai from 'chai';
//import * as sinon from 'sinon';
import BigMint from '../src/bigMint';

function testState(n: BigMint, isNegative: boolean, integer: number[], digits: number): void {
  chai.expect(n['isNegative']).to.equal(isNegative);
  chai.expect(n['integer']).to.deep.equal(integer);
  chai.expect(n['digits']).to.equal(digits);
}

describe('BigMint', function(){

  describe('BigMint.MINUS_ONE', function(){
    it('should return new BigMint(-1)', function(){
      const n: BigMint = BigMint.MINUS_ONE;
      chai.expect(n).to.be.not.null;
      testState(n, true, [1], 1);
    });
  });

  describe('BigMint.ZERO', function(){
    it('should return new BigMint(0)', function(){
      const n: BigMint = BigMint.ZERO;
      chai.expect(n).to.be.not.null;
      testState(n, false, [], 0);
    });
  });

  describe('BigMint.ONE', function(){
    it('should return new BigMint(1)', function(){
      const n: BigMint = BigMint.ONE;
      chai.expect(n).to.be.not.null;
      testState(n, false, [1], 1);
    });
  });

  describe('BigMint.isBigMint', function(){
    it('should return true when input is instance of class', function(){
      const n: BigMint = new BigMint(0);
      chai.expect(BigMint.isBigMint(n)).to.equal(true);
    });

    it('should return false when input is not instance of class', function(){
      const inputs: any[] = [
        null, undefined, 0, 1, [], [1,2,3], {}, {foo: 'bar'}, false, true, function(){}
      ];
      for(const input of inputs){
        chai.expect(BigMint.isBigMint(input)).to.equal(false);
      }
    });
  });

  describe('BigMint.toBigMint', function(){
    it('should cast a valid input to class', function(){
      const n: BigMint = BigMint.toBigMint(0);
      chai.expect(n.constructor.name).to.equal('BigMint');
    });

    it('should return input if input is already class', function(){
      const n: BigMint = new BigMint(0);
      const m: BigMint = BigMint.toBigMint(n);
      chai.expect(n).to.equal(m);
    });
  });

  describe('abs', function(){
    it('should return the absolute value of the number', function(){
      for(const v of [-1, -12, 0, 1, 12]){
        const n: BigMint = new BigMint(v).abs();
        chai.expect(n['isNegative']).to.equal(false);
      }
    })
  });

  describe('signum', function(){
    it('should return the signum of the number', function(){
      const n: number[] = [-1, -12, 0, 1, 12];
      const s: number[] = [-1, -1, 0, 1, 1];
      for(let i = 0, j = n.length; i < j; ++i){
        chai.expect(new BigMint(n[i]).signum()).to.equal(s[i]);
      }
    });
  });

  describe('subtract', function(){
    it('should return zero when passed itself', function(){
      const n: BigMint = new BigMint(5);
      n.subtract(n);
      testState(n, false, [], 0);
    });

    it('should return number if passed zero', function(){
      const a: BigMint = new BigMint(5);
      const b: BigMint = new BigMint(0);
      a.subtract(b);
      testState(a, false, [5], 1);
    });

    it('should return negative input when subtracting from zero', function(){
      let a: BigMint = new BigMint(0);
      let b: BigMint = new BigMint(5);
      a.subtract(b);
      testState(a, true, [5], 1);

      a = new BigMint(0);
      a.subtract(b.negate());
      testState(a, false, [5], 1);
    });

    it('should "add" numbers if signs differ', function(){
      let a: BigMint = new BigMint(4);
      let b: BigMint = new BigMint(-5);
      a.subtract(b);
      testState(a, false, [9], 1);

      a = new BigMint(-4);
      a.subtract(b.negate());
      testState(a, true, [9], 1);
    });

    it('should return zero when subtracting the same value', function(){
      let a: BigMint = new BigMint(5);
      let b: BigMint = new BigMint(5);
      a.subtract(b);
      testState(a, false, [], 0);
    });

    it('should normalize bases if needed', function(){
      let a: BigMint = new BigMint(5);
      let b: BigMint = new BigMint(5).setBase(2);
      a.subtract(b);
      testState(a, false, [], 0);
    });

    /*TODO
    it('should subtract normally when minuend > subtrahend', function(){
      let a: BigMint = new BigMint(9);
      let b: BigMint = new BigMint(4);
      a.subtract(b);
      testState(a, false, [5], 1);
    });

    it('should reverse subtract when minuend < subtrahend', function(){
      let a: BigMint = new BigMint(4);
      let b: BigMint = new BigMint(9);
      a.subtract(b);
      testState(a, true, [5], 1);
    });
    */
  })
});
