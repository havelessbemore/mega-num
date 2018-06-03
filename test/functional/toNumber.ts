import {assert, expect} from 'chai';
import {Integer} from '../../src/integer';
import {toInteger} from '../../src/util/intUtils';
import {toNumber} from '../../src/functional/toNumber';

describe('toNumber', () => {

  it('should convert 0', () => {
    const A = toInteger([], 0, false, 125);
    const expected = 0;
    const actual = toNumber(A);
    assert.equal(actual, expected);
  });

  it('should convert 1', () => {
    const A = toInteger([1], 1, false, 125);
    const expected = 1;
    const actual = toNumber(A);
    assert.equal(actual, expected);
  });

  it('should convert -1', () => {
    const A = toInteger([1], 1, true, 125);
    const expected = -1;
    const actual = toNumber(A);
    assert.equal(actual, expected);
  });

  it('should convert 11 in base 2', () => {
    const A = toInteger([1,1,0,1], 4, false, 2);
    const expected = 11;
    const actual = toNumber(A);
    assert.equal(actual, expected);
  });

  it('should convert -11 in base 2', () => {
    const A = toInteger([1,1,0,1], 4, true, 2);
    const expected = -11;
    const actual = toNumber(A);
    assert.equal(actual, expected);
  });

  it('should convert 11 in base 3', () => {
    const A = toInteger([2,0,1], 3, false, 3);
    const expected = 11;
    const actual = toNumber(A);
    assert.equal(actual, expected);
  });

  it('should convert 11 in base 5', () => {
    const A: Integer = toInteger([1,2], 2, false, 5);
    const expected = 11;
    const actual = toNumber(A);
    assert.equal(actual, expected);
  });

  it('should convert 11 in base 7', () => {
    const A: Integer = toInteger([4,1], 2, false, 7);
    const expected = 11;
    const actual = toNumber(A);
    assert.equal(actual, expected);
  });

  it('should convert 11 in base 11', () => {
    const A: Integer = toInteger([0,1], 2, false, 11);
    const expected = 11;
    const actual = toNumber(A);
    assert.equal(actual, expected);
  });

  it('should convert 11 in base 13', () => {
    const A: Integer = toInteger([11], 1, false, 13);
    const expected = 11;
    const actual = toNumber(A);
    assert.equal(actual, expected);
  });

  it('should convert 9007199254740991 in base 1021', () => {
    const A: Integer = toInteger([922, 178, 121, 722, 120, 8], 6, false, 1021);
    const expected = 9007199254740991;
    const actual = toNumber(A);
    assert.equal(actual, expected);
  });

  it('should convert -9007199254740991 in base 29', () => {
    const A = toInteger([10,18,17,28,7,13,6,15,25,11,21], 11, true, 29);
    const expected = -9007199254740991;
    const actual = toNumber(A);
    assert.equal(actual, expected);
  });

  it('should throw error if Integer too large to convert to number', () => {
    let A = toInteger([923, 178, 121, 722, 120, 8], 6, false, 1021);
    expect(() => toNumber(A)).to.throw(RangeError);
    A = toInteger([11,18,17,28,7,13,6,15,25,11,21], 11, true, 29);
    expect(() => toNumber(A)).to.throw(RangeError);
  });
});
