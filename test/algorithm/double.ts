import {assert} from 'chai';
import {double} from '../../src/algorithm/double';

function test(A: number[], B: number[], base: number): void {
  const len: number = A.length = double(A, 0, A.length, base);
  assert.equal(len, B.length);
  assert.deepEqual(A, B);
}

describe('double', () => {

  it('should return 0*2 in base 10',
    () => test([0], [0], 10)
  );

  it('should return 1*2 in base 10',
    () => test([1], [2], 10)
  );

  it('should return 2*2 in base 10',
    () => test([2], [4], 10)
  );

  it('should return 7*2 in base 10',
    () => test([7], [4,1], 10)
  );

  it('should return 99*2 in base 10',
    () => test([9,9], [8,9,1], 10)
  );

  it('should return 123*2 in base 10',
    () => test([3,2,1], [6,4,2], 10)
  );

  it('should return 321*2 in base 179',
    () => test([142, 1], [105, 3], 179)
  );

  it('should return 13579*2 in base 2',
    () => test([1,1,0,1,0,0,0,0,1,0,1,0,1,1], [0,1,1,0,1,0,0,0,0,1,0,1,0,1,1], 2)
  );

  it('should return 13579*2 in base 3',
    () => test([1,2,2,1,2,1,0,0,2], [2,1,2,0,2,0,1,0,1,1], 3)
  );

  it('should return 13579*2 in base 10',
    () => test([9,7,5,3,1], [8,5,1,7,2], 10)
  );

  it('should return 13579*2 in base 11',
    () => test([5,2,2,10], [10,4,4,9,1], 11)
  );

  it('should return 987654*2 in base 179',
    () => test([111, 147, 30], [43, 116, 61], 179)
  );

  it('should return 1234567*2 in base 10',
    () => test([7,6,5,4,3,2,1], [4,3,1,9,6,4,2], 10)
  );

  it('should return 7654321*2 in base 10',
    () => test([1,2,3,4,5,6,7], [2,4,6,8,0,3,5,1], 10)
  );

  it('should return 854,839,628,132,734,960,159,624 * 2 in base 94906265',
    () => test([94906264, 94906264, 94906264], [94906263, 94906264, 94906264, 1], 94906265)
  );
});
