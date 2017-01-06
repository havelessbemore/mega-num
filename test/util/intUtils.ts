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
});
