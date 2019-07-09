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
  while (!doesContainFluidConfig(directory)) {
    if (directory === os.homedir()) {
      throw new FluidError('Could not find the project directory. Did you run fluid init?');
    }
    directory = path.dirname(directory);
  }
  return directory;
};

const getFullExcludedPaths = (projectDirectory: string, excludedFiles: string[]) => {
  const fullPaths = excludedFiles.map((excludedFile) => path.join(projectDirectory, excludedFile));
  return fullPaths;
};

const getOutputPath = (filePath: string, fluidConfig: IFluidConfig, projectDirectory: string) => {
  const srcPath = path.join(projectDirectory, fluidConfig.src_dir);
  const outPath = path.join(projectDirectory, fluidConfig.output_dir);
  const outputFilePath = filePath.replace(srcPath, outPath);
  return outputFilePath;
};

export const build = (params: string[]) => {
  const projectDirectory = getProjectDirectory(params);

  const fluidConfig = path.join(projectDirectory, 'fluid.json');
  const fluidConfigContents = fs.readFileSync(fluidConfig, 'utf8');
  const fluidConfigJSON: IFluidConfig = JSON.parse(fluidConfigContents);

  const sourceDirectory = path.join(projectDirectory, fluidConfigJSON.src_dir);

  const fullExcludedPaths = getFullExcludedPaths(projectDirectory, fluidConfigJSON.exclude);

  const { fluidFiles, nonFluidFiles } = indexer.indexAllFiles(sourceDirectory, fullExcludedPaths);
  const preprocessor = new Preprocessor();
  const processedFiles = preprocessor.processFiles(fluidFiles);

  processedFiles.forEach((file) => {
    const fileData = fs.readFileSync(file.name, 'utf8');
    const fluidFunctions = analyzer.getAllFluidFunctions(fileData);
    fluidFunctions.forEach((fluidFunction) => { // this stuff doesn't work right
      const fluidResults = executor.execute(fluidFunction, fileData, { referenceFilePath: file.name });
      const outputFilePath = getOutputPath(file.name, fluidConfigJSON, projectDirectory);
      const parentDirectory = path.dirname(outputFilePath);
      if (!fs.existsSync(parentDirectory)) {
        fs.mkdirSync(parentDirectory, { recursive: true });
        fs.writeFileSync(outputFilePath, fluidResults);
      }
    });
  });

  nonFluidFiles.foreach((_, filePath) => {
    const fileData = fs.readFileSync(filePath, 'utf8');
    const outputFilePath = getOutputPath(filePath, fluidConfigJSON, projectDirectory);
    const parentDirectory = path.dirname(outputFilePath);
    if (!fs.existsSync(parentDirectory)) {
      fs.mkdirSync(parentDirectory, { recursive: true });
      fs.writeFileSync(outputFilePath, fileData);
    }
  });
};

export const init = (params: string[]) => {
  const workingDirectory = getWorkingDirectory(params);
  configCreator.createConfig(workingDirectory);
};
