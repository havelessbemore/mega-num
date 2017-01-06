export const MIN_BASE: number = 2;
export const MAX_BASE: number = 94906265; //2^26 < sqrt(Number.MAX_SAFE_INTEGER) < 2^27
export const DEFAULT_BASE: number = 94906264;
export const MAX_PRECISION: number = 4294967295; //2^32 - 1
export const CIPHER: ReadonlyArray<string> = Object.freeze([
  '0','1','2','3','4','5','6','7','8','9',
  'A','B','C','D','E','F','G','H','I','J',
  'K','L','M','N','O','P','Q','R','S','T',
  'U','V','W','X','Y','Z'
]);