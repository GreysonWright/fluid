export class CommandRunner {
  workingDirectory: string;

  getWorkingDirectory(params: string[]) {
    const [specifiedDirectory] = params;
    const currentDirectory = process.cwd();
    return specifiedDirectory || currentDirectory;
  };

  constructor(params: string[]) {
    this.workingDirectory = this.getWorkingDirectory(params);
  }
}