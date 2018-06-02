// tslint:disable-next-line:no-namespace
export namespace Globals {
  export const MIN_BASE = 2;
  export const MAX_BASE = 94906265; //2^26 < sqrt(Number.MAX_SAFE_INTEGER) < 2^27
  export const MAX_PRECISION = 4294967295; //2^32 - 1

  export let DEFAULT_BASE = 67108864; // 2^26
  export let CIPHER: ReadonlyArray<string> = Object.freeze([
    '0','1','2','3','4','5','6','7','8','9',
    'A','B','C','D','E','F','G','H','I','J',
    'K','L','M','N','O','P','Q','R','S','T',
    'U','V','W','X','Y','Z'
  ]);
}
