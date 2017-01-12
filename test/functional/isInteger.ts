import {assert} from 'chai';
import {Integer} from '../../src/integer';
import {isInteger} from '../../src/functional/isInteger';

function toInteger(digits: number[], precision: number, isNegative: boolean, base: number): Integer {
  return {
    base: base,
    digits: digits,
    precision: precision,
    isNegative: isNegative
  };
}

describe('abs', function(){
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
