import {assert} from 'chai';
import {singleDigitDivision} from '../../src/algorithm/singleDigitDivision';

function test(A: number[], B: number, C: number[], D: number[], base: number): void {
  let Q: number[];
  let R: number[];
  let maxQ: number;
  let maxR: number;

  //Divide
  [Q, R, maxQ, maxR] = singleDigitDivision(A, 0, A.length, B, base);

  //Confirm quotient is correct
  assert.equal(maxQ, C.length);
  Q.length = maxQ;
  assert.deepEqual(Q, C);

  //Confirm remainder is correct
  assert.equal(maxR, D.length);
  R.length = maxR;
  assert.deepEqual(R, D);
}

describe('singleDigitDivision', function(){

  it('should return 10 / 9 in base 10',
    () => test(
      [0,1], 9,
      [1], [1], 10
    )
  );

  it('should return 99 / 9 in base 10',
    () => test(
      [9, 9], 9,
      [1,1], [], 10
    )
  );

  it('should return 100 / 9 in base 10',
    () => test(
      [0,0,1], 9,
      [1,1], [1], 10
    )
  );

  it('should return 999 / 7 in base 10',
    () => test(
      [9,9,9], 7,
      [2,4,1], [5], 10
    )
  );

  it('should return 999,999,999 / 5 in base 10',
    () => test(
      [9,9,9,9,9,9,9,9,9], 5,
      [9,9,9,9,9,9,9,9,1], [4], 10
    )
  );

  it('should return 961,748,941 / 1 in base 2',
    () => test(
      [1,0,1,1,0,0,1,1,1,1,1,1,1,0,0,0,1,1,0,0,1,0,1,0,1,0,0,1,1,1], 1,
      [1,0,1,1,0,0,1,1,1,1,1,1,1,0,0,0,1,1,0,0,1,0,1,0,1,0,0,1,1,1], [], 2
    )
  );

  it('should return 961,748,941 / 2 in base 3',
    () => test(
      [1,1,0,2,1,1,0,2,2,0,0,2,0,0,0,1,1,1,2], 2,
      [0,2,1,2,0,2,1,2,2,1,1,2,1,1,1,0,2,0,1], [1], 3
    )
  );
});
