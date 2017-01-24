import {assert} from 'chai';
import {Integer} from '../../src/integer';
import {compare} from '../../src/functional/compare';
import {toInteger} from '../../src/util/intUtils';

describe('compare', function(){

  it('should return 0 when A === B', function(){
    const A: Integer = toInteger([3,2,1], 3, false, 10);
    assert.equal(compare(A, A), 0);
  });

  it('should return -1 if -A and +B', function(){
    const A: Integer = toInteger([1], 1, true, 10);
    const B: Integer = toInteger([1], 1, false, 10);
    assert.equal(compare(A, B), -1);
  });

  it('should return 1 if +A and -B', function(){
    const A: Integer = toInteger([1], 1, false, 10);
    const B: Integer = toInteger([1], 1, true, 10);
    assert.equal(compare(A, B), 1);
  });

  it('should return -1 if A < B if converted to same base', function(){
    const A: Integer = toInteger([0,0,0,1], 4, false, 10);
    const B: Integer = toInteger([0,0,1], 3, false, 100);
    assert.equal(compare(A, B), -1);
  });

  it('should return 1 if A > B if converted to same base', function(){
    const A: Integer = toInteger([0,0,0,1], 4, false, 10);
    const B: Integer = toInteger([99], 1, false, 100);
    assert.equal(compare(A, B), 1);
  });

  it('should return 0 when compare(0, 0)', function(){
    const A: Integer = toInteger([], 0, false, 10);
    const B: Integer = toInteger([], 0, false, 10);
    assert.equal(compare(A, B), 0);
  });

  it('should return 0 when compare(0, 0) in different bases', function(){
    const A: Integer = toInteger([], 0, false, 2);
    const B: Integer = toInteger([], 0, false, 179);
    assert.equal(compare(A, B), 0);
  });

  it('should return -1 when compare(0, 1)', function(){
    const A: Integer = toInteger([], 0, false, 10);
    const B: Integer = toInteger([1], 1, false, 10);
    assert.equal(compare(A, B), -1);
  });

  it('should return -1 when compare(0, 1) in different bases', function(){
    const A: Integer = toInteger([], 0, false, 2);
    const B: Integer = toInteger([1], 1, false, 179);
    assert.equal(compare(A, B), -1);
  });

  it('should return -1 when compare(3210, 1987654)', function(){
    const A: Integer = toInteger([0,1,2,3], 4, false, 10);
    const B: Integer = toInteger([4,5,6,7,8,9,1], 7, false, 10);
    assert.equal(compare(A, B), -1);
  });

  it('should return 1 when compare(1, 0)', function(){
    const A: Integer = toInteger([1], 1, false, 10);
    const B: Integer = toInteger([], 0, false, 10);
    assert.equal(compare(A, B), 1);
  });

  it('should return 1 when compare(1, 0) in different bases', function(){
    const A: Integer = toInteger([1], 1, false, 2);
    const B: Integer = toInteger([], 0, false, 179);
    assert.equal(compare(A, B), 1);
  });

  it('should return 1 when compare(1987654, 3210)', function(){
    const A: Integer = toInteger([4,5,6,7,8,9,1], 7, false, 10);
    const B: Integer = toInteger([0,1,2,3], 4, false, 10);
    assert.equal(compare(A, B), 1);
  });
});
