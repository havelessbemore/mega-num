import {assert} from 'chai';
import * as util from '../../src/util/arrayUtils';

describe('arrayUtils', function(){

  describe('unsafeShiftUp', function(){
    it("should correctly shift array segment up when no overlap with target segment", function(){
      const actual: number[] = [0,1,2,3,4,7,7,7,7,7];
      util.unsafeShiftUp(actual, 3, 5, 4);
      assert.deepEqual(actual, [0,1,2,3,4,7,7,3,4,7]);
      util.unsafeShiftUp(actual, 0, 4, 6);
      assert.deepEqual(actual, [0,1,2,3,4,7,0,1,2,3]);
      util.unsafeShiftUp(actual, 1, 2, 5);
      assert.deepEqual(actual, [0,1,2,3,4,7,1,1,2,3]);
      util.unsafeShiftUp(actual, 5, 5, 15);
      assert.deepEqual(actual, [0,1,2,3,4,7,1,1,2,3]);
      util.unsafeShiftUp(actual, 1, 6, 5);
      assert.deepEqual(actual, [0,1,2,3,4,7,1,2,3,4,7]);
    });

    it("should incorrectly shift array segment up when overlap with target segment", function(){
      const actual: number[] = [0,1,2,3,4,7,1,2,3,4,7];
      util.unsafeShiftUp(actual, 1, 5, 1);
      assert.deepEqual(actual, [0,1,1,1,1,1,1,2,3,4,7]);
      util.unsafeShiftUp(actual, 8, 10, 1);
      assert.deepEqual(actual, [0,1,1,1,1,1,1,2,3,3,3]);
      util.unsafeShiftUp(actual, 0, 1, 1);
      assert.deepEqual(actual, [0,0,1,1,1,1,1,2,3,3,3]);
      util.unsafeShiftUp(actual, 0, 9, 2);
      assert.deepEqual(actual, [0,0,0,0,0,0,0,0,0,0,0]);
    });
  });

  describe('safeShiftUp', function(){
    it("should correctly shift array segment up when no overlap with target segment", function(){
      const actual: number[] = [0,1,2,3,4,7,7,7,7,7];
      util.safeShiftUp(actual, 3, 5, 4);
      assert.deepEqual(actual, [0,1,2,3,4,7,7,3,4,7]);
      util.safeShiftUp(actual, 0, 4, 6);
      assert.deepEqual(actual, [0,1,2,3,4,7,0,1,2,3]);
      util.safeShiftUp(actual, 1, 2, 5);
      assert.deepEqual(actual, [0,1,2,3,4,7,1,1,2,3]);
      util.safeShiftUp(actual, 5, 5, 15);
      assert.deepEqual(actual, [0,1,2,3,4,7,1,1,2,3]);
      util.safeShiftUp(actual, 1, 6, 5);
      assert.deepEqual(actual, [0,1,2,3,4,7,1,2,3,4,7]);
    });

    it("should correctly shift array segment up when overlap with target segment", function(){
      const actual: number[] = [0,1,2,3,4,7,1,2,3,4,7];
      util.safeShiftUp(actual, 1, 5, 1);
      assert.deepEqual(actual, [0,1,1,2,3,4,1,2,3,4,7]);
      util.safeShiftUp(actual, 8, 10, 1);
      assert.deepEqual(actual, [0,1,1,2,3,4,1,2,3,3,4]);
      util.safeShiftUp(actual, 0, 1, 1);
      assert.deepEqual(actual, [0,0,1,2,3,4,1,2,3,3,4]);
      util.safeShiftUp(actual, 0, 4, 3);
      assert.deepEqual(actual, [0,0,1,0,0,1,2,2,3,3,4]);
    });
  });

  describe('copy', function(){
    it('should copy indices [min, max) of source array into target array', function(){
      const source: number[] = [1,2,3,4,5,6,7,8,9];
      const target: number[] = [0,0,0,0,0,0,0,0,0];
      util.copy(target, 1, source, 4, 4);
      assert.deepEqual(target, [0,0,0,0,0,0,0,0,0]);
      util.copy(target, 5, source, 1, 4);
      assert.deepEqual(target, [0,0,0,0,0,2,3,4,0]);
      util.copy(target, 1, source, 8, 9);
      assert.deepEqual(target, [0,9,0,0,0,2,3,4,0]);
      util.copy(target, 3, source, 5, 9);
      assert.deepEqual(target, [0,9,0,6,7,8,9,4,0]);
      util.copy(target, 1, source, 0, 9);
      assert.deepEqual(target, [0,1,2,3,4,5,6,7,8,9]);
    });
  });

  describe('printArr', function(){
    it("should print out the array in subsets", function(){
      assert.equal(util.printArr([],0,0), "[||]");
      assert.equal(util.printArr([1,2,3],0,3), "[|1, 2, 3|]");
      assert.equal(util.printArr([1,2,3],0,2), "[|1, 2|]");
      assert.equal(util.printArr([1,2,3],2,3), "[|3|]");
      assert.equal(util.printArr([1,2,3,4,5],1,4), "[|2, 3, 4|]");
      assert.equal(util.printArr([1,2,3,4,5],0,5,2,3), "[1, 2|3|4, 5]");
    });

    it("should print null / NaN / undefined correctly", function(){
      assert.equal(util.printArr([null, undefined, NaN],0,3), "[|null, undefined, NaN|]");
    });
  });
});
