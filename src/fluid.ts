import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';
import { analyzer, executor, indexer, Preprocessor } from './core/core';
import * as configCreator from './core/config-creator';
import { FluidError } from './FluidError';
import { IFluidConfig } from './core/IFluidConfig';

const getWorkingDirectory = (params: string[]) => {
  const [specifiedDirectory] = params;
  const currentDirectory = process.cwd();
  return specifiedDirectory || currentDirectory;
};

const doesContainFluidConfig = (directory: string) => {
  const fluidConfigPath = path.join(directory, 'fluid.json');
  return fs.existsSync(fluidConfigPath);
};

const getProjectDirectory = (params: string[]) => {
  const workingDirectory = getWorkingDirectory(params);
  let directory = workingDirectory;
  while(!doesContainFluidConfig(directory)) {
    if (directory === os.homedir()) {
      throw new FluidError('Could not find the project directory. Did you run fluid init?');
    }
    directory = path.dirname(directory);
  }
  return directory;
};

export const build = (params: string[]) => {
  const projectDirectory = getProjectDirectory(params);
  const fluidConfig = path.join(projectDirectory, 'fluid.json');
  const fluidConfigContents = fs.readFileSync(fluidConfig, 'utf8');
  const fluidConfigJSON: IFluidConfig = JSON.parse(fluidConfigContents);
  // copy directory to output
  // pass copied files to functions
  const { fluidFiles, nonFluidFiles } = indexer.indexAllFiles(projectDirectory);
  const preprocessor = new Preprocessor();
  const processedFiles = preprocessor.processFiles(fluidFiles);
  processedFiles.forEach((file) => {
    const fileData = fs.readFileSync(file.name, 'utf8');
    const fluidFunctions = analyzer.getAllFluidFunctions(fileData);
    fluidFunctions.forEach((fluidFunction) => {
      const fluidResults = executor.execute(fluidFunction, fileData, { referenceFilePath: file.name });
      fs.writeFileSync(file.name, fluidResults);
    });
  });
};

export const init = (params: string[]) => {
  const workingDirectory = getWorkingDirectory(params);
  configCreator.createConfig(workingDirectory);
};
