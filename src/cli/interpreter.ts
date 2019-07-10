import * as fluid from '../fluid';
import { FluidError } from '../FluidError';

export const interpret = (command: string) => {
  switch (command) {
    case 'build':
      return fluid.build;
    case 'init':
      return fluid.init;
    default:
      throw new FluidError(`Unrecognized command '${ command }'`);
  }
};
