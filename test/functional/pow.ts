import {assert, expect} from 'chai';
import {Integer} from '../../src/integer';
import {pow} from '../../src/functional/pow';
import {toInteger} from '../../src/util/intUtils';

describe('pow', function(){

  ////////////////////////
  // X^0 = 1
  ////////////////////////

  it('should return 0^0 in base 10', function(){
    const A: Integer = toInteger([], 0, false, 10);
    const B: Integer = toInteger([], 0, false, 10);
    const expected: Integer = toInteger([1], 1, false, 10);

    //Run method
    const actual: Integer = pow(A, B, true);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 1^0 in base 10', function(){
    const A: Integer = toInteger([1], 1, false, 10);
    const B: Integer = toInteger([], 0, false, 10);
    const expected: Integer = toInteger([1], 1, false, 10);

    //Run method
    const actual: Integer = pow(A, B, true);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 2^0 in base 10', function(){
    const A: Integer = toInteger([2], 1, false, 10);
    const B: Integer = toInteger([], 0, false, 10);
    const expected: Integer = toInteger([1], 1, false, 10);

    //Run method
    const actual: Integer = pow(A, B, true);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 1234^0 in base 10', function(){
    const A: Integer = toInteger([4,3,2,1], 4, false, 10);
    const B: Integer = toInteger([], 0, false, 10);
    const expected: Integer = toInteger([1], 1, false, 10);

    //Run method
    const actual: Integer = pow(A, B, true);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  ////////////////////////
  // 0^|X| = 0
  ////////////////////////

  it('should return 0^1 in base 10', function(){
    const A: Integer = toInteger([], 0, false, 10);
    const B: Integer = toInteger([1], 1, false, 10);
    const expected: Integer = toInteger([], 0, false, 10);

    //Run method
    const actual: Integer = pow(A, B, true);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 0^2 in base 10', function(){
    const A: Integer = toInteger([], 0, false, 10);
    const B: Integer = toInteger([2], 1, false, 10);
    const expected: Integer = toInteger([], 0, false, 10);

    //Run method
    const actual: Integer = pow(A, B, true);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 0^123 in base 10', function(){
    const A: Integer = toInteger([], 0, false, 10);
    const B: Integer = toInteger([3,2,1], 3, false, 10);
    const expected: Integer = toInteger([], 0, false, 10);

    //Run method
    const actual: Integer = pow(A, B, true);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  ////////////////////////
  // 0^-|X| = ERROR
  ////////////////////////

  it('should return 0^-1 in base 10', function(){
    const A: Integer = toInteger([], 0, false, 10);
    const B: Integer = toInteger([1], 1, true, 10);
    expect(function(){pow(A, B, true)}).to.throw(EvalError);
  });

  it('should return 0^-2 in base 10', function(){
    const A: Integer = toInteger([], 0, false, 10);
    const B: Integer = toInteger([2], 1, true, 10);
    expect(function(){pow(A, B, true)}).to.throw(EvalError);
  });

  it('should return 0^-123 in base 10', function(){
    const A: Integer = toInteger([], 0, false, 10);
    const B: Integer = toInteger([3,2,1], 3, true, 10);
    expect(function(){pow(A, B, true)}).to.throw(EvalError);
  });

  ////////////////////////
  // Y^-|X| = 0
  ////////////////////////

  it('should return 123^-1 in base 10', function(){
    const A: Integer = toInteger([3,2,1], 3, false, 10);
    const B: Integer = toInteger([1], 1, true, 10);
    const expected: Integer = toInteger([], 0, false, 10);

    //Run method
    const actual: Integer = pow(A, B, true);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 123^-2 in base 10', function(){
    const A: Integer = toInteger([3,2,1], 3, false, 10);
    const B: Integer = toInteger([2], 1, true, 10);
    const expected: Integer = toInteger([], 0, false, 10);

    //Run method
    const actual: Integer = pow(A, B, true);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 123^-123 in base 10', function(){
    const A: Integer = toInteger([3,2,1], 3, false, 10);
    const B: Integer = toInteger([3,2,1], 3, true, 10);
    const expected: Integer = toInteger([], 0, false, 10);

    //Run method
    const actual: Integer = pow(A, B, true);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  ////////////////////////
  // X^1 = X
  ////////////////////////

  it('should return 1^1 in base 10', function(){
    const A: Integer = toInteger([1], 1, false, 10);
    const B: Integer = toInteger([1], 1, false, 10);
    const expected: Integer = toInteger([1], 1, false, 10);

    //Run method
    const actual: Integer = pow(A, B, true);

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 2^1 in base 10', function(){
    const A: Integer = toInteger([2], 1, false, 10);
    const B: Integer = toInteger([1], 1, false, 10);
    const expected: Integer = toInteger([2], 1, false, 10);

    //Run method
    const actual: Integer = pow(A, B, true);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 3^1 in base 10', function(){
    const A: Integer = toInteger([3], 1, false, 10);
    const B: Integer = toInteger([1], 1, false, 10);
    const expected: Integer = toInteger([3], 1, false, 10);

    //Run method
    const actual: Integer = pow(A, B, true);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 1234^1 in base 10', function(){
    const A: Integer = toInteger([4,3,2,1], 4, false, 10);
    const B: Integer = toInteger([1], 1, false, 10);
    const expected: Integer = toInteger([4,3,2,1], 4, false, 10);

    //Run method
    const actual: Integer = pow(A, B, true);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  ////////////////////////
  // 1^X = 1
  ////////////////////////


  it('should return 1^2 in base 10', function(){
    const A: Integer = toInteger([1], 1, false, 10);
    const B: Integer = toInteger([2], 1, false, 10);
    const expected: Integer = toInteger([1], 1, false, 10);

    //Run method
    const actual: Integer = pow(A, B, true);

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 1^3 in base 10', function(){
    const A: Integer = toInteger([1], 1, false, 10);
    const B: Integer = toInteger([3], 1, false, 10);
    const expected: Integer = toInteger([1], 1, false, 10);

    //Run method
    const actual: Integer = pow(A, B, true);

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 1^1024 in base 10', function(){
    const A: Integer = toInteger([1], 1, false, 10);
    const B: Integer = toInteger([4,2,0,1], 4, false, 10);
    const expected: Integer = toInteger([1], 1, false, 10);

    //Run method
    const actual: Integer = pow(A, B, true);

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 1^1023 in base 10', function(){
    const A: Integer = toInteger([1], 1, false, 10);
    const B: Integer = toInteger([3,2,0,1], 4, false, 10);
    const expected: Integer = toInteger([1], 1, false, 10);

    //Run method
    const actual: Integer = pow(A, B, true);

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  ////////////////////////
  // |X|^Y
  ////////////////////////

  it('should return 2^2 in base 10', function(){
    const A: Integer = toInteger([2], 1, false, 10);
    const B: Integer = toInteger([2], 1, false, 10);
    const expected: Integer = toInteger([4], 1, false, 10);

    //Run method
    const actual: Integer = pow(A, B, true);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 4^2 in base 10', function(){
    const A: Integer = toInteger([4], 1, false, 10);
    const B: Integer = toInteger([2], 1, false, 10);
    const expected: Integer = toInteger([6,1], 2, false, 10);

    //Run method
    const actual: Integer = pow(A, B, true);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 2^63 in base 10', function(){
    const A: Integer = toInteger([2], 1, false, 10);
    const B: Integer = toInteger([3,6], 2, false, 10);
    const expected: Integer = toInteger([8,0,8,5,7,7,4,5,8,6,3,0,2,7,3,3,2,2,9], 19, false, 10);

    //Run method
    const actual: Integer = pow(A, B, true);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 2^64 in base 10', function(){
    const A: Integer = toInteger([2], 1, false, 10);
    const B: Integer = toInteger([4,6], 2, false, 10);
    const expected: Integer = toInteger([6,1,6,1,5,5,9,0,7,3,7,0,4,4,7,6,4,4,8,1], 20, false, 10);

    //Run method
    const actual: Integer = pow(A, B, true);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 9^2 in base 10', function(){
    const A: Integer = toInteger([9], 1, false, 10);
    const B: Integer = toInteger([2], 1, false, 10);
    const expected: Integer = toInteger([1,8], 2, false, 10);

    //Run method
    const actual: Integer = pow(A, B, true);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 9999999^2 in base 10000000', function(){
    const A: Integer = toInteger([9999999], 1, false, 10000000);
    const B: Integer = toInteger([2], 1, false, 10000000);
    const expected: Integer = toInteger([1,9999998], 2, false, 10000000);

    //Run method
    const actual: Integer = pow(A, B, true);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 456^123 in base 10', function(){
    const A: Integer = toInteger([6,5,4], 3, false, 10);
    const B: Integer = toInteger([3,2,1], 3, false, 10);
    const expected: Integer = toInteger([
      6,1,4,8,8,1,2,5,3,4,8,2,3,2,4,1,4,5,6,9,1,2,3,9,4,0,3,6,1,5,
      7,4,9,4,7,1,1,7,1,3,4,9,9,0,8,2,6,6,0,3,4,0,3,3,9,0,1,0,0,5,
      4,1,1,5,1,8,9,1,4,7,2,6,6,6,9,7,6,6,8,6,3,8,8,3,8,4,7,5,4,9,
      0,0,9,6,2,1,4,5,7,1,1,8,1,4,6,3,4,5,7,9,3,5,4,5,8,2,8,6,9,9,
      6,4,7,1,3,8,5,4,4,4,3,1,4,4,3,3,1,0,7,1,0,2,1,9,2,7,8,0,6,4,
      5,5,9,2,1,0,1,6,2,8,6,7,3,9,6,4,0,6,7,4,4,6,3,2,4,4,2,3,4,9,
      2,9,8,5,5,0,7,5,0,9,7,6,0,6,1,6,5,6,6,2,0,6,7,2,0,2,9,5,4,0,
      5,4,4,9,2,5,9,1,3,5,6,5,8,9,4,6,7,5,8,8,6,8,6,5,5,3,2,4,4,7,
      1,4,3,4,8,5,1,1,8,2,9,1,7,9,2,1,1,8,4,2,5,5,0,1,2,7,2,1,8,3,
      2,2,0,2,0,3,3,3,8,5,9,9,0,0,1,7,9,6,2,5,0,3,7,9,4,4,4,1,5,5,
      0,9,8,1,8,2,3,9,7,0,9,3,8,9,9,0,6,0,3,4,4,2,5,9,8,2,1,1
    ], 328, false, 10);

    //Run method
    const actual: Integer = pow(A, B, true);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return 456^123 in base 373', function(){
    const A: Integer = toInteger([83,1], 2, false, 373);
    const B: Integer = toInteger([123], 1, false, 373);
    const expected: Integer = toInteger([
      318,192,196,188,75,314,108,15,279,142,
      139,227,351,367,259,265,99,306,254,134,
      338,346,69,19,27,170,214,359,58,352,
      30,352,168,168,25,288,301,340,338,269,
      86,226,99,191,142,198,34,59,255,75,
      298,243,262,134,332,89,184,214,300,94,
      233,364,277,242,193,314,316,189,334,9,
      275,188,247,365,336,335,278,344,137,199,
      209,137,19,178,369,319,125,77,276,193,
      105,79,233,129,252,267,349,360,4,154,
      245,84,71,98,194,119,54,59,102,156,
      22,280,175,122,313,313,345,329,52,101,
      192,232,181,205,159,294,294,2
    ], 128, false, 373);

    //Run method
    const actual: Integer = pow(A, B, true);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  ////////////////////////
  // (-|X|)^Y
  ////////////////////////

  it('should return (-2)^2 in base 10', function(){
    const A: Integer = toInteger([2], 1, true, 10);
    const B: Integer = toInteger([2], 1, false, 10);
    const expected: Integer = toInteger([4], 1, false, 10);

    //Run method
    const actual: Integer = pow(A, B, true);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return (-2)^3 in base 10', function(){
    const A: Integer = toInteger([2], 1, true, 10);
    const B: Integer = toInteger([3], 1, false, 10);
    const expected: Integer = toInteger([8], 1, true, 10);

    //Run method
    const actual: Integer = pow(A, B, true);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return (-2)^63 in base 10', function(){
    const A: Integer = toInteger([2], 1, true, 10);
    const B: Integer = toInteger([3,6], 2, false, 10);
    const expected: Integer = toInteger([8,0,8,5,7,7,4,5,8,6,3,0,2,7,3,3,2,2,9], 19, true, 10);

    //Run method
    const actual: Integer = pow(A, B, true);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });

  it('should return (-2)^64 in base 10', function(){
    const A: Integer = toInteger([2], 1, true, 10);
    const B: Integer = toInteger([4,6], 2, false, 10);
    const expected: Integer = toInteger([6,1,6,1,5,5,9,0,7,3,7,0,4,4,7,6,4,4,8,1], 20, false, 10);

    //Run method
    const actual: Integer = pow(A, B, true);
    actual.digits.length = actual.precision;

    //Verify method
    assert.equal(actual, A);
    assert.deepEqual(actual, expected);
  });
  
});
