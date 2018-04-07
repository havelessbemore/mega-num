import {assert, expect} from 'chai';
import {Globals} from '../../src/globals';
import {
  copy, growArray, printArr, safeShiftUp, unsafeShiftUp
} from '../../src/util/arrayUtils';

describe('arrayUtils', () => {

  describe('copy', () => {
    it('should copy indices [min, max) of source array into target array', () => {
      const source: number[] = [1,2,3,4,5,6,7,8,9];
      const target: number[] = [0,0,0,0,0,0,0,0,0];
      copy(target, 1, source, 4, 4);
      assert.deepEqual(target, [0,0,0,0,0,0,0,0,0]);
      copy(target, 5, source, 1, 4);
      assert.deepEqual(target, [0,0,0,0,0,2,3,4,0]);
      copy(target, 1, source, 8, 9);
      assert.deepEqual(target, [0,9,0,0,0,2,3,4,0]);
      copy(target, 3, source, 5, 9);
      assert.deepEqual(target, [0,9,0,6,7,8,9,4,0]);
      copy(target, 1, source, 0, 9);
      assert.deepEqual(target, [0,1,2,3,4,5,6,7,8,9]);
    });
  });

  describe('growArray', () => {
    it('should not change size if new size <= current size', () => {
      const A: number[] = [0,1,2,3,4];
      growArray(A, 2, 4);
      assert.equal(A.length, 5);
      growArray(A, 2, 5);
      assert.equal(A.length, 5);
      growArray(A, 5, 5);
      assert.equal(A.length, 5);
    });

    it('should change to max size if valid and > current size', () => {
      const A: number[] = [0,1,2,3,4];
      growArray(A, 2, 10);
      assert.equal(A.length, 10);
    });

    it('should change to min size if > current size and max size invalid', () => {
      const A: number[] = [0,1,2,3,4];
      growArray(A, 10, Globals.MAX_PRECISION + 1);
      assert.equal(A.length, 10);
    });

    it('should throw error if new sizes > supported sizes', () => {
      const A: number[] = [0,1,2,3,4];
      const max: number = Globals.MAX_PRECISION;
      expect(() => growArray(A, max + 1, max + 1)).to.throw(RangeError);
    });
  });

  describe('printArr', () => {
    it("should print out the array in subsets", () => {
      assert.equal(printArr([],0,0), "[||]");
      assert.equal(printArr([1,2,3],0,3), "[|1, 2, 3|]");
      assert.equal(printArr([1,2,3],0,2), "[|1, 2|]");
      assert.equal(printArr([1,2,3],2,3), "[|3|]");
      assert.equal(printArr([1,2,3,4,5],1,4), "[|2, 3, 4|]");
      assert.equal(printArr([1,2,3,4,5],0,5,2,3), "[1, 2|3|4, 5]");
    });

    it("should print null / NaN / undefined correctly", () => {
      assert.equal(printArr([null, undefined, NaN],0,3), "[|null, undefined, NaN|]");
    });
  });

  describe('safeShiftUp', () => {
    it("should correctly shift array segment up when no overlap with target segment", () => {
      const actual: number[] = [0,1,2,3,4,7,7,7,7,7];
      safeShiftUp(actual, 3, 5, 4);
      assert.deepEqual(actual, [0,1,2,3,4,7,7,3,4,7]);
      safeShiftUp(actual, 0, 4, 6);
      assert.deepEqual(actual, [0,1,2,3,4,7,0,1,2,3]);
      safeShiftUp(actual, 1, 2, 5);
      assert.deepEqual(actual, [0,1,2,3,4,7,1,1,2,3]);
      safeShiftUp(actual, 5, 5, 15);
      assert.deepEqual(actual, [0,1,2,3,4,7,1,1,2,3]);
      safeShiftUp(actual, 1, 6, 5);
      assert.deepEqual(actual, [0,1,2,3,4,7,1,2,3,4,7]);
    });

    it("should correctly shift array segment up when overlap with target segment", () => {
      const actual: number[] = [0,1,2,3,4,7,1,2,3,4,7];
      safeShiftUp(actual, 1, 5, 1);
      assert.deepEqual(actual, [0,1,1,2,3,4,1,2,3,4,7]);
      safeShiftUp(actual, 8, 10, 1);
      assert.deepEqual(actual, [0,1,1,2,3,4,1,2,3,3,4]);
      safeShiftUp(actual, 0, 1, 1);
      assert.deepEqual(actual, [0,0,1,2,3,4,1,2,3,3,4]);
      safeShiftUp(actual, 0, 4, 3);
      assert.deepEqual(actual, [0,0,1,0,0,1,2,2,3,3,4]);
    });
  });

  describe('unsafeShiftUp', () => {
    it("should correctly shift array segment up when no overlap with target segment", () => {
      const actual: number[] = [0,1,2,3,4,7,7,7,7,7];
      unsafeShiftUp(actual, 3, 5, 4);
      assert.deepEqual(actual, [0,1,2,3,4,7,7,3,4,7]);
      unsafeShiftUp(actual, 0, 4, 6);
      assert.deepEqual(actual, [0,1,2,3,4,7,0,1,2,3]);
      unsafeShiftUp(actual, 1, 2, 5);
      assert.deepEqual(actual, [0,1,2,3,4,7,1,1,2,3]);
      unsafeShiftUp(actual, 5, 5, 15);
      assert.deepEqual(actual, [0,1,2,3,4,7,1,1,2,3]);
      unsafeShiftUp(actual, 1, 6, 5);
      assert.deepEqual(actual, [0,1,2,3,4,7,1,2,3,4,7]);
    });

    it("should incorrectly shift array segment up when overlap with target segment", () => {
      const actual: number[] = [0,1,2,3,4,7,1,2,3,4,7];
      unsafeShiftUp(actual, 1, 5, 1);
      assert.deepEqual(actual, [0,1,1,1,1,1,1,2,3,4,7]);
      unsafeShiftUp(actual, 8, 10, 1);
      assert.deepEqual(actual, [0,1,1,1,1,1,1,2,3,3,3]);
      unsafeShiftUp(actual, 0, 1, 1);
      assert.deepEqual(actual, [0,0,1,1,1,1,1,2,3,3,3]);
      unsafeShiftUp(actual, 0, 9, 2);
      assert.deepEqual(actual, [0,0,0,0,0,0,0,0,0,0,0]);
    });
  });

});
