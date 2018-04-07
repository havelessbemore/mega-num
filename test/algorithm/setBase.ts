import {assert} from 'chai';
import {setBase} from '../../src/algorithm/setBase';

function check(
  int: number[],
  min: number,
  max: number,
  fromBase: number,
  toBase: number,
  expected: [number[], number]
): void {
  const actual = setBase(int, min, max, fromBase, toBase);
  actual[0].length = actual[1];
  assert.deepEqual(actual, expected);
}

describe('setBase', () => {
  it('should return zero when input is zero', () => {
    check([],0,0,2,16, [[], 0]);
    check([],0,0,16,2, [[], 0]);
  });

  it('should return one when input is one', () => {
    check([1],0,1,2,16, [[1], 1]);
    check([0,0,1,0],2,3,2,16, [[1], 1]);
    check([0,0,1,0],2,3,16,2, [[1], 1]);
  });

  it('should change numbers in base 10 to base 2', () => {
    check([2],0,1,10,2, [[0,1], 2]);
    check([0,1],0,2,10,2, [[0,1,0,1], 4]);
    check([6,1],0,2,10,2, [[0,0,0,0,1], 5]);
    check([1,3],0,2,10,2, [[1,1,1,1,1], 5]);
  });

  it('should change numbers in base 7 to base 19', () => {
    check([2],0,1,7,19, [[2], 1]);
    check([0,1],0,2,7,19, [[7], 1]);
    check([5,2],0,2,7,19, [[0,1], 2]);
    check([2,4,0,1],0,4,7,19, [[12,0,1], 3]);
    check([1,4,6,1,5,0,1],0,7,7,19, [[18,18,18,18], 4]);
  });
});
