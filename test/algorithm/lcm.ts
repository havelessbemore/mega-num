import {assert} from 'chai';
import {lcm} from '../../src/algorithm/lcm';

function test(A: number[], minA: number, maxA: number, B: number[], minB: number, maxB: number, C: number[], base: number): void {
  [A, maxA] = lcm(A, minA, maxA, B, minB, maxB, base);
  assert.deepEqual(A.slice(0, maxA), C);
}

describe('lcm', function(){

  it('should return lcm(1,1) = 1 in base 10', function(){
    test([1], 0, 1, [1], 0, 1, [1], 10);
  });

  it('should return lcm(4,6) = 12 in base 10', function(){
    test([4], 0, 1, [6], 0, 1, [2,1], 10);
  });

  it('should return lcm(21,6) = 42 in base 10', function(){
    test([1,2], 0, 2, [6], 0, 1, [2,4], 10);
    test([9,9,1,2,9,9,9], 2, 4, [6], 0, 1, [2,4], 10);
    test([1,2], 0, 2, [9,9,9,6,9], 3, 4, [2,4], 10);
    test([9,1,2,9,9,9], 1, 3, [9,9,6,9], 2, 3, [2,4], 10);
  });

  it('should return lcm(21,6) = 42 in base 2', function(){
    test([1,0,1,0,1], 0, 5, [0,1,1], 0, 3, [0,1,0,1,0,1], 2);
  });

  it('should return lcm(21,6) = 42 in base 3', function(){
    test([0,1,2], 0, 3, [0,2], 0, 2, [0,2,1,1], 3);
  });

  it('should return lcm(21,6) = 42 in base 5', function(){
    test([1,4], 0, 2, [1,1], 0, 2, [2,3,1], 5);
  });

  it('should return lcm(21,6) = 42 in base 16', function(){
    test([5,1], 0, 2, [6], 0, 1, [10,2], 16);
  });
});
