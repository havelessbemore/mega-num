import {assert} from 'chai';
import {compare} from '../../src/algorithm/compare';

describe('compare', function(){
  it('should return -1 when A.length < B.length', function(){
    assert.equal(compare([],0,0,[1],0,1), -1);
    assert.equal(compare([1],0,1,[2,3],0,2), -1);
    assert.equal(compare([0,1,2,3],0,4,[4,5,6,7,8,9,1],0,7), -1);
    assert.equal(compare([0,1,2,3],1,4,[4,5,6,7,8,9,1],2,7), -1);
    assert.equal(compare([0,1,2,3],1,3,[4,5,6,7,8,9,1],2,6), -1);
  });

  it('should return 1 when A.length > B.length', function(){
    assert.equal(compare([1],0,1,[],0,0), 1);
    assert.equal(compare([2,3],0,2,[1],0,1), 1);
    assert.equal(compare([4,5,6,7,8,9,1],0,7,[0,1,2,3],0,4), 1);
    assert.equal(compare([4,5,6,7,8,9,1],2,7,[0,1,2,3],1,4), 1);
    assert.equal(compare([4,5,6,7,8,9,1],2,6,[0,1,2,3],1,3), 1);
  });

  it('should return -1 when A.length === B.length and A < B', function(){
    assert.equal(compare([1,2,2],0,3,[1,2,3],0,3), -1);
    assert.equal(compare([0,1,1,3,4,5,6,7,8,9],0,10,[0,1,2,3,4,5,6,7,8,9],0,10), -1);
    assert.equal(compare([0,1,2,2,4,5,6,7,8,9],3,8,[3,4,5,6,7],0,5), -1);
    assert.equal(compare([2,4,5,6,7],0,5,[0,1,2,3,4,5,6,7,8,9],3,8), -1);
    assert.equal(compare([0,0,2,3,4,5,6,7,8,9],1,5,[0,0,0,1,2,3,4,9],3,7), -1);
  });

  it('should return 1 when A.length === B.length and A > B', function(){
    assert.equal(compare([1,2,3],0,3,[1,2,2],0,3), 1);
    assert.equal(compare([0,1,2,3,4,5,6,7,8,9],0,10,[0,1,1,3,4,5,6,7,8,9],0,10), 1);
    assert.equal(compare([0,1,2,3,4,5,6,7,8,9],3,8,[2,4,5,6,7],0,5), 1);
    assert.equal(compare([3,4,5,6,7],0,5,[0,1,2,2,4,5,6,7,8,9],3,8), 1);
    assert.equal(compare([0,1,2,3,4,5,6,7,8,9],1,5,[0,0,0,0,2,3,4,9],3,7), 1);
  });

  it('should return 0 when A == B', function(){
    assert.equal(compare([],0,0,[],0,0), 0);
    assert.equal(compare([1,2,3],0,3,[1,2,3],0,3), 0);
    assert.equal(compare([0,1,2,3,4,5,6,7,8,9],0,10,[0,1,2,3,4,5,6,7,8,9],0,10), 0);
    assert.equal(compare([0,1,2,3,4,5,6,7,8,9],3,8,[3,4,5,6,7],0,5), 0);
    assert.equal(compare([3,4,5,6,7],0,5,[0,1,2,3,4,5,6,7,8,9],3,8), 0);
    assert.equal(compare([0,1,2,3,4,5,6,7,8,9],1,5,[0,0,0,1,2,3,4,9],3,7), 0);
  });
});
