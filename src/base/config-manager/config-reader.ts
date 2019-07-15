import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { FluidError } from '../../FluidError';
import { IFluidConfig } from './IFluidConfig';

export class ConfigReader {
  projectDirectory: string;

  constructor(workingDirectory: string) {
    this.projectDirectory = this.getProjectDirectory(workingDirectory);
  }

  private doesContainFluidConfig = (directory: string) => {
    const fluidConfigPath = path.join(directory, 'fluid.json');
    return fs.existsSync(fluidConfigPath);
  }

  getProjectDirectory(workingDirectory: string) {
    let directory = workingDirectory;
    while (!this.doesContainFluidConfig(directory)) {
      if (directory === os.homedir()) {
        throw new FluidError('Could not find the project directory. Did you run \'fluid init\'?');
      }
      directory = path.dirname(directory);
    }
    return directory;
  }

  private getAbsolutePath(relativePath: string) {
    return path.join(this.projectDirectory, relativePath);
  }

  private readConfig() {
    const configPath = this.getAbsolutePath('fluid.json');
    if (!fs.existsSync(configPath)) {
      throw new FluidError('Could not find fluid.json. Please run \'fluid init\'');
    }
    const configContents = fs.readFileSync(configPath, 'utf8');
    return configContents;
  }

  private getAbsoluteConfig(config: IFluidConfig) {
    const { src_dir, output_dir, exclude } = config;
    const absoluteSrcDir = this.getAbsolutePath(src_dir);
    const absoluteOutputDir = this.getAbsolutePath(output_dir);
    const absoluteExclude = exclude.map(this.getAbsolutePath);

    const absoluteConfig: IFluidConfig = {
      src_dir: absoluteSrcDir,
      output_dir: absoluteOutputDir,
      exclude: absoluteExclude,
    }

    return absoluteConfig;
  }

  getFluidConfig() {
    const fluidConfigContents = this.readConfig();
    const relativeFluidConfig: IFluidConfig = JSON.parse(fluidConfigContents);
    const absoluteConfig = this.getAbsoluteConfig(relativeFluidConfig);
    return absoluteConfig;
  };
}
