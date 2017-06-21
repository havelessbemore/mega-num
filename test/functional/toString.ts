import {assert} from 'chai';
import {Globals} from '../../src/globals';
import {Integer} from '../../src/integer';
import {toString} from '../../src/functional/toString';
import {toInteger} from '../../src/util/intUtils';

describe('toString', function(){

  it('should return 0 in small base', function(){
    const A: Integer = toInteger([], 0, false, 10);
    const expected: string = '0';
    const actual: string = toString(A);
    assert.equal(expected, actual);
  });

  it('should return 0 in large base', function(){
    const A: Integer = toInteger([], 0, false, Globals.CIPHER.length + 1);
    const expected: string = Globals.CIPHER[0];
    const actual: string = toString(A);
    assert.equal(expected, actual);
  });

  it('should return 1 in small base', function(){
    const A: Integer = toInteger([1], 1, false, 10);
    const expected: string = '1';
    const actual: string = toString(A);
    assert.equal(expected, actual);
  });

  it('should return 1 in large base', function(){
    const A: Integer = toInteger([1], 1, false, Globals.CIPHER.length + 1);
    const expected: string = Globals.CIPHER[1];
    const actual: string = toString(A);
    assert.equal(expected, actual);
  });

  it('should return -1 in small base', function(){
    const A: Integer = toInteger([1], 1, true, 10);
    const expected: string = '-1';
    const actual: string = toString(A);
    assert.equal(expected, actual);
  });

  it('should return -1 in large base', function(){
    const A: Integer = toInteger([1], 1, true, Globals.CIPHER.length + 1);
    const expected: string = '-' + Globals.CIPHER[1];
    const actual: string = toString(A);
    assert.equal(expected, actual);
  });

  it('should return home in base 128', function(){
    const A: Integer = toInteger([1,0,0,127], 4, false, 128);
    const expected: string = '127:0:0:1';
    const actual: string = toString(A);
    assert.equal(expected, actual);
  });

  it('should return home in base 10', function(){
    const A: Integer = toInteger([1,0,0,7,2,1], 6, false, 10);
    const expected: string = '127001';
    const actual: string = toString(A);
    assert.equal(expected, actual);
  });

  it('should return -home in base 128', function(){
    const A: Integer = toInteger([1,0,0,127], 4, true, 128);
    const expected: string = '-127:0:0:1';
    const actual: string = toString(A);
    assert.equal(expected, actual);
  });

  it('should return -home in base 10', function(){
    const A: Integer = toInteger([1,0,0,7,2,1], 6, true, 10);
    const expected: string = '-127001';
    const actual: string = toString(A);
    assert.equal(expected, actual);
  });
});
