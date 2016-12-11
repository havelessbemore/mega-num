import {assert} from 'chai';
import BasicDivisionMethod from '../../src/div/basicDivisionMethod';

function test(A: number[], B: number[], C: number[], D: number[], base: number): void {
  let Q: number[];
  let R: number[];
  let maxQ: number;
  let maxR: number;
  const BB: number[] = B.slice();

  //Divide
  [Q, R, maxQ, maxR] = BasicDivisionMethod(A, A.length, B, B.length, base);

  //Confirm B was not changed
  assert.equal(B.length, BB.length);
  assert.deepEqual(B, BB);

  //Confirm quotient is correct
  assert.equal(maxQ, C.length);
  Q.length = maxQ;
  assert.deepEqual(Q, C);

  //Confirm remainder is correct
  assert.equal(maxR, D.length);
  R.length = maxR;
  assert.deepEqual(R, D);
}

describe('BasicDivisionMethod', function(){

  it('should return 10 / 10 in base 10',
    () => test(
      [0,1], [0,1],
      [1], [], 10
    )
  );

  it('should return 99 / 99 in base 10',
    () => test(
      [9, 9], [9,9],
      [1], [], 10
    )
  );

  it('should return 100 / 10 in base 10',
    () => test(
      [0,0,1], [0,1],
      [0,1], [], 10
    )
  );

  it('should return 999 / 11 in base 10',
    () => test(
      [9,9,9], [1,1],
      [0,9], [9], 10
    )
  );

  it('should return 999,999,999 / 123 in base 10',
    () => test(
      [9,9,9,9,9,9,9,9,9], [3,2,1],
      [1,8,0,0,3,1,8], [6,3], 10
    )
  );

  it('should return 999,999,999 / 321 in base 10',
    () => test(
      [9,9,9,9,9,9,9,9,9], [1,2,3],
      [4,6,2,5,1,1,3], [5,5,2], 10
    )
  );

  it('should return 961,748,941 / 15,485,863 in base 2',
    () => test(
      [1,0,1,1,0,0,1,1,1,1,1,1,1,0,0,0,1,1,0,0,1,0,1,0,1,0,0,1,1,1], [1,1,1,0,0,1,0,1,1,1,0,1,0,0,1,0,0,0,1,1,0,1,1,1],
      [0,1,1,1,1,1], [1,1,0,1,1,0,1,0,1,0,1,1,0,0,1,1,0,0,0,1,1], 2
    )
  );

  it('should return 961,748,941 / 15,485,863 in base 3',
    () => test(
      [1,1,0,2,1,1,0,2,2,0,0,2,0,0,0,1,1,1,2], [1,1,1,1,2,1,2,0,2,0,1,0,2,0,0,1],
      [2,2,0,2], [2,2,0,0,0,2,0,2,1,1,0,0,0,1], 3
    )
  );

  it('should return 961,748,941 / 15,485,863 in base 7',
    () => test(
      [6,2,5,5,0,5,5,5,5,2,3], [1,0,2,5,2,4,5,4,2],
      [6,1,1], [0,1,6,6,4,5,6,1], 7
    )
  );

  it('should return 1,214,015,305,151,164,506,623,822,532,690 / 123,000,456,000,789 in base 10',
    () => test(
      [0,9,6,2,3,5,2,2,8,3,2,6,6,0,5,4,6,1,1,5,1,5,0,3,5,1,0,4,1,2,1], [9,8,7,0,0,0,6,5,4,0,0,0,3,2,1],
      [0,1,2,3,0,0,0,4,5,6,0,0,0,7,8,9], [], 10
    )
  );

  it('should return 961,748,941 / 15,485,863 in base 10',
    () => test(
      [1,4,9,8,4,7,1,6,9], [3,6,8,5,8,4,5,1],
      [2,6], [5,3,4,5,2,6,1], 10
    )
  );

  it('should return 721,948,327 / 84,461 in base 10',
    () => test(
      [7,2,3,8,4,9,1,2,7], [1,6,4,4,8],
      [7,4,5,8], [0,6,1,0,6], 10
    )
  );
});
