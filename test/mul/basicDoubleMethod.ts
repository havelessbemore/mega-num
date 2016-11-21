import assert = require('assert');
import BasicDoubleMethod from '../../src/mul/basicDoubleMethod';

function test(A: number[], B: number[], base: number): void {
  const len: number = A.length = BasicDoubleMethod(A, A.length, base);
  assert.equal(len, B.length);
  assert.deepEqual(A, B);
}

describe('BasicDoubleMethod', function(){

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
