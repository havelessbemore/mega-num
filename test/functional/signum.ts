import {assert} from 'chai';
import {Integer} from '../../src/integer';
import {signum} from '../../src/functional/signum';

function toInteger(digits: number[], precision: number, isNegative: boolean, base: number): Integer {
  return {
    base: base,
    digits: digits,
    precision: precision,
    isNegative: isNegative
  };
}

describe('signum', function(){

  it('should return the signum value of zero', function(){
    const input: Integer = toInteger([], 0, false, 125);
    assert.equal(signum(input), 0);
  });

  it('should return the signum value of a positive input', function(){
    const input: Integer = toInteger([0,1,2,3,4], 5, false, 125);
    assert.equal(signum(input), 1);
  });

  it('should return the signum value of a negative input', function(){
    const input: Integer = toInteger([5,6,7,8,9], 5, true, 125);
    assert.equal(signum(input), -1);
  });
});
