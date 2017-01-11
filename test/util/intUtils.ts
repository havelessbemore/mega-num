import {assert} from 'chai';
import {Integer} from '../../src/integer';
import * as util from '../../src/util/intUtils';

function toInteger(digits: number[], precision: number, isNegative: boolean, base: number): Integer {
  return {
    base: base,
    digits: digits,
    precision: precision,
    isNegative: isNegative
  };
}

describe('intUtils', function(){

  describe('assign', function(){
    it('should assign source property values to target', function(){
      const source: Integer = toInteger([1,2,3,4,5], 5, true, 125);
      const target: Integer = toInteger([6,7,8], 3, false, 10);
      const actual: Integer = util.assign(target, source);
      assert.equal(actual, target);
      assert.deepEqual(actual, source);
      assert.equal(actual.digits, source.digits);
    });
  });

  describe('copy', function(){
    const source: Integer = toInteger([1,2,3,4,5], 5, true, 125);
    const target: Integer = toInteger([6,7,8], 3, false, 10);
    const actual: Integer = util.copy(target, source);
    assert.equal(actual, target);
    assert.deepEqual(actual, source);
    assert.notEqual(actual.digits, source.digits);
  });

  describe('setOne', function(){
    it('should set zero to one', function(){
      const input: Integer = toInteger([], 0, false, 10);
      const expected: Integer = toInteger([1], 1, false, 10);
      const actual: Integer = util.setOne(input);
      assert.equal(actual, input);
      assert.deepEqual(actual, expected);
    });

    it('should set X to one', function(){
      const input: Integer = toInteger([1,2,3,4,5], 5, true, 373);
      const expected: Integer = toInteger([1], 1, false, 373);
      const actual: Integer = util.setOne(input);
      assert.equal(actual, input);
      assert.deepEqual(actual, expected);
    });
  });

  describe('setZero', function(){
    it('should set one to zero', function(){
      const input: Integer = toInteger([1], 1, false, 125);
      const expected: Integer = toInteger([], 0, false, 125);
      const actual: Integer = util.setZero(input);
      assert.equal(actual, input);
      assert.deepEqual(actual, expected);
    });

    it('should set X to zero', function(){
      const input: Integer = toInteger([1,2,3,4,5], 5, true, 125);
      const expected: Integer = toInteger([], 0, false, 125);
      const actual: Integer = util.setZero(input);
      assert.equal(actual, input);
      assert.deepEqual(actual, expected);
    });
  });

  describe('tryMutable', function(){
    it('should return input if mutable', function(){
      const A: Integer = toInteger([1,2,3,4,5], 5, true, 123);
      const B: Integer = util.tryMutable(A, true);
      assert.equal(A, B);
      assert.deepEqual(A, B);
      assert.equal(A.digits, B.digits);
    })

    it('should return copy of input if immutable', function(){
      const A: Integer = toInteger([1,2,3,4,5], 5, true, 123);
      const B: Integer = util.tryMutable(A, false);
      assert.notEqual(A, B);
      assert.deepEqual(A, B);
      assert.notEqual(A.digits, B.digits);
    })
  })
});
