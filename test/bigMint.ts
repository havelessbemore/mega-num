import * as chai from 'chai';
//import * as sinon from 'sinon';
import BigMint from '../src/bigMint';

describe('BigMint', function(){

  describe('BigMint.MINUS_ONE', function(){
    it('should return new BigMint(-1)', function(){
      const n: BigMint = BigMint.MINUS_ONE;
      chai.expect(n).not.null;
      chai.expect(n['isNegative']).equal(true);
      chai.expect(n['integer']).deep.equal([1]);
      chai.expect(n['digits']).equal(1);
    });
  });

  describe('BigMint.ZERO', function(){
    it('should return new BigMint(0)', function(){
      const n: BigMint = BigMint.ZERO;
      chai.expect(n).not.null;
      chai.expect(n['isNegative']).equal(false);
      chai.expect(n['integer']).deep.equal([]);
      chai.expect(n['digits']).equal(0);
    });
  });

  describe('BigMint.ONE', function(){
    it('should return new BigMint(1)', function(){
      const n: BigMint = BigMint.ONE;
      chai.expect(n).not.null;
      chai.expect(n['isNegative']).equal(false);
      chai.expect(n['integer']).deep.equal([1]);
      chai.expect(n['digits']).equal(1);
    });
  });

  describe('BigMint.isBigMint', function(){
    it('should return true when input is instance of class', function(){
      const n: BigMint = new BigMint(0);
      chai.expect(BigMint.isBigMint(n)).equal(true);
    });

    it('should return false when input is not instance of class', function(){
      const inputs: any[] = [
        null, undefined, 0, 1, [], [1,2,3], {}, {foo: 'bar'}, false, true, function(){}
      ];
      for(const input of inputs){
        chai.expect(BigMint.isBigMint(input)).equal(false);
      }
    });
  });

  describe('BigMint.toBigMint', function(){
    
  });
});
