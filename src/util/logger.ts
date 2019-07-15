import * as chalk from 'chalk';

export const warn = (message: string) => {
  console.log(`${chalk.default.yellow.bold('warning:')} ${message}`);
}

export const error = (message: string) => {
  console.log(`${chalk.default.red.bold('error:')} ${message}`);
}

export const log = (message: string) => {
  console.log(message);
}
