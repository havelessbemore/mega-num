import {assert} from 'chai';
import {singleDigitMultiplication} from '../../src/algorithm/singleDigitMultiplication';

function test(A: number[], minA: number, maxA: number, B: number, C: number[], maxC: number, base: number): void {
  maxA = singleDigitMultiplication(A, minA, maxA, B, base);
  assert.equal(maxA, maxC);
  assert.deepEqual(A, C);
}

describe('singleDigitMultiplication', function(){

  it('should return 0*2 in base 10',
    () => test([], 0, 0, 2, [], 0, 10)
  );

  it('should return 1*1 in base 10',
    () => test([1], 0, 1, 1, [1], 1, 10)
  );

  it('should return 1*9 in base 10',
    () => test([1], 0, 1, 9, [9], 1, 10)
  );

  it('should return 8*8 in base 10',
    () => test([8], 0, 1, 8, [4,6], 2, 10)
  );

  it('should return 124*7 in base 10',
    () => test([2,4,1], 0, 3, 7, [4,9,9], 3, 10)
  );

  it('should return 124*8 in base 10',
    () => {
      test([2,4,1], 0, 3, 8, [6,3,1,1], 4, 10);
      test([0,0,2,4,1], 2, 5, 8, [0,0,6,3,1,1], 6, 10);
      test([2,4,1,0], 0, 3, 8, [6,3,1,1], 4, 10);
      test([0,2,4,1,0,0,0], 1, 4, 8, [0,6,3,1,1,0,0], 5, 10);
    }
  );

  it('should return 199,999,999 * 5 in base 10',
    () => test([9,9,9,9,9,9,9,9,1], 0, 9, 5, [5,9,9,9,9,9,9,9,9], 9, 10)
  );

  it('should return 961,748,941 * 1 in base 2',
    () => test(
      [1,0,1,1,0,0,1,1,1,1,1,1,1,0,0,0,1,1,0,0,1,0,1,0,1,0,0,1,1,1], 0, 30, 1,
      [1,0,1,1,0,0,1,1,1,1,1,1,1,0,0,0,1,1,0,0,1,0,1,0,1,0,0,1,1,1], 30, 2
    )
  );

  it('should return 961,748,941 * 2 in base 3',
    () => test(
      [0,2,1,2,0,2,1,2,2,1,1,2,1,1,1,0,2,0,1], 0, 19, 2,
      [0,1,0,2,1,1,0,2,2,0,0,2,0,0,0,1,1,1,2], 19, 3
    )
  );
});
