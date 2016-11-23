import assert = require('assert');
import {print} from '../../src/util';
import BasicDivisionMethod from '../../src/div/basicDivisionMethod';

function test(A: number[], B: number[], C: number[], D: number[], base: number): void {
  let Q: number[];
  let R: number[];
  let maxQ: number;
  let maxR: number;
  const BB: number[] = B.slice();

  //Divide
  [Q, R, maxQ, maxR] = BasicDivisionMethod(A, A.length, B, B.length, base);

  console.log("Q: ", print(Q, 0, Q.length), "R: ", print(R, 0, R.length));

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

  it('should return 721,948,327 / 84,461 in base 10',
    () => test(
      [7,2,3,8,4,9,1,2,7], [1,6,4,4,8],
      [7,4,5,8], [0,6,1,0,6], 10
    )
  );
});
