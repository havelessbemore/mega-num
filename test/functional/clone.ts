import {assert} from 'chai';
import sinon = require('sinon');
import rewire = require('rewire');
import {Integer} from '../../src/integer';
import {clone} from '../../src/functional/clone';
import {toInteger} from '../../src/util/intUtils';
const rewireClone = rewire<CloneDep>('../../src/functional/clone');

interface CloneDep {
  clone: (A: Integer) => Integer;
}

describe('clone', () => {
  it('should clone source property values with target', () => {
    const input: Integer = toInteger([1,2,3,4,5], 5, true, 125);
    const output: Integer = clone(input);
    assert.notEqual(input, output);
    assert.deepEqual(input, output);
    assert.notEqual(input.digits, output.digits);
  });

  it('should use copy to clone', () => {
    const input: Integer = toInteger([1,2,3,4,5], 5, true, 125);

    //Create mock
    const dependency = rewireClone.__get__('copy_1');
    const mock: sinon.SinonMock = sinon.mock(dependency);
    mock.expects("copy").once().withExactArgs({}, input);

    //Rewire and run method
    rewireClone.__with__({copy_1: dependency})(() => rewireClone.clone(input));

    //Verify method
    mock.verify();
  });
});
