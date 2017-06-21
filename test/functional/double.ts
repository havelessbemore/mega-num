import {assert} from 'chai';
import sinon = require('sinon');
import rewire = require('rewire');
import {Integer} from '../../src/integer';
import {toInteger} from '../../src/util/intUtils';
import {double} from '../../src/functional/double';
const rewired = rewire<DoubleFunc>('../../src/functional/double');

interface DoubleFunc {
  double: (A: Integer, b?: boolean) => Integer;
}

describe('double', function(){
  it('should double input', function(){
    const input: Integer = toInteger([1,2], 2, true, 125);
    const expected: Integer = toInteger([2,4], 2, true, 125);
    const actual: Integer = double(input, true);
    assert.equal(actual, input);
    assert.deepEqual(actual, expected);
    assert.notEqual(actual.digits, expected.digits);
  });

  it('should use double() correctly', function(){
    const A: Integer = toInteger([1,2], 2, true, 125);

    //Create mock
    const dependency = rewired.__get__('double_1');
    const mock: sinon.SinonMock = sinon.mock(dependency);
    mock.expects("double").once().withExactArgs(A.digits, 0, A.precision, A.base);

    //Rewire and run method
    rewired.__with__({double_1: dependency})(() => rewired.double(A, true));

    //Verify method
    mock.verify();
  });
});
