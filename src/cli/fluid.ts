import { Build, Init } from './commands-runners/core';

const getWorkingDirectory = (params: string[]) => {
  const [specifiedDirectory] = params;
  const currentDirectory = process.cwd();
  return specifiedDirectory || currentDirectory;
};

export const build = (params: string[]) => {
  const workingDirectory = getWorkingDirectory(params);
  const buildCommand = new Build(workingDirectory);
  buildCommand.execute();
};

// remove this file and put getworkingdir in the command runner superclass.
export const init = (params: string[]) => {
  const workingDirectory = getWorkingDirectory(params);
  const initCommand = new Init(workingDirectory);
  initCommand.execute();
};
