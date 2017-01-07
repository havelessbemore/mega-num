import {assert} from 'chai';
import {isEven} from '../../src/algorithm/isEven';

describe('isEven', function(){
  it('should return true if zero', function(){
    assert.equal(isEven([],0,0,10), true);
    assert.equal(isEven([],0,0,15), true);
  });
  it('should return false if odd in even base', function(){
    assert.equal(isEven([1],0,1,2), false);
    assert.equal(isEven([0,0,3,0],2,3,8), false);
    assert.equal(isEven([1,2,3,4],0,4,16), false);
  });
  it('should return false if odd in odd base', function(){
    assert.equal(isEven([1],0,1,3), false);
    assert.equal(isEven([0,0,3,0],2,3,7), false);
    assert.equal(isEven([1,2,3,5],0,4,15), false);
  });
  it('should return true if even in even base', function(){
    assert.equal(isEven([2],0,1,2), true);
    assert.equal(isEven([0,0,4,0],2,3,8), true);
    assert.equal(isEven([4,3,2,1],0,4,16), true);
  });
  it('should return true if even in odd base', function(){
    assert.equal(isEven([2],0,1,3), true);
    assert.equal(isEven([0,4,6,0],1,3,7), true);
    assert.equal(isEven([4,3,2,1],0,4,15), true);
  });
});
