import {assert, expect} from 'chai';
import * as util from '../../src/util/numUtils';

describe('numUtils', function(){

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

  describe('zero', function(){
    it('should set indices [min, max) of an array to zero', function(){
      let actual: number[] = [9,9,9,9,9,9,9,9,9];
      util.zero(actual, 2, 4);
      assert.deepEqual(actual, [9,9,0,0,9,9,9,9,9]);
      actual = [9,9,9,9,9,9,9,9,9];
      util.zero(actual, 0, 5);
      assert.deepEqual(actual, [0,0,0,0,0,9,9,9,9]);
      actual = [9,9,9,9,9,9,9,9,9];
      util.zero(actual, 8, 9);
      assert.deepEqual(actual, [9,9,9,9,9,9,9,9,0]);
      actual = [9,9,9,9,9,9,9,9,9];
      util.zero(actual, 0, 10);
      assert.deepEqual(actual, [0,0,0,0,0,0,0,0,0,0]);
    });
  });
});
