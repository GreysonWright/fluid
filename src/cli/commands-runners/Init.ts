import { ICommandRunner } from './ICommandRunner';
import { createConfig } from '../../base/config-manager/core';

export class Init implements ICommandRunner {
  workingDirectory: string;
  constructor(workingDirectory: string) {
    this.workingDirectory = workingDirectory;
  }

  execute() {
    createConfig(this.workingDirectory);
  }

}