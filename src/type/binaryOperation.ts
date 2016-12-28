import Integer from '../type/integer';

interface BinaryOperation {
  (A: Integer, B: Integer): Integer;
}

export default BinaryOperation;
