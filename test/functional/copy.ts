import {assert} from 'chai';
import sinon = require('sinon');
import rewire = require('rewire');
import {Integer} from '../../src/integer';
import {toInteger} from '../../src/util/intUtils';
import {copy} from '../../src/functional/copy';
const rewired: CopyFunc & rewire.Rewire = rewire<CopyFunc>('../../src/functional/copy');

interface CopyFunc {
  copy: (A: Integer, B: Integer) => Integer;
}

describe('copy', function(){
  it('should copy source property values with target', function(){
    const source: Integer = toInteger([1,2,3,4,5], 5, true, 125);
    const target: Integer = toInteger([6,7,8], 3, false, 10);
    const actual: Integer = copy(target, source);
    assert.equal(actual, target);
    assert.deepEqual(actual, source);
    assert.notEqual(actual.digits, source.digits);
  });

  it('should use copy() correctly', function(){
    const target: Integer = toInteger([1,2,3], 3, true, 10);
    const source: Integer = toInteger([1,2,3,4,5], 5, true, 125);

    //Create mock
    const dependency = rewired.__get__('intUtils_1');
    const mock: Sinon.SinonMock = sinon.mock(dependency);
    mock.expects("copy").once().withExactArgs(target, source);

    //Rewire and run method
    rewired.__with__({intUtils_1: dependency})(() => rewired.copy(target, source));

    //Verify method
    mock.verify();
  });
});
