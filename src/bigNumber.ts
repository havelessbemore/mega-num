abstract class BigNumber {

  ////////////////////////
  // CONSTANTS
  ////////////////////////

  public static get MIN_BASE(): number {return 2}
  protected static DECIMAL_BASE: number = 10000000; //2^23 < 10^7 < 2^24
  protected static BINARY_BASE: number = 67108864; //2^26
  public static get MAX_BASE(): number {return 94906265} //2^26 < sqrt(Number.MAX_SAFE_INTEGER) < 2^27
  protected static DEFAULT_BASE: number = BigNumber.BINARY_BASE;

  ////////////////////////
  // PROPERTIES
  ////////////////////////

  protected base: number;

  ////////////////////////
  // CONSTRUCTOR
  ////////////////////////

  constructor(){
  }

  ////////////////////////
  // BASE
  ////////////////////////

  public getBase(): number {
    return this.base;
  }
}

export default BigNumber;
