import {assert, expect} from 'chai';
import {Integer} from '../../src/integer';
import {toInteger} from '../../src/util/intUtils';
import {shiftRight} from '../../src/functional/shiftRight';

describe('shiftRight', () => {

  it('should shift right by 0', () => {
    const A: Integer = toInteger([1,2], 2, false, 125);
    const shifts: Integer = toInteger([], 0, false, 10);
    const expected: Integer = toInteger([1,2], 2, false, 125);
    const actual: Integer = shiftRight(A, shifts);
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
    assert.notEqual(actual.digits, expected.digits);
  });

  it('should shift 0 right', () => {
    const A: Integer = toInteger([], 0, false, 125);
    const shifts: Integer = toInteger([24185370, 45], 2, false, 94906265);
    const expected: Integer = toInteger([], 0, false, 125);
    const actual: Integer = shiftRight(A, shifts);
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
    assert.notEqual(actual.digits, expected.digits);
  });

  it('should shift right by 1', () => {
    const A: Integer = toInteger([1,2], 2, false, 125);
    const shifts: Integer = toInteger([1], 1, false, 10);
    const expected: Integer = toInteger([2], 1, false, 125);
    const actual: Integer = shiftRight(A, shifts);
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
    assert.notEqual(actual.digits, expected.digits);
  });

  it('should shift right by 5', () => {
    const A: Integer = toInteger([0,0,0,0,0,1,2], 7, false, 125);
    const shifts: Integer = toInteger([1,0,1], 3, false, 2);
    const expected: Integer = toInteger([1,2], 2, false, 125);
    const actual: Integer = shiftRight(A, shifts);
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
    assert.notEqual(actual.digits, expected.digits);
  });

  it('should throw error if shifting right by negative amount', () => {
    const A: Integer = toInteger([1,2], 2, false, 125);
    const shifts: Integer = toInteger([1], 1, true, 10);
    expect(() => shiftRight(A, shifts)).to.throw(EvalError);
  });

  it('should be 0 if shifting right by magnitude of number', () => {
    const A: Integer = toInteger([3,2,1], 3, false, 11);
    const shifts: Integer = toInteger([1,1], 2, false, 2);
    const expected: Integer = toInteger([], 0, false, 11);
    const actual: Integer = shiftRight(A, shifts);
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
    assert.notEqual(actual.digits, expected.digits);
  });

  it('should be 0 if shifting right by too large an amount', () => {
    const A: Integer = toInteger([1], 1, false, 11);
    const shifts: Integer = toInteger([24185370, 45], 2, false, 94906265);
    const expected: Integer = toInteger([], 0, false, 11);
    const actual: Integer = shiftRight(A, shifts);
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
    assert.notEqual(actual.digits, expected.digits);
  });
});
