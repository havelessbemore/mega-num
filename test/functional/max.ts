import {assert} from 'chai';
import * as sinon from 'sinon';
import rewire = require('rewire');
import {Integer} from '../../src/integer';
import {toInteger} from '../../src/util/intUtils';
import {max} from '../../src/functional/max';
const rewired = rewire<MaxFunc>('../../src/functional/max');

interface MaxFunc {
  max: (A: Integer, B: Integer, b?: boolean) => Integer;
}

describe('max', () => {
  it('should return A as max', () => {
    const A: Integer = toInteger([1,2,3,4,5], 5, false, 125);
    const B: Integer = toInteger([6,7,8], 3, false, 10);
    const C: Integer = max(A, B);
    assert.equal(A, C);
  });

  it('should return B as max', () => {
    const A: Integer = toInteger([1,2], 2, false, 10);
    const B: Integer = toInteger([3,4], 2, false, 10);
    const C: Integer = max(A, B);
    assert.equal(B, C);
  });

  it('should use compare() to find max', () => {
    const A: Integer = toInteger([1,2], 2, false, 10);
    const B: Integer = toInteger([3,4], 2, false, 10);

    //Create mock
    const compare1 = rewired.__get__('compare_1');
    const mock: sinon.SinonMock = sinon.mock(compare1);
    mock.expects("compare").once().withExactArgs(A, B);

    //Rewire and run method
    rewired.__with__({
      'compare_1.compare': compare1.compare
    })(() => rewired.max(A, B, true));

    //Verify method
    mock.verify();
  });
});
