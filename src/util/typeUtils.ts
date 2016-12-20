////////////////////////
// TYPE GUARDS
////////////////////////

export function isNumber(n: any): n is number {
  return typeof n === "number";
}

export function isString(s: any): s is string {
  return typeof s === "string";
}
