import {assert, expect} from 'chai';
import {Integer} from '../../src/integer';
import {divideAndRemainder} from '../../src/functional/divideAndRemainder';
import {toInteger} from '../../src/util/intUtils';

describe('divideAndRemainder', function(){

  it('should throw error if A / 0', function(){
    const A: Integer = toInteger([1], 1, false, 10);
    const B: Integer = toInteger([], 0, false, 10);
    expect(function(){divideAndRemainder(A,B,true)}).to.throw(EvalError);
  });

  it('should return 1 if A === B', function(){
    const A: Integer = toInteger([3,2,1], 3, false, 10);
    const expectedQ: Integer = toInteger([1], 1, false, 10);
    const expectedR: Integer = toInteger([], 0, false, 10);
    const [Q, R]: [Integer, Integer] = divideAndRemainder(A,A,true);
    assert.equal(A, Q);
    assert.deepEqual(Q, expectedQ);
    assert.deepEqual(R, expectedR);
  });

  it('should return 0 if 0 / B', function(){
    const A: Integer = toInteger([], 0, false, 10);
    const B: Integer = toInteger([3,2,1], 3, false, 10);
    const expectedQ: Integer = toInteger([], 0, false, 10);
    const expectedR: Integer = toInteger([], 0, false, 10);
    const [Q, R]: [Integer, Integer] = divideAndRemainder(A,B,true);
    assert.equal(A, Q);
    assert.deepEqual(Q, expectedQ);
    assert.deepEqual(R, expectedR);
  });

  it('should return A if A / 1', function(){
    const A: Integer = toInteger([3,2,1], 3, false, 10);
    const B: Integer = toInteger([1], 1, false, 10);
    const expectedQ: Integer = toInteger([3,2,1], 3, false, 10);
    const expectedR: Integer = toInteger([], 0, false, 10);
    const [Q, R]: [Integer, Integer] = divideAndRemainder(A,B,true);
    assert.equal(A, Q);
    assert.deepEqual(Q, expectedQ);
    assert.deepEqual(R, expectedR);
  });

  it('should return 0 if 1 / B (and B > 1)', function(){
    const A: Integer = toInteger([1], 1, false, 10);
    const B: Integer = toInteger([2], 1, false, 10);
    const expectedQ: Integer = toInteger([], 0, false, 10);
    const expectedR: Integer = toInteger([1], 1, false, 10);
    const [Q, R]: [Integer, Integer] = divideAndRemainder(A,B,true);
    assert.equal(A, Q);
    assert.deepEqual(Q, expectedQ);
    assert.deepEqual(R, expectedR);
  });

  it('should return 0RA if A.length < B.length', function(){
    const A: Integer = toInteger([3,2,1], 3, false, 10);
    const B: Integer = toInteger([4,3,2,1], 4, false, 10);
    const expectedQ: Integer = toInteger([], 0, false, 10);
    const expectedR: Integer = toInteger([3,2,1], 3, false, 10);
    const [Q, R]: [Integer, Integer] = divideAndRemainder(A,B,true);
    assert.equal(A, Q);
    assert.deepEqual(Q, expectedQ);
    assert.deepEqual(R, expectedR);
  });

  it('should return 0RA if A.length < B.length', function(){
    const A: Integer = toInteger([3,2,1], 3, false, 10);
    const B: Integer = toInteger([4,3,2,1], 4, false, 10);
    const expectedQ: Integer = toInteger([], 0, false, 10);
    const expectedR: Integer = toInteger([3,2,1], 3, false, 10);
    const [Q, R]: [Integer, Integer] = divideAndRemainder(A,B,true);
    assert.equal(A, Q);
    assert.deepEqual(Q, expectedQ);
    assert.deepEqual(R, expectedR);
  });

  it('should return 0RA when A.length < B.length without normalizing bases', function(){
    const A: Integer = toInteger([0,1], 2, false, 10);
    const B: Integer = toInteger([0,1], 2, false, 100);
    const expectedQ: Integer = toInteger([], 0, false, 10);
    const expectedR: Integer = toInteger([0,1], 2, false, 10);
    const [Q, R]: [Integer, Integer] = divideAndRemainder(A,B,true);
    assert.equal(A, Q);
    assert.deepEqual(Q, expectedQ);
    assert.deepEqual(R, expectedR);
  });

  it('should return 1R0 when A.length < B.length without normalizing bases', function(){
    const A: Integer = toInteger([0,0,1], 3, false, 10);
    const B: Integer = toInteger([0,1], 2, false, 100);
    const expectedQ: Integer = toInteger([1], 1, false, 10);
    const expectedR: Integer = toInteger([], 0, false, 10);
    const [Q, R]: [Integer, Integer] = divideAndRemainder(A,B,true);
    assert.equal(A, Q);
    Q.digits.length = Q.precision;
    R.digits.length = R.precision;
    assert.deepEqual(Q, expectedQ);
    assert.deepEqual(R, expectedR);
  });







  it('should return 61R1 for 123/2', function(){
    const A: Integer = toInteger([3,2,1], 3, false, 10);
    const B: Integer = toInteger([2], 1, false, 10);
    const expectedQ: Integer = toInteger([1,6], 2, false, 10);
    const expectedR: Integer = toInteger([1], 1, false, 10);
    const [Q, R]: [Integer, Integer] = divideAndRemainder(A,B,true);
    assert.equal(A, Q);
    A.digits.length = A.precision;
    assert.deepEqual(Q, expectedQ);
    assert.deepEqual(R, expectedR);
  });

  it('should return 60R1 for 122/2', function(){
    const A: Integer = toInteger([2,2,1], 3, false, 10);
    const B: Integer = toInteger([2], 1, false, 10);
    const expectedQ: Integer = toInteger([1,6], 2, false, 10);
    const expectedR: Integer = toInteger([], 0, false, 10);
    const [Q, R]: [Integer, Integer] = divideAndRemainder(A,B,true);
    assert.equal(A, Q);
    A.digits.length = A.precision;
    assert.deepEqual(Q, expectedQ);
    assert.deepEqual(R, expectedR);
  });

  it('should return 1R0 for 10/10', function(){
    const A: Integer = toInteger([0,1], 2, false, 10);
    const B: Integer = toInteger([0,1], 2, false, 10);
    const expectedQ: Integer = toInteger([1], 1, false, 10);
    const expectedR: Integer = toInteger([], 0, false, 10);
    const [Q, R]: [Integer, Integer] = divideAndRemainder(A,B,true);
    assert.equal(A, Q);
    Q.digits.length = Q.precision;
    R.digits.length = R.precision;
    assert.deepEqual(Q, expectedQ);
    assert.deepEqual(R, expectedR);
  });

  it('should return 1R0 for 99/99', function(){
    const A: Integer = toInteger([9,9], 2, false, 10);
    const B: Integer = toInteger([9,9], 2, false, 10);
    const expectedQ: Integer = toInteger([1], 1, false, 10);
    const expectedR: Integer = toInteger([], 0, false, 10);
    const [Q, R]: [Integer, Integer] = divideAndRemainder(A,B,true);
    assert.equal(A, Q);
    Q.digits.length = Q.precision;
    R.digits.length = R.precision;
    assert.deepEqual(Q, expectedQ);
    assert.deepEqual(R, expectedR);
  });

  it('should return 10R0 for 100/10', function(){
    const A: Integer = toInteger([0,0,1], 3, false, 10);
    const B: Integer = toInteger([0,1], 2, false, 10);
    const expectedQ: Integer = toInteger([0,1], 2, false, 10);
    const expectedR: Integer = toInteger([], 0, false, 10);
    const [Q, R]: [Integer, Integer] = divideAndRemainder(A,B,true);
    assert.equal(A, Q);
    Q.digits.length = Q.precision;
    R.digits.length = R.precision;
    assert.deepEqual(Q, expectedQ);
    assert.deepEqual(R, expectedR);
  });

  it('should return 99R9 for 999/11', function(){
    const A: Integer = toInteger([9,9,9], 3, false, 10);
    const B: Integer = toInteger([1,1], 2, false, 10);
    const expectedQ: Integer = toInteger([0,9], 2, false, 10);
    const expectedR: Integer = toInteger([9], 1, false, 10);
    const [Q, R]: [Integer, Integer] = divideAndRemainder(A,B,true);
    assert.equal(A, Q);
    Q.digits.length = Q.precision;
    R.digits.length = R.precision;
    assert.deepEqual(Q, expectedQ);
    assert.deepEqual(R, expectedR);
  });

  it('should return 999,999,999 / 123 in base 10', function(){
    const A: Integer = toInteger([9,9,9,9,9,9,9,9,9], 9, false, 10);
    const B: Integer = toInteger([3,2,1], 3, false, 10);
    const expectedQ: Integer = toInteger([1,8,0,0,3,1,8], 7, false, 10);
    const expectedR: Integer = toInteger([6,3], 2, false, 10);
    const [Q, R]: [Integer, Integer] = divideAndRemainder(A,B,true);
    assert.equal(A, Q);
    Q.digits.length = Q.precision;
    R.digits.length = R.precision;
    assert.deepEqual(Q, expectedQ);
    assert.deepEqual(R, expectedR);
  });

  it('should return 999,999,999 / 321 in base 10', function(){
    const A: Integer = toInteger([9,9,9,9,9,9,9,9,9], 9, false, 10);
    const B: Integer = toInteger([1,2,3], 3, false, 10);
    const expectedQ: Integer = toInteger([4,6,2,5,1,1,3], 7, false, 10);
    const expectedR: Integer = toInteger([5,5,2], 3, false, 10);
    const [Q, R]: [Integer, Integer] = divideAndRemainder(A,B,true);
    assert.equal(A, Q);
    Q.digits.length = Q.precision;
    R.digits.length = R.precision;
    assert.deepEqual(Q, expectedQ);
    assert.deepEqual(R, expectedR);
  });

  it('should return 961,748,941 / 15,485,863 in base 2', function(){
    const A: Integer = toInteger([1,0,1,1,0,0,1,1,1,1,1,1,1,0,0,0,1,1,0,0,1,0,1,0,1,0,0,1,1,1], 30, false, 2);
    const B: Integer = toInteger([1,1,1,0,0,1,0,1,1,1,0,1,0,0,1,0,0,0,1,1,0,1,1,1], 24, false, 2);
    const expectedQ: Integer = toInteger([0,1,1,1,1,1], 6, false, 2);
    const expectedR: Integer = toInteger([1,1,0,1,1,0,1,0,1,0,1,1,0,0,1,1,0,0,0,1,1], 21, false, 2);
    const [Q, R]: [Integer, Integer] = divideAndRemainder(A,B,true);
    assert.equal(A, Q);
    Q.digits.length = Q.precision;
    R.digits.length = R.precision;
    assert.deepEqual(Q, expectedQ);
    assert.deepEqual(R, expectedR);
  });

  it('should return 961,748,941 / 15,485,863 in base 3', function(){
    const A: Integer = toInteger([1,1,0,2,1,1,0,2,2,0,0,2,0,0,0,1,1,1,2], 19, false, 3);
    const B: Integer = toInteger([1,1,1,1,2,1,2,0,2,0,1,0,2,0,0,1], 16, false, 3);
    const expectedQ: Integer = toInteger([2,2,0,2], 4, false, 3);
    const expectedR: Integer = toInteger([2,2,0,0,0,2,0,2,1,1,0,0,0,1], 14, false, 3);
    const [Q, R]: [Integer, Integer] = divideAndRemainder(A,B,true);
    assert.equal(A, Q);
    Q.digits.length = Q.precision;
    R.digits.length = R.precision;
    assert.deepEqual(Q, expectedQ);
    assert.deepEqual(R, expectedR);
  });

  it('should return 961,748,941 / 15,485,863 in base 7', function(){
    const A: Integer = toInteger([6,2,5,5,0,5,5,5,5,2,3], 11, false, 7);
    const B: Integer = toInteger([1,0,2,5,2,4,5,4,2], 9, false, 7);
    const expectedQ: Integer = toInteger([6,1,1], 3, false, 7);
    const expectedR: Integer = toInteger([0,1,6,6,4,5,6,1], 8, false, 7);
    const [Q, R]: [Integer, Integer] = divideAndRemainder(A,B,true);
    assert.equal(A, Q);
    Q.digits.length = Q.precision;
    R.digits.length = R.precision;
    assert.deepEqual(Q, expectedQ);
    assert.deepEqual(R, expectedR);
  });

  it('should return 1,214,015,305,151,164,506,623,822,532,690 / 123,000,456,000,789 in base 10', function(){
    const A: Integer = toInteger([0,9,6,2,3,5,2,2,8,3,2,6,6,0,5,4,6,1,1,5,1,5,0,3,5,1,0,4,1,2,1], 31, false, 10);
    const B: Integer = toInteger([9,8,7,0,0,0,6,5,4,0,0,0,3,2,1], 15, false, 10);
    const expectedQ: Integer = toInteger([0,1,2,3,0,0,0,4,5,6,0,0,0,7,8,9], 16, false, 10);
    const expectedR: Integer = toInteger([], 0, false, 10);
    const [Q, R]: [Integer, Integer] = divideAndRemainder(A,B,true);
    assert.equal(A, Q);
    Q.digits.length = Q.precision;
    R.digits.length = R.precision;
    assert.deepEqual(Q, expectedQ);
    assert.deepEqual(R, expectedR);
  });

  it('should return 961,748,941 / 15,485,863 in base 10', function(){
    const A: Integer = toInteger([1,4,9,8,4,7,1,6,9], 9, false, 10);
    const B: Integer = toInteger([3,6,8,5,8,4,5,1], 8, false, 10);
    const expectedQ: Integer = toInteger([2,6], 2, false, 10);
    const expectedR: Integer = toInteger([5,3,4,5,2,6,1], 7, false, 10);
    const [Q, R]: [Integer, Integer] = divideAndRemainder(A,B,true);
    assert.equal(A, Q);
    Q.digits.length = Q.precision;
    R.digits.length = R.precision;
    assert.deepEqual(Q, expectedQ);
    assert.deepEqual(R, expectedR);
  });

  it('should return 721,948,327 / 84,461 in base 10', function(){
    const A: Integer = toInteger([7,2,3,8,4,9,1,2,7], 9, false, 10);
    const B: Integer = toInteger([1,6,4,4,8], 5, false, 10);
    const expectedQ: Integer = toInteger([7,4,5,8], 4, false, 10);
    const expectedR: Integer = toInteger([0,6,1,0,6], 5, false, 10);
    const [Q, R]: [Integer, Integer] = divideAndRemainder(A,B,true);
    assert.equal(A, Q);
    Q.digits.length = Q.precision;
    R.digits.length = R.precision;
    assert.deepEqual(Q, expectedQ);
    assert.deepEqual(R, expectedR);
  });

});
