import {assert, expect} from 'chai';
import {max, min, strToDigits, zero} from '../../src/util/numUtils';

describe('numUtils', function(){

  describe('max', function(){
    it('should return the largest number', function(){
      assert.equal(max(0,0), 0);
      assert.equal(max(0,1), 1);
      assert.equal(max(2,0), 2);
      assert.equal(max(-3, 1), 1);
      assert.equal(max(4, -5), 4);
      assert.equal(max(-10, -5), -5);
    });
  });

  describe('min', function(){
    it('should return the lowest number', function(){
      assert.equal(min(0,0), 0);
      assert.equal(min(0,1), 0);
      assert.equal(min(2,0), 0);
      assert.equal(min(-3, 1), -3);
      assert.equal(min(4, -5), -5);
      assert.equal(min(-10, -5), -10);
    });
  });

  describe('strToDigits', function(){
    it('should throw error if string is empty or just spaces', function(){
      expect(function(){strToDigits("")}).to.throw(TypeError);
      expect(function(){strToDigits("   ")}).to.throw(TypeError);
    });

    it('should throw error if string value is not a number', function(){
      expect(function(){strToDigits("ABC")}).to.throw(TypeError);
      expect(function(){strToDigits("-+123")}).to.throw(TypeError);
      expect(function(){strToDigits("123m456")}).to.throw(TypeError);
      expect(function(){strToDigits("1.2.3.4")}).to.throw(TypeError);
    });

    it('should return 0 if string is just zeros', function(){
      assert.deepEqual<[number[], boolean]>(strToDigits("0"), [[], false]);
      assert.deepEqual<[number[], boolean]>(strToDigits("-0"), [[], false]);
      assert.deepEqual<[number[], boolean]>(strToDigits("+0"), [[], false]);
      assert.deepEqual<[number[], boolean]>(strToDigits("000"), [[], false]);
    });

    it('should return correct integer value in base 10', function(){
      assert.deepEqual(strToDigits("1"), [[1], false]);
      assert.deepEqual(strToDigits("-1"), [[1], true]);
      assert.deepEqual(strToDigits("+1"), [[1], false]);

      assert.deepEqual(strToDigits("1234"), [[4,3,2,1], false]);
      assert.deepEqual(strToDigits("+1234"), [[4,3,2,1], false]);
      assert.deepEqual(strToDigits("-5678"), [[8,7,6,5], true]);

      assert.deepEqual(strToDigits("0001234"), [[4,3,2,1], false]);
      assert.deepEqual(strToDigits("+0001234"), [[4,3,2,1], false]);
      assert.deepEqual(strToDigits("-005678"), [[8,7,6,5], true]);

      assert.deepEqual(strToDigits("12.34"), [[2,1], false]);
      assert.deepEqual(strToDigits("+12.34"), [[2,1], false]);
      assert.deepEqual(strToDigits("-5.678"), [[5], true]);
    });
  });

  describe('zero', function(){
    it('should set indices [min, max) of an array to zero', function(){
      let actual: number[] = [9,9,9,9,9,9,9,9,9];
      zero(actual, 2, 4);
      assert.deepEqual(actual, [9,9,0,0,9,9,9,9,9]);
      actual = [9,9,9,9,9,9,9,9,9];
      zero(actual, 0, 5);
      assert.deepEqual(actual, [0,0,0,0,0,9,9,9,9]);
      actual = [9,9,9,9,9,9,9,9,9];
      zero(actual, 8, 9);
      assert.deepEqual(actual, [9,9,9,9,9,9,9,9,0]);
      actual = [9,9,9,9,9,9,9,9,9];
      zero(actual, 0, 10);
      assert.deepEqual(actual, [0,0,0,0,0,0,0,0,0,0]);
    });
  });
});
