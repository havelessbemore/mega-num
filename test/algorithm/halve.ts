import {assert} from 'chai';
import {halve} from '../../src/algorithm/halve';

function test(A: number[], B: number[], C: number, base: number): void {
  let remainder: number;
  [A.length, remainder] = halve(A, 0, A.length, base);
  assert.equal(C, remainder);
  assert.equal(A.length, B.length);
  assert.deepEqual(A, B);
}

describe('halve', function(){

  it('should return 0/2 in base 10', function(){
    test([0], [], 0, 10);
  });

  it('should return 1/2 in base 10', function(){
    test([1], [], 1, 10);
  });

  it('should return 2/2 in base 10', function(){
    test([2], [1], 0, 10);
  });

  it('should return 99/2 in base 10', function(){
    test([99], [49], 1, 10);
  });

  it('should return 123/2 in base 10', function(){
    test([3,2,1], [1,6], 1, 10);
  });

  it('should return 13579/2 in base 2', function(){
    test([1,1,0,1,0,0,0,0,1,0,1,0,1,1], [1,0,1,0,0,0,0,1,0,1,0,1,1], 1, 2);
  });

  it('should return 13579/2 in base 3', function(){
    test([1,2,2,1,2,1,0,0,2], [0,1,1,2,2,0,0,0,1], 1, 3);
  });

  it('should return 13579/2 in base 10', function(){
    test([9,7,5,3,1], [9,8,7,6], 1, 10);
  });

  it('should return 13579/2 in base 11', function(){
    test([5,2,2,10], [2,1,1,5], 1, 11);
  });

  it('should return 321/2 in base 179', function(){
    test([142, 1], [160], 1, 179);
  });

  it('should return 987654/2 in base 179', function(){
    test([111, 147, 30], [145, 73, 15], 0, 179);
  });

  it('should return 854,839,610,118,336,687,659,177 / 2 in base 94906265', function(){
    test([94906264, 94906263, 94906264], [94906264, 47453131, 47453132], 1, 94906265);
  });
});
