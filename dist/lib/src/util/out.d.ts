export declare class Out {
    private prefix;
    constructor();
    group(name?: string): void;
    groupEnd(): void;
    private indent(str);
    private outdent(spaces);
    debug(...args: any[]): void;
    error(...args: any[]): void;
    info(...args: any[]): void;
    log(...args: any[]): void;
    warn(...args: any[]): void;
}
export declare const out: Out;
