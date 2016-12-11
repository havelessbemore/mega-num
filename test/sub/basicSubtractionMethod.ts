import {assert} from 'chai';
import BasicSubtractionMethod from '../../src/sub/basicSubtractionMethod';

function test(A: number[], B: number[], C: number[], base: number): void {
  const D: number[] = B.slice();
  const len: number = A.length = BasicSubtractionMethod(A, 0, A.length, B, 0, B.length, base);
  assert.equal(B.length, D.length);
  assert.deepEqual(B, D);
  assert.equal(len, C.length);
  assert.deepEqual(A, C);
}

describe('BasicSubtractionMethod', function(){

  it('should return 0-0 in base 10',
    () => test([0], [0], [], 10)
  );

  it('should return 1-1 in base 10',
    () => test([1], [1], [], 10)
  );

  it('should return 10-10 in base 10',
    () => test([0,1], [0,1], [], 10)
  );

  it('should return 9-1 in base 10',
    () => test([9], [1], [8], 10)
  );

  it('should return 456789-123 in base 10',
    () => test([9,8,7,6,5,4], [3,2,1], [6,6,6,6,5,4], 10)
  );

  it('should return 456789-123 in base 2',
    () => test(
      [1,0,1,0,1,0,1,0,0,0,0,1,1,1,1,1,0,1,1],
      [1,1,0,1,1,1,1],
      [0,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,1], 2
    )
  );

  it('should return 9,870,006,540,003,210-123,000,456,000,789 in base 10',
    () => test(
      [0,1,2,3,0,0,0,4,5,6,0,0,0,7,8,9],
      [9,8,7,0,0,0,6,5,4,0,0,0,3,2,1],
      [1,2,4,2,0,0,4,8,0,6,0,0,7,4,7,9], 10
    )
  );

  it('should return 1,524,155,677,489-1,524,155,677,489 in base 10',
    () => test(
      [9,8,4,7,7,6,5,5,1,4,2,5,1],
      [9,8,4,7,7,6,5,5,1,4,2,5,1],
      [], 10
    )
  );

  it('should return 10,000,000-1 in base 10',
    () => test(
      [0,0,0,0,0,0,0,1],
      [1],
      [9,9,9,9,9,9,9], 10
    )
  );

  it('should return 10,100,000-1 in base 10',
    () => test(
      [0,0,0,0,0,1,0,1],
      [1],
      [9,9,9,9,9,0,0,1], 10
    )
  );
});
