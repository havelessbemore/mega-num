import {assert} from 'chai';
import sinon = require('sinon');
import rewire = require('rewire');
import {Integer} from '../../src/integer';
import {toInteger} from '../../src/util/intUtils';
import {isEven} from '../../src/functional/isEven';
const rewired = rewire<IsEvenFunc>('../../src/functional/isEven');

interface IsEvenFunc {
  isEven: (A: Integer) => boolean;
}

describe('isEven', () => {
  it('should return true if number is even', () => {
    assert.equal(true, isEven(toInteger([], 0, false, 10)));
    assert.equal(true, isEven(toInteger([2], 1, false, 10)));
    assert.equal(true, isEven(toInteger([0,1], 2, false, 10)));
    assert.equal(true, isEven(toInteger([1,3,5,7], 4, false, 11)));
  });

  it('should return false if number is odd', () => {
    assert.equal(false, isEven(toInteger([1], 1, false, 10)));
    assert.equal(false, isEven(toInteger([3], 1, false, 10)));
    assert.equal(false, isEven(toInteger([1,1], 2, false, 10)));
    assert.equal(false, isEven(toInteger([1,3,5,7,9], 5, false, 11)));
  });

  it('should use isEven() correctly', () => {
    const A: Integer = toInteger([1,2], 2, true, 10);

    //Create mock
    const isEven1 = rewired.__get__('isEven_1');
    const mock: sinon.SinonMock = sinon.mock(isEven1);
    mock.expects("isEven").once().withExactArgs(A.digits, 0, A.precision, A.base);

    //Rewire and run method
    rewired.__with__({
      'isEven_1.isEven': isEven1.isEven
    })(() => rewired.isEven(A));

    //Verify method
    mock.verify();
  });
});
