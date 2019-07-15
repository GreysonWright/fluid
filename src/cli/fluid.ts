import { Build, Init } from './commands-runners/core';

export const build = (params: string[]) => {
  const buildCommand = new Build(params);
  buildCommand.execute();
};

export const init = (params: string[]) => {
  const initCommand = new Init(params);
  initCommand.execute();
};
