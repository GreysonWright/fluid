import { ICommandRunner } from './ICommandRunner';
import { createConfig } from '../../base/config-manager/core';
import { CommandRunner } from './CommandRunner';

export class Init extends CommandRunner implements ICommandRunner {
  execute() {
    createConfig(this.workingDirectory);
  }
}