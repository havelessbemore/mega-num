import {default as chalk} from 'chalk';

export class Out {
  private prefix: string;

  constructor(){
    this.prefix = "";
  }

  group(name = ""): void {
    this.log(chalk.bold(name));
    this.indent(" | ");
  }

  groupEnd(): void {
    this.outdent(3);
    this.log("-");
  }

  private indent(str: string): void {
    this.prefix = this.prefix + str;
  }

  private outdent(spaces: number): void {
    this.prefix = this.prefix.slice(0, -spaces);
  }

  // tslint:disable-next-line:no-any
  debug(...args: any[]): void {
    console.log.call(undefined, chalk.cyan.call(undefined, this.prefix, ...args));
  }

  // tslint:disable-next-line:no-any
  error(...args: any[]): void {
    console.error.call(undefined, chalk.red.call(undefined, this.prefix, ...args));
  }

  // tslint:disable-next-line:no-any
  info(...args: any[]): void {
    console.info.call(undefined, chalk.blue.call(undefined, this.prefix, ...args));
  }

  // tslint:disable-next-line:no-any
  log(...args: any[]): void {
    console.log.call(undefined, chalk.black.call(undefined, this.prefix, ...args));
  }

  // tslint:disable-next-line:no-any
  warn(...args: any[]): void {
    console.warn.call(undefined, chalk.yellow.call(undefined, this.prefix, ...args));
  }
}

export const out: Out = new Out();
