import {assert} from 'chai';
import * as sinon from 'sinon';
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
    const copy1 = rewireClone.__get__('copy_1');
    const mock: sinon.SinonMock = sinon.mock(copy1);
    mock.expects("copy").once().withExactArgs({}, input);

    //Rewire and run method
    rewireClone.__with__({
      'copy_1.copy': copy1.copy
    })(() => rewireClone.clone(input));

    //Verify method
    mock.verify();
  });
});
