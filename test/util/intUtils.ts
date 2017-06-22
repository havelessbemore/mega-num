import {assert} from 'chai';
import {Globals} from '../../src/globals';
import {Integer} from '../../src/integer';
import {
  assign, copy, setOne, setZero, tryMutable
} from '../../src/util/intUtils';

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
      const actual: Integer = assign(target, source);
      assert.equal(actual, target);
      assert.deepEqual(actual, source);
      assert.equal(actual.digits, source.digits);
    });
  });

  describe('copy', function(){
    const source: Integer = toInteger([1,2,3,4,5], 5, true, 125);
    const target: Integer = toInteger([6,7,8], 3, false, 10);
    const actual: Integer = copy(target, source);
    assert.equal(actual, target);
    assert.deepEqual(actual, source);
    assert.notEqual(actual.digits, source.digits);
  });

  describe('setOne', function(){
    it('should set zero to one', function(){
      const input: Integer = toInteger([], 0, false, 10);
      const expected: Integer = toInteger([1], 1, false, 10);
      const actual: Integer = setOne(input);
      assert.equal(actual, input);
      assert.deepEqual(actual, expected);
    });

    it('should set X to one', function(){
      const input: Integer = toInteger([1,2,3,4,5], 5, true, 373);
      const expected: Integer = toInteger([1], 1, false, 373);
      const actual: Integer = setOne(input);
      assert.equal(actual, input);
      assert.deepEqual(actual, expected);
    });
  });

  describe('setZero', function(){
    it('should set one to zero', function(){
      const input: Integer = toInteger([1], 1, false, 125);
      const expected: Integer = toInteger([], 0, false, 125);
      const actual: Integer = setZero(input);
      assert.equal(actual, input);
      assert.deepEqual(actual, expected);
    });

    it('should set X to zero', function(){
      const input: Integer = toInteger([1,2,3,4,5], 5, true, 125);
      const expected: Integer = toInteger([], 0, false, 125);
      const actual: Integer = setZero(input);
      assert.equal(actual, input);
      assert.deepEqual(actual, expected);
    });
  });

  describe('toInteger', function(){
    it('should wrap integer properties into an Integer object', function(){
      const digits: number[] = [1,2,3];
      const precision: number = 3;
      const isNegative: boolean = false;
      const base: number = 10;
      const A: Integer = toInteger(digits, precision, isNegative, base);
      assert.equal(A.digits, digits);
      assert.equal(A.precision, precision);
      assert.equal(A.isNegative, isNegative);
      assert.equal(A.base, base);
    });
  });

  describe('tryMutable', function(){
    it('should return input if mutable', function(){
      const A: Integer = toInteger([1,2,3,4,5], 5, true, 123);
      const B: Integer = tryMutable(A, true);
      assert.equal(A, B);
      assert.deepEqual(A, B);
      assert.equal(A.digits, B.digits);
    });

    it('should return copy of input if immutable', function(){
      const A: Integer = toInteger([1,2,3,4,5], 5, true, 123);
      const B: Integer = tryMutable(A, false);
      assert.notEqual(A, B);
      assert.deepEqual(A, B);
      assert.notEqual(A.digits, B.digits);
    });

    it('should use global as default mutable behavior', function(){
      const A: Integer = toInteger([1,2,3,4,5], 5, true, 123);
      const B: Integer = tryMutable(A);
      if(Globals.DEFAULT_IS_MUTABLE){
        assert.equal(A, B);
        assert.deepEqual(A, B);
        assert.equal(A.digits, B.digits);
      } else {
        assert.notEqual(A, B);
        assert.deepEqual(A, B);
        assert.notEqual(A.digits, B.digits);
      }
    });
  })
});
