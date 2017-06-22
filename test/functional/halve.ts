import {assert} from 'chai';
import {Integer} from '../../src/integer';
import {halve} from '../../src/functional/halve';
import {toInteger} from '../../src/util/intUtils';

describe('halve', function(){

  it('should return 0/2 in base 10', function(){
    const A: Integer = toInteger([], 0, false, 10);
    const expectedQ: Integer = toInteger([], 0, false, 10);
    const expectedR: Integer = toInteger([], 0, false, 10);

    //Run method
    const [actualQ, actualR]: [Integer, Integer] = halve(A);
    actualQ.digits.length = actualQ.precision;

    //Verify method
    assert.equal(actualQ, A);
    assert.deepEqual(actualQ, expectedQ);
    assert.deepEqual(actualR, expectedR);
  });

  it('should return 1/2 in base 10', function(){
    const A: Integer = toInteger([1], 1, false, 10);
    const expectedQ: Integer = toInteger([], 0, false, 10);
    const expectedR: Integer = toInteger([1], 1, false, 10);

    //Run method
    const [actualQ, actualR]: [Integer, Integer] = halve(A);
    actualQ.digits.length = actualQ.precision;

    //Verify method
    assert.equal(actualQ, A);
    assert.deepEqual(actualQ, expectedQ);
    assert.deepEqual(actualR, expectedR);
  });

  it('should return 2/2 in base 10', function(){
    const A: Integer = toInteger([2], 1, false, 10);
    const expectedQ: Integer = toInteger([1], 1, false, 10);
    const expectedR: Integer = toInteger([], 0, false, 10);

    //Run method
    const [actualQ, actualR]: [Integer, Integer] = halve(A);
    actualQ.digits.length = actualQ.precision;

    //Verify method
    assert.equal(actualQ, A);
    assert.deepEqual(actualQ, expectedQ);
    assert.deepEqual(actualR, expectedR);
  });

  it('should return 99/2 in base 10', function(){
    const A: Integer = toInteger([9,9], 2, false, 10);
    const expectedQ: Integer = toInteger([9,4], 2, false, 10);
    const expectedR: Integer = toInteger([1], 1, false, 10);

    //Run method
    const [actualQ, actualR]: [Integer, Integer] = halve(A);
    actualQ.digits.length = actualQ.precision;

    //Verify method
    assert.equal(actualQ, A);
    assert.deepEqual(actualQ, expectedQ);
    assert.deepEqual(actualR, expectedR);
  });

  it('should return 123/2 in base 10', function(){
    const A: Integer = toInteger([3,2,1], 3, false, 10);
    const expectedQ: Integer = toInteger([1,6], 2, false, 10);
    const expectedR: Integer = toInteger([1], 1, false, 10);

    //Run method
    const [actualQ, actualR]: [Integer, Integer] = halve(A);
    actualQ.digits.length = actualQ.precision;

    //Verify method
    assert.equal(actualQ, A);
    assert.deepEqual(actualQ, expectedQ);
    assert.deepEqual(actualR, expectedR);
  });

  it('should return 13579/2 in base 2', function(){
    const A: Integer = toInteger([1,1,0,1,0,0,0,0,1,0,1,0,1,1], 14, false, 2);
    const expectedQ: Integer = toInteger([1,0,1,0,0,0,0,1,0,1,0,1,1], 13, false, 2);
    const expectedR: Integer = toInteger([1], 1, false, 2);

    //Run method
    const [actualQ, actualR]: [Integer, Integer] = halve(A);
    actualQ.digits.length = actualQ.precision;

    //Verify method
    assert.equal(actualQ, A);
    assert.deepEqual(actualQ, expectedQ);
    assert.deepEqual(actualR, expectedR);
  });

  it('should return 13579/2 in base 3', function(){
    const A: Integer = toInteger([1,2,2,1,2,1,0,0,2], 9, false, 3);
    const expectedQ: Integer = toInteger([0,1,1,2,2,0,0,0,1], 9, false, 3);
    const expectedR: Integer = toInteger([1], 1, false, 3);

    //Run method
    const [actualQ, actualR]: [Integer, Integer] = halve(A);
    actualQ.digits.length = actualQ.precision;

    //Verify method
    assert.equal(actualQ, A);
    assert.deepEqual(actualQ, expectedQ);
    assert.deepEqual(actualR, expectedR);
  });

  it('should return 13579/2 in base 10', function(){
    const A: Integer = toInteger([9,7,5,3,1], 5, false, 10);
    const expectedQ: Integer = toInteger([9,8,7,6], 4, false, 10);
    const expectedR: Integer = toInteger([1], 1, false, 10);

    //Run method
    const [actualQ, actualR]: [Integer, Integer] = halve(A);
    actualQ.digits.length = actualQ.precision;

    //Verify method
    assert.equal(actualQ, A);
    assert.deepEqual(actualQ, expectedQ);
    assert.deepEqual(actualR, expectedR);
  });

  it('should return 13579/2 in base 11', function(){
    const A: Integer = toInteger([5,2,2,10], 4, false, 11);
    const expectedQ: Integer = toInteger([2,1,1,5], 4, false, 11);
    const expectedR: Integer = toInteger([1], 1, false, 11);

    //Run method
    const [actualQ, actualR]: [Integer, Integer] = halve(A);
    actualQ.digits.length = actualQ.precision;

    //Verify method
    assert.equal(actualQ, A);
    assert.deepEqual(actualQ, expectedQ);
    assert.deepEqual(actualR, expectedR);
  });

  it('should return 321/2 in base 179', function(){
    const A: Integer = toInteger([142, 1], 2, false, 179);
    const expectedQ: Integer = toInteger([160], 1, false, 179);
    const expectedR: Integer = toInteger([1], 1, false, 179);

    //Run method
    const [actualQ, actualR]: [Integer, Integer] = halve(A);
    actualQ.digits.length = actualQ.precision;

    //Verify method
    assert.equal(actualQ, A);
    assert.deepEqual(actualQ, expectedQ);
    assert.deepEqual(actualR, expectedR);
  });

  it('should return 987654/2 in base 179', function(){
    const A: Integer = toInteger([111, 147, 30], 3, false, 179);
    const expectedQ: Integer = toInteger([145, 73, 15], 3, false, 179);
    const expectedR: Integer = toInteger([], 0, false, 179);

    //Run method
    const [actualQ, actualR]: [Integer, Integer] = halve(A);
    actualQ.digits.length = actualQ.precision;

    //Verify method
    assert.equal(actualQ, A);
    assert.deepEqual(actualQ, expectedQ);
    assert.deepEqual(actualR, expectedR);
  });

  it('should return 854,839,610,118,336,687,659,177 / 2 in base 94906265', function(){
    const A: Integer = toInteger([94906264, 94906263, 94906264], 3, false, 94906265);
    const expectedQ: Integer = toInteger([94906264, 47453131, 47453132], 3, false, 94906265);
    const expectedR: Integer = toInteger([1], 1, false, 94906265);

    //Run method
    const [actualQ, actualR]: [Integer, Integer] = halve(A);
    actualQ.digits.length = actualQ.precision;

    //Verify method
    assert.equal(actualQ, A);
    assert.deepEqual(actualQ, expectedQ);
    assert.deepEqual(actualR, expectedR);
  });

  it('should return -1/2 in base 10', function(){
    const A: Integer = toInteger([1], 1, true, 10);
    const expectedQ: Integer = toInteger([1], 1, true, 10);
    const expectedR: Integer = toInteger([1], 1, false, 10);

    //Run method
    const [actualQ, actualR]: [Integer, Integer] = halve(A);
    actualQ.digits.length = actualQ.precision;

    //Verify method
    assert.equal(actualQ, A);
    assert.deepEqual(actualQ, expectedQ);
    assert.deepEqual(actualR, expectedR);
  });

  it('should return -2/2 in base 10', function(){
    const A: Integer = toInteger([2], 1, true, 10);
    const expectedQ: Integer = toInteger([1], 1, true, 10);
    const expectedR: Integer = toInteger([], 0, false, 10);

    //Run method
    const [actualQ, actualR]: [Integer, Integer] = halve(A);
    actualQ.digits.length = actualQ.precision;

    //Verify method
    assert.equal(actualQ, A);
    assert.deepEqual(actualQ, expectedQ);
    assert.deepEqual(actualR, expectedR);
  });

  it('should return -99/2 in base 10', function(){
    const A: Integer = toInteger([9,9], 2, true, 10);
    const expectedQ: Integer = toInteger([0,5], 2, true, 10);
    const expectedR: Integer = toInteger([1], 1, false, 10);

    //Run method
    const [actualQ, actualR]: [Integer, Integer] = halve(A);
    actualQ.digits.length = actualQ.precision;

    //Verify method
    assert.equal(actualQ, A);
    assert.deepEqual(actualQ, expectedQ);
    assert.deepEqual(actualR, expectedR);
  });

});
