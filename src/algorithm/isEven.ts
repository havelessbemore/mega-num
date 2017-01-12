export function isEven(
  A: ReadonlyArray<number>, minA: number, maxA: number, base: number
): boolean {

  //If zero
  if(minA === maxA){
    return true;
  }

  //If even base
  if((base & 1) === 0){
    return (A[minA] & 1) === 0;
  }

  //If odd base
  let xor: number = 0;
  do {
    xor = xor ^ A[minA++];
  } while(minA < maxA);
  return (xor & 1) === 0;
}
