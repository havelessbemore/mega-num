import {assert} from 'chai';
import {toInteger} from '../../src/util/intUtils';
import {isInteger} from '../../src/functional/isInteger';

describe('isInteger', function(){
  it('should return true when input is integer', function(){
    const input: any = toInteger([1,2,3,4,5], 5, false, 125);
    assert.equal(isInteger(input), true);
  });

  it('should return false when input is not integer', function(){
    let input: any = {base: 10};
    assert.equal(isInteger(input), false);
    input["digits"] = [1];
    assert.equal(isInteger(input), false);
    input["precision"] = 1;
    assert.equal(isInteger(input), false);
    input = {isNegative: false};
    assert.equal(isInteger(input), false);
  });
});
