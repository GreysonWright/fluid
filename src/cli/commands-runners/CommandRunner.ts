export abstract class CommandRunner {
  workingDirectory: string;
  constructor(workingDirectory: string) {
    this.workingDirectory = workingDirectory;
  }
}