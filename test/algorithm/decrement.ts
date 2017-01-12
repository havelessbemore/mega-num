import {assert} from 'chai';
import {decrement} from '../../src/algorithm/decrement';

function test(A: number[], min: number, maxA: number, B: number[], maxB: number, base: number): void {
  maxA = decrement(A, min, maxA, base);
  assert.equal(maxA, maxB);
  assert.deepEqual(A, B);
}

describe('decrement', function(){

  it('should return 1-1 in base 10', function(){
    test([1], 0, 1, [0], 0, 10);
  });

  it('should return 2-1 in base 10', function(){
    test([2], 0, 1, [1], 1, 10);
  });

  it('should return 10-1 in base 10', function(){
    test([0,1], 0, 2, [9, 0], 1, 10);
  });

  it('should return 11-1 in base 10', function(){
    test([1,1], 0, 2, [0,1], 2, 10);
  });

  it('should return 99-1 in base 10', function(){
    test([9,9], 0, 2, [8,9], 2, 10);
  });

  it('should return 100000-1 in base 10', function(){
    test([0,0,0,0,0,1], 0, 6, [9,9,9,9,9,0], 5, 10);
  });

  it('should return 300000-1 in base 10', function(){
    test([0,0,0,0,0,3], 0, 6, [9,9,9,9,9,2], 6, 10);
  });

  it('should return 321-1 in base 179', function(){
    test([142, 1], 0, 2, [141, 1], 2, 179);
  });

  it('should return 28,676,695-1 in base 179', function(){
    test([0,0,0,5], 0, 4, [178,178,178,4], 4, 179);
  });

  it('should return 72-1 in base 2', function(){
    test([0,0,0,1,0,0,1], 0, 7, [1,1,1,0,0,0,1], 7, 2);
  });
});
