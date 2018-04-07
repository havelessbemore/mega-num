import {assert} from 'chai';
import {Integer} from '../../src/integer';
import {toInteger} from '../../src/util/intUtils';
import {negate} from '../../src/functional/negate';

describe('negate', () => {
  it('should return the negative value of a positive input', () => {
    const input: Integer = toInteger([1,2,3,4,5], 5, false, 125);
    const output: Integer = negate(input);
    assert.equal(input, output);
    assert.equal(output.isNegative, true);
    assert.deepEqual(input, output);
  });

  it('should return the negative value of a negative input', () => {
    const input: Integer = toInteger([1,2,3,4,5], 5, true, 125);
    const output: Integer = negate(input);
    assert.equal(input, output);
    assert.equal(output.isNegative, false);
    assert.deepEqual(input, output);
  });
});
