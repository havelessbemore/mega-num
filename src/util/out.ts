import chalk = require('chalk');

export class Out {
  private prefix: string;

  constructor(){
    this.prefix = "";
  }

  public group(name: string = ""): void {
    this.log(chalk.bold(name));
    this.indent(" | ");
  }

  public groupEnd(): void {
    this.outdent(3);
    this.log("-");
  }

  private indent(str: string): void {
    this.prefix = this.prefix + str;
  }

  private outdent(spaces: number): void {
    this.prefix = this.prefix.slice(0, -spaces);
  }

  public debug(...args: any[]): void {
    console.log.call(undefined, chalk.cyan.call(undefined, this.prefix, ...args));
  }

  public error(...args: any[]): void {
    console.error.call(undefined, chalk.red.call(undefined, this.prefix, ...args));
  }

  public info(...args: any[]): void {
    console.info.call(undefined, chalk.blue.call(undefined, this.prefix, ...args));
  }

  public log(...args: any[]): void {
    console.log.call(undefined, chalk.black.call(undefined, this.prefix, ...args));
  }

  public warn(...args: any[]): void {
    console.warn.call(undefined, chalk.yellow.call(undefined, this.prefix, ...args));
  }
}

export const out: Out = new Out();
