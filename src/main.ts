#!/usr/bin/env node
import * as cli from './cli/core';
import { logger } from './util/core';

export class Main {
  run() {
    try {
      const [,,commandText, ...params] = ['', '', 'build', '/Users/greyson/Desktop/someproj'];// process.argv;
      const command = cli.interpret(commandText);
      command(params);
      return 1;
    } catch (e) {
      if (e.name === 'FluidError') {
        logger.error(e.message);
      } else {
        throw e;
      }
    }
  }
}

const main = new Main();
main.run();
