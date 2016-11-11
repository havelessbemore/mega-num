abstract class BigNumber {

  ////////////////////////
  // CONSTANTS
  ////////////////////////

  public static get MIN_BASE(): number {return 2};
  public static get MAX_BASE(): number {return 94906265}; //2^26 < sqrt(Number.MAX_SAFE_INTEGER) < 2^27
  protected static get DEFAULT_BASE(): number {return 94906264};
  protected static get MAX_DIGITS(): number {return 4294967295}; //2^32 - 1

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
