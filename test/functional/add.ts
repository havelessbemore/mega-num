import {assert} from 'chai';
import sinon = require('sinon');
import rewire = require('rewire');
import {Integer} from '../../src/integer';
import {add} from '../../src/functional/add';
import {toInteger} from '../../src/util/intUtils';
const rewireAdd: AddFunc & rewire.Rewire = rewire<AddFunc>('../../src/functional/add');

interface AddFunc {
  add: (A: Integer, B: Integer, m?: boolean) => Integer;
}

describe('add', function(){

  it('should double A if A === B', function(){
    const A: Integer = toInteger([2, 1], 2, false, 10);
    const expected: Integer = toInteger([4, 2], 2, false, 10);

    //Run method
    const actual: Integer = add(A, A, true);

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should use double() if A === B', function(){
    const A: Integer = toInteger([2, 1], 2, false, 10);

    //Create mock
    const double = rewireAdd.__get__('double_1');
    const doubleMock: Sinon.SinonMock = sinon.mock(double);
    doubleMock.expects("double").once().withExactArgs(A, true);

    //Rewire and run method
    rewireAdd.__with__({double_1: double})(() => rewireAdd.add(A, A, true));

    //Verify method
    doubleMock.verify();
  });

  it('should return A if B = 0', function(){
    const A: Integer = toInteger([2, 1], 2, false, 10);
    const B: Integer = toInteger([], 0, false, 10);
    const expected: Integer = toInteger([2, 1], 2, false, 10);

    //Run method
    const actual: Integer = add(A, B, true);

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should copy B and set to original base if A = 0', function(){
    const A: Integer = toInteger([], 0, false, 12);
    const B: Integer = toInteger([2, 1], 2, false, 10);
    const expected: Integer = toInteger([0, 1], 2, false, 12);

    //Run method
    const actual: Integer = add(A, B, true);

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should subtract if signs of A and B differ', function(){
    const A: Integer = toInteger([3], 1, false, 10);
    const B: Integer = toInteger([1], 1, true, 10);
    const expected: Integer = toInteger([2], 1, false, 10);

    //Run method
    const actual: Integer = add(A, B, true);

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should use subtract() if signs of A and B differ', function(){
    const A: Integer = toInteger([3], 1, false, 10);
    const B: Integer = toInteger([2], 1, true, 10);

    //Create mock
    const subtract = rewireAdd.__get__('subtract_1');
    const subtractMock: Sinon.SinonMock = sinon.mock(subtract);
    //subtractMock.expects("subtract").once().withExactArgs(A, B, true);

    //Rewire and run method
    rewireAdd.__with__({subtract_1: subtract})(() => rewireAdd.add(A, B, true));

    //Verify method
    subtractMock.verify();
  });
});
