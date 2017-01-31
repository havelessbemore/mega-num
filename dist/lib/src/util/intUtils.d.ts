import { Integer } from '../integer';
export declare function assign(target: any, source: Integer): Integer;
export declare function copy(target: any, source: Integer): Integer;
export declare function setOne(A: any): Integer;
export declare function setZero(A: any): Integer;
export declare function tryMutable(A: Integer, isMutable?: boolean): Integer;
export declare function toInteger(digits: number[], precision: number, isNegative: boolean, base: number): Integer;
