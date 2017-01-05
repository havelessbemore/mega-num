import {assert, expect} from 'chai';
import * as util from '../../src/util/numUtils';

describe('numUtils', function(){

  describe('changeBase', function(){
    it('should return zero when input is zero', function(){
      assert.deepEqual(util.changeBase([],0,0,2,16), [[], 0]);
      assert.deepEqual(util.changeBase([],0,0,16,2), [[], 0]);
    });

    it('should return one when input is one', function(){
      assert.deepEqual(util.changeBase([1],0,1,2,16), [[1], 1]);
      assert.deepEqual(util.changeBase([0,0,1,0],2,3,2,16), [[1], 1]);
      assert.deepEqual(util.changeBase([0,0,1,0],2,3,16,2), [[1], 1]);
    });

    it('should change numbers in base 10 to base 2', function(){
      assert.deepEqual(util.changeBase([2],0,1,10,2), [[0,1], 2]);
      assert.deepEqual(util.changeBase([0,1],0,2,10,2), [[0,1,0,1], 4]);
      assert.deepEqual(util.changeBase([6,1],0,2,10,2), [[0,0,0,0,1], 5]);
      assert.deepEqual(util.changeBase([1,3],0,2,10,2), [[1,1,1,1,1], 5]);
    });

    it('should change numbers in base 7 to base 19', function(){
      assert.deepEqual(util.changeBase([2],0,1,7,19), [[2], 1]);
      assert.deepEqual(util.changeBase([0,1],0,2,7,19), [[7], 1]);
      assert.deepEqual(util.changeBase([5,2],0,2,7,19), [[0,1], 2]);
      assert.deepEqual(util.changeBase([2,4,0,1],0,4,7,19), [[12,0,1], 3]);
      assert.deepEqual(util.changeBase([1,4,6,1,5,0,1],0,7,7,19), [[18,18,18,18], 4]);
    });
  });

  describe('compare', function(){
    it('should return -1 when A.length < B.length', function(){
      assert.equal(util.compare([],0,0,[1],0,1), -1);
      assert.equal(util.compare([1],0,1,[2,3],0,2), -1);
      assert.equal(util.compare([0,1,2,3],0,4,[4,5,6,7,8,9,1],0,7), -1);
      assert.equal(util.compare([0,1,2,3],1,4,[4,5,6,7,8,9,1],2,7), -1);
      assert.equal(util.compare([0,1,2,3],1,3,[4,5,6,7,8,9,1],2,6), -1);
    });

    it('should return 1 when A.length > B.length', function(){
      assert.equal(util.compare([1],0,1,[],0,0), 1);
      assert.equal(util.compare([2,3],0,2,[1],0,1), 1);
      assert.equal(util.compare([4,5,6,7,8,9,1],0,7,[0,1,2,3],0,4), 1);
      assert.equal(util.compare([4,5,6,7,8,9,1],2,7,[0,1,2,3],1,4), 1);
      assert.equal(util.compare([4,5,6,7,8,9,1],2,6,[0,1,2,3],1,3), 1);
    });

    it('should return -1 when A.length === B.length and A < B', function(){
      assert.equal(util.compare([1,2,2],0,3,[1,2,3],0,3), -1);
      assert.equal(util.compare([0,1,1,3,4,5,6,7,8,9],0,10,[0,1,2,3,4,5,6,7,8,9],0,10), -1);
      assert.equal(util.compare([0,1,2,2,4,5,6,7,8,9],3,8,[3,4,5,6,7],0,5), -1);
      assert.equal(util.compare([2,4,5,6,7],0,5,[0,1,2,3,4,5,6,7,8,9],3,8), -1);
      assert.equal(util.compare([0,0,2,3,4,5,6,7,8,9],1,5,[0,0,0,1,2,3,4,9],3,7), -1);
    });

    it('should return 1 when A.length === B.length and A > B', function(){
      assert.equal(util.compare([1,2,3],0,3,[1,2,2],0,3), 1);
      assert.equal(util.compare([0,1,2,3,4,5,6,7,8,9],0,10,[0,1,1,3,4,5,6,7,8,9],0,10), 1);
      assert.equal(util.compare([0,1,2,3,4,5,6,7,8,9],3,8,[2,4,5,6,7],0,5), 1);
      assert.equal(util.compare([3,4,5,6,7],0,5,[0,1,2,2,4,5,6,7,8,9],3,8), 1);
      assert.equal(util.compare([0,1,2,3,4,5,6,7,8,9],1,5,[0,0,0,0,2,3,4,9],3,7), 1);
    });

    it('should return 0 when A == B', function(){
      assert.equal(util.compare([],0,0,[],0,0), 0);
      assert.equal(util.compare([1,2,3],0,3,[1,2,3],0,3), 0);
      assert.equal(util.compare([0,1,2,3,4,5,6,7,8,9],0,10,[0,1,2,3,4,5,6,7,8,9],0,10), 0);
      assert.equal(util.compare([0,1,2,3,4,5,6,7,8,9],3,8,[3,4,5,6,7],0,5), 0);
      assert.equal(util.compare([3,4,5,6,7],0,5,[0,1,2,3,4,5,6,7,8,9],3,8), 0);
      assert.equal(util.compare([0,1,2,3,4,5,6,7,8,9],1,5,[0,0,0,1,2,3,4,9],3,7), 0);
    });
  });

  describe('isEven', function(){
    it('should return true if zero', function(){
      assert.equal(util.isEven([],0,0,10), true);
      assert.equal(util.isEven([],0,0,15), true);
    });
    it('should return false if odd in even base', function(){
      assert.equal(util.isEven([1],0,1,2), false);
      assert.equal(util.isEven([0,0,3,0],2,3,8), false);
      assert.equal(util.isEven([1,2,3,4],0,4,16), false);
    });
    it('should return false if odd in odd base', function(){
      assert.equal(util.isEven([1],0,1,3), false);
      assert.equal(util.isEven([0,0,3,0],2,3,7), false);
      assert.equal(util.isEven([1,2,3,5],0,4,15), false);
    });
    it('should return true if even in even base', function(){
      assert.equal(util.isEven([2],0,1,2), true);
      assert.equal(util.isEven([0,0,4,0],2,3,8), true);
      assert.equal(util.isEven([4,3,2,1],0,4,16), true);
    });
    it('should return true if even in odd base', function(){
      assert.equal(util.isEven([2],0,1,3), true);
      assert.equal(util.isEven([0,4,6,0],1,3,7), true);
      assert.equal(util.isEven([4,3,2,1],0,4,15), true);
    });
  });

  describe('max', function(){
    it('should return the largest number', function(){
      assert.equal(util.max(0,0), 0);
      assert.equal(util.max(0,1), 1);
      assert.equal(util.max(2,0), 2);
      assert.equal(util.max(-3, 1), 1);
      assert.equal(util.max(4, -5), 4);
      assert.equal(util.max(-10, -5), -5);
    });
  });

  describe('min', function(){
    it('should return the lowest number', function(){
      assert.equal(util.min(0,0), 0);
      assert.equal(util.min(0,1), 0);
      assert.equal(util.min(2,0), 0);
      assert.equal(util.min(-3, 1), -3);
      assert.equal(util.min(4, -5), -5);
      assert.equal(util.min(-10, -5), -10);
    });
  });

  describe('strToDigits', function(){
    it('should throw error if string is empty or just spaces', function(){
      expect(() => util.strToDigits("")).to.throw(TypeError);
      expect(() => util.strToDigits("   ")).to.throw(TypeError);
    });

    it('should throw error if string value is not a number', function(){
      expect(function(){util.strToDigits("ABC")}).to.throw(TypeError);
      expect(() => util.strToDigits("-+123")).to.throw(TypeError);
      expect(() => util.strToDigits("123m456")).to.throw(TypeError);
      expect(() => util.strToDigits("1.2.3.4")).to.throw(TypeError);
    });

    it('should return 0 if string is just zeros', function(){
      assert.deepEqual(util.strToDigits("0"), [[], false]);
      assert.deepEqual(util.strToDigits("-0"), [[], false]);
      assert.deepEqual(util.strToDigits("+0"), [[], false]);
      assert.deepEqual(util.strToDigits("000"), [[], false]);
    });

    it('should return correct integer value in base 10', function(){
      assert.deepEqual(util.strToDigits("1"), [[1], false]);
      assert.deepEqual(util.strToDigits("-1"), [[1], true]);
      assert.deepEqual(util.strToDigits("+1"), [[1], false]);

      assert.deepEqual(util.strToDigits("1234"), [[4,3,2,1], false]);
      assert.deepEqual(util.strToDigits("+1234"), [[4,3,2,1], false]);
      assert.deepEqual(util.strToDigits("-5678"), [[8,7,6,5], true]);

      assert.deepEqual(util.strToDigits("0001234"), [[4,3,2,1], false]);
      assert.deepEqual(util.strToDigits("+0001234"), [[4,3,2,1], false]);
      assert.deepEqual(util.strToDigits("-005678"), [[8,7,6,5], true]);

      assert.deepEqual(util.strToDigits("12.34"), [[2,1], false]);
      assert.deepEqual(util.strToDigits("+12.34"), [[2,1], false]);
      assert.deepEqual(util.strToDigits("-5.678"), [[5], true]);
    });
  });
});
