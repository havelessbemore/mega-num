import {assert} from 'chai';
import sinon = require('sinon');
import rewire = require('rewire');
import {Integer} from '../../src/integer';
import {toInteger} from '../../src/util/intUtils';
import {min} from '../../src/functional/min';
const rewired = rewire<MinFunc>('../../src/functional/min');

interface MinFunc {
  min: (A: Integer, B: Integer, b?: boolean) => Integer;
}

describe('min', function(){
  it('should return A as min', function(){
    const A: Integer = toInteger([6,7,8], 3, false, 10);
    const B: Integer = toInteger([1,2,3,4,5], 5, false, 125);
    const C: Integer = min(A, B);
    assert.equal(A, C);
  });

  it('should return B as min', function(){
    const A: Integer = toInteger([3,4], 2, false, 10);
    const B: Integer = toInteger([1,2], 2, false, 10);
    const C: Integer = min(A, B);
    assert.equal(B, C);
  });

  it('should use compare() to find min', function(){
    const A: Integer = toInteger([1,2], 2, false, 10);
    const B: Integer = toInteger([3,4], 2, false, 10);

    //Create mock
    const dependency = rewired.__get__('compare_1');
    const mock: sinon.SinonMock = sinon.mock(dependency);
    mock.expects("compare").once().withExactArgs(A, B);

    //Rewire and run method
    rewired.__with__({compare_1: dependency})(() => rewired.min(A, B, true));

    //Verify method
    mock.verify();
  });
});
