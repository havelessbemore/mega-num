import {assert} from 'chai';
import {Integer} from '../../src/integer';
import {abs} from '../../src/functional/abs';
import {toInteger} from '../../src/util/intUtils';

describe('abs', function(){
  it('should return the absolute value of a positive input', function(){
    const input: Integer = toInteger([1,2,3,4,5], 5, false, 125);
    const output: Integer = abs(input);
    assert.equal(input, output);
    assert.deepEqual(input, output);
    assert.equal(output.isNegative, false);
  });

  it('should return the absolute value of a negative input', function(){
    const input: Integer = toInteger([1,2,3,4,5], 5, true, 125);
    const output: Integer = abs(input);
    assert.equal(input, output);
    assert.deepEqual(input, output);
    assert.equal(output.isNegative, false);
  });
});
