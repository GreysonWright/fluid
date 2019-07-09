import * as cli from './cli/cli';

export class Main {
  run() {
    try {
      const [,commandText, ...params] = ['fluid', 'build', '/Users/greyson/Desktop/someproj 2/']; // process.argv;
      const command = cli.interpret(commandText);
      command(params);
      return 1;
    } catch (e) {
      if (e.name === 'FluidError') {
        console.error(e.message);
      } else {
        throw e;
      }
    }
  }
}

const main = new Main();
main.run();
