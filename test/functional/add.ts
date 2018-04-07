import {assert} from 'chai';
import sinon = require('sinon');
import rewire = require('rewire');
import {Integer} from '../../src/integer';
import {add} from '../../src/functional/add';
import {toInteger} from '../../src/util/intUtils';
const rewireAdd = rewire<AddFunc>('../../src/functional/add');

interface AddFunc {
  add: (A: Integer, B: Integer, m?: boolean) => Integer;
}

describe('add', () => {

  it('should double A if A === B', () => {
    const A: Integer = toInteger([2, 1], 2, false, 10);
    const expected: Integer = toInteger([4, 2], 2, false, 10);

    //Run method
    const actual: Integer = add(A, A);

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should use double() correctly', () => {
    const A: Integer = toInteger([2, 1], 2, false, 10);

    //Create mock
    const dependency = rewireAdd.__get__('double_1');
    const mock: sinon.SinonMock = sinon.mock(dependency);
    mock.expects("double").once().withExactArgs(A);

    //Rewire and run method
    rewireAdd.__with__({double_1: dependency})(() => rewireAdd.add(A, A));

    //Verify method
    mock.verify();
  });

  it('should return A if B = 0', () => {
    const A: Integer = toInteger([2, 1], 2, false, 10);
    const B: Integer = toInteger([], 0, false, 10);
    const expected: Integer = toInteger([2, 1], 2, false, 10);

    //Run method
    const actual: Integer = add(A, B);

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should copy B and set to original base if A = 0', () => {
    const A: Integer = toInteger([], 0, false, 12);
    const B: Integer = toInteger([2, 1], 2, false, 10);
    const expected: Integer = toInteger([0, 1], 2, false, 12);

    //Run method
    const actual: Integer = add(A, B);

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should subtract if signs of A and B differ', () => {
    const A: Integer = toInteger([3], 1, false, 10);
    const B: Integer = toInteger([1], 1, true, 10);
    const expected: Integer = toInteger([2], 1, false, 10);

    //Run method
    const actual: Integer = add(A, B);

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should use negate() and subtract() correctly if signs of A and B differ', () => {
    const A: Integer = toInteger([3], 1, false, 10);
    const B: Integer = toInteger([2], 1, true, 10);

    //Create mocks
    const negate = rewireAdd.__get__('negate_1');
    const negateMock: sinon.SinonMock = sinon.mock(negate);
    negateMock.expects('negate').twice().withExactArgs(A);

    const subtract = rewireAdd.__get__('subtract_1');
    const subtractMock: sinon.SinonMock = sinon.mock(subtract);
    subtractMock.expects("subtract").once().withExactArgs(A, B);

    //Rewire and run method
    rewireAdd.__with__({subtract_1: subtract})(() => rewireAdd.add(A, B, true));

    //Verify mocks
    negateMock.verify();
    subtractMock.verify();
  });

  it('should add A and B normally when A.length === B.length', () => {
    const A: Integer = toInteger([1,2,3], 3, false, 10);
    const B: Integer = toInteger([54,6], 2, false, 100);
    const expected: Integer = toInteger([5,7,9], 3, false, 10);

    //Run method
    const actual: Integer = add(A, B);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should add A and B normally when A.length > B.length', () => {
    const A: Integer = toInteger([1,2,3,4], 4, false, 10);
    const B: Integer = toInteger([54,6], 2, false, 100);
    const expected: Integer = toInteger([5,7,9,4], 4, false, 10);

    //Run method
    const actual: Integer = add(A, B);

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should use addition() correctly when A.length >= B.length', () => {
    const A: Integer = toInteger([1,2,3], 3, false, 10);
    const B: Integer = toInteger([54,6], 2, false, 100);
    const C: Integer = toInteger([21,3], 2, false, 100);

    //Create mocks
    const dependency = rewireAdd.__get__('addition_1');
    const mock: sinon.SinonMock = sinon.mock(dependency);
    mock.expects("addition").once().withExactArgs(
      C.digits, 0, C.precision, B.digits, 0, B.precision, B.base
    );

    //Rewire and run method
    rewireAdd.__with__({addition_1: dependency})(() => {
      try{
        rewireAdd.add(A, B);
      } catch(e){}
    });

    //Verify mocks
    mock.verify();
  });

  it('should reverse add A and B when A.length < B.length', () => {
    const A: Integer = toInteger([4,5], 2, false, 10);
    const B: Integer = toInteger([21,43], 2, false, 100);
    const expected: Integer = toInteger([5,7,3,4], 4, false, 10);

    //Run method
    const actual: Integer = add(A, B);

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should use reverseAddition() correctly when A.length < B.length', () => {
    const A: Integer = toInteger([4,5], 2, false, 10);
    const B: Integer = toInteger([21,43], 2, false, 100);
    const C: Integer = toInteger([54], 1, false, 100);
    C.digits.length = 3;

    //Create mocks
    const dependency = rewireAdd.__get__('reverseAddition_1');
    const mock: sinon.SinonMock = sinon.mock(dependency);
    mock.expects("reverseAddition").once().withExactArgs(
      C.digits, 0, C.precision, B.digits, 0, B.precision, B.base
    );

    //Rewire and run method
    rewireAdd.__with__({reverseAddition_1: dependency})(() => {
      try{
        rewireAdd.add(A, B, true);
      } catch(e){}
    });

    //Verify mocks
    mock.verify();
  });
});
