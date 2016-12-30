import {assert} from 'chai';
import {increment} from '../../src/algorithm/increment';

function test(A: number[], min: number, maxA: number, B: number[], maxB: number, base: number): void {
  maxA = increment(A, min, maxA, base);
  assert.equal(maxA, maxB);
  assert.deepEqual(A, B);
}

describe('increment', function(){

  it('should return 0+1 in base 10',
    () => test([], 0, 0, [1], 1, 10)
  );

  it('should return 1+1 in base 10',
    () => test([1], 0, 1, [2], 1, 10)
  );

  it('should return 9+1 in base 10',
    () => test([9], 0, 1, [0,1], 2, 10)
  );

  it('should return 15+1 in base 10',
    () => test([5,1], 0, 2, [6,1], 2, 10)
  );

  it('should return 99+1 in base 10',
    () => {
      test([9,9], 0, 2, [0,0,1], 3, 10);
      test([0,0,9,9], 2, 4, [0,0,0,0,1], 5, 10);
      test([9,9,0], 0, 2, [0,0,1], 3, 10);
      test([0,0,0,9,9,0,0], 3, 5, [0,0,0,0,0,1,0], 6, 10);
    }
  );

  it('should return 100000+1 in base 10',
    () => test([0,0,0,0,0,1], 0, 6, [1,0,0,0,0,1], 6, 10)
  );

  it('should return 107999+1 in base 10',
    () => {
      test([9,9,9,7,0,1], 0, 6, [0,0,0,8,0,1], 6, 10);
      test([0,0,0,9,9,9,7,0,1], 3, 9, [0,0,0,0,0,0,8,0,1], 9, 10);
      test([9,9,9,7,0,1,0,0,0], 0, 6, [0,0,0,8,0,1,0,0,0], 6, 10);
      test([0,0,9,9,9,7,0,1,0], 2, 8, [0,0,0,0,0,8,0,1,0], 8, 10);
    }
  );

  it('should return 357+1 in base 179',
    () => test([178, 1], 0, 2, [0, 2], 2, 179)
  );
});
