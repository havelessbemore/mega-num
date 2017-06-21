import {assert, expect} from 'chai';
import {Globals} from '../../src/globals';
import {Integer} from '../../src/integer';
import {toInteger as _toInteger} from '../../src/util/intUtils';
import {toInteger} from '../../src/functional/toInteger';

describe('toInteger', function(){

  it('should convert 0 to Integer in base 10', function(){
    const expected: Integer = _toInteger([], 0, false, 10);
    const actual: Integer = toInteger(0, 10);
    assert.deepEqual(expected, actual);
  });

  it('should convert 1 to Integer in base 10', function(){
    const expected: Integer = _toInteger([1], 1, false, 10);
    const actual: Integer = toInteger(1, 10);
    assert.deepEqual(expected, actual);
  });

  it('should convert 1234567 to Integer in base 10', function(){
    const expected: Integer = _toInteger([7,6,5,4,3,2,1], 7, false, 10);
    const actual: Integer = toInteger(1234567, 10);
    assert.deepEqual(expected, actual);
  });

  it('should convert -1 to Integer in base 10', function(){
    const expected: Integer = _toInteger([1], 1, true, 10);
    const actual: Integer = toInteger(-1, 10);
    assert.deepEqual(expected, actual);
  });

  it('should convert -1234567 to Integer in base 10', function(){
    const expected: Integer = _toInteger([7,6,5,4,3,2,1], 7, true, 10);
    const actual: Integer = toInteger(-1234567, 10);
    assert.deepEqual(expected, actual);
  });

  it('should convert "0" to Integer in base 10', function(){
    const expected: Integer = _toInteger([], 0, false, 10);
    const actual: Integer = toInteger('0', 10);
    assert.deepEqual(expected, actual);
  });

  it('should convert "1" to Integer in base 10', function(){
    const expected: Integer = _toInteger([1], 1, false, 10);
    const actual: Integer = toInteger('1', 10);
    assert.deepEqual(expected, actual);
  });

  it('should convert "1234567" to Integer in base 10', function(){
    const expected: Integer = _toInteger([7,6,5,4,3,2,1], 7, false, 10);
    const actual: Integer = toInteger('1234567', 10);
    assert.deepEqual(expected, actual);
  });

  it('should convert "-1" to Integer in base 10', function(){
    const expected: Integer = _toInteger([1], 1, true, 10);
    const actual: Integer = toInteger('-1', 10);
    assert.deepEqual(expected, actual);
  });

  it('should convert "-1234567" to Integer in base 10', function(){
    const expected: Integer = _toInteger([7,6,5,4,3,2,1], 7, true, 10);
    const actual: Integer = toInteger('-1234567', 10);
    assert.deepEqual(expected, actual);
  });

  it('should convert "-123" to Integer in default base', function(){
    const expected: Integer = _toInteger([123], 1, true, Globals.BASE);
    const actual: Integer = toInteger('-123');
    assert.deepEqual(expected, actual);
  });

  it('should throw error if not convertible to Integer', function(){
    expect(function(){toInteger(<any>[])}).to.throw(TypeError);
    expect(function(){toInteger(<any>{})}).to.throw(TypeError);
    expect(function(){toInteger(<any>function(){})}).to.throw(TypeError);
    expect(function(){toInteger(<any>null)}).to.throw(TypeError);
    expect(function(){toInteger(<any>undefined)}).to.throw(TypeError);
    expect(function(){toInteger(<any>Infinity)}).to.throw(TypeError);
    expect(function(){toInteger(<any>-Infinity)}).to.throw(TypeError);
  });

  it('should return input if Integer', function(){
    const A: Integer = _toInteger([3,2,1], 3, false, 10);
    const expected: Integer = _toInteger([3,2,1], 3, false, 10);
    const actual: Integer = toInteger(A);
    assert.equal(A, actual);
    assert.deepEqual(expected, actual);
  });
});
