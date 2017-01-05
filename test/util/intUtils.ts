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

  describe('setOne', function(){
    it('should set zero to one', () => {
      const input: Integer = toInteger([], 0, false, 10);
      const expected: Integer = toInteger([1], 1, false, 10);
      const actual: Integer = util.setOne(input);
      assert.equal(actual, input);
      assert.deepEqual(actual, expected);
    });

    it('should set X to one', () => {
      const input: Integer = toInteger([1,2,3,4,5], 5, true, 373);
      const expected: Integer = toInteger([1], 1, false, 373);
      const actual: Integer = util.setOne(input);
      assert.equal(actual, input);
      assert.deepEqual(actual, expected);
    });
  });

  describe('setZero', function(){
    it('should set one to zero', () => {
      const input: Integer = toInteger([1], 1, false, 125);
      const expected: Integer = toInteger([], 0, false, 125);
      const actual: Integer = util.setZero(input);
      assert.equal(actual, input);
      assert.deepEqual(actual, expected);
    });

    it('should set X to zero', () => {
      const input: Integer = toInteger([1,2,3,4,5], 5, true, 125);
      const expected: Integer = toInteger([], 0, false, 125);
      const actual: Integer = util.setZero(input);
      assert.equal(actual, input);
      assert.deepEqual(actual, expected);
    });
  });

  describe('assign', function(){
    it('should assign source property values to target', () => {
      const source: Integer = toInteger([1,2,3,4,5], 5, true, 125);
      const target: Integer = toInteger([6,7,8], 3, false, 10);
      const actual: Integer = util.assign(target, source);
      assert.equal(actual, target);
      assert.deepEqual(actual, source);
      assert.equal(actual.digits, source.digits);
    });
  });

  describe('copy', function(){
    it('should copy source property values with target', () => {
      const source: Integer = toInteger([1,2,3,4,5], 5, true, 125);
      const target: Integer = toInteger([6,7,8], 3, false, 10);
      const actual: Integer = util.copy(target, source);
      assert.equal(actual, target);
      assert.deepEqual(actual, source);
      assert.notEqual(actual.digits, source.digits);
    });
  });
});
