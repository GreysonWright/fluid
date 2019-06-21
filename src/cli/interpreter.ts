import * as fluid from '../fluid';

export const interpret = (command: string) => {
  switch (command) {
    case 'build':
      return fluid.build;
    default:
      throw new Error(`Unrecognized command '${ command }'`);
  }
};
