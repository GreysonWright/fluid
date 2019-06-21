import * as cli from './cli/cli';

export class Main {
  run() {
    const [,commandText, ...params] = ['fluid', 'build', '/Users/greyson/Desktop/someproj/']; // process.argv;
    const command = cli.interpret(commandText);
    command(params);
    return 1;
  }
}

const main = new Main();
main.run();
