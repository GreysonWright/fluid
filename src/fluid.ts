import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';
import { analyzer, executor, indexer, Preprocessor } from './core/core';
import * as configCreator from './core/config-creator';
import { FluidError } from './FluidError';
import { IFluidConfig } from './core/IFluidConfig';
import * as fluidregex from './core/fluid-regex';
import { FluidIndex } from './core/indexer/CFluidIndex';
import { FluidFunction } from './core/FluidFunction';

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

const getFluidConfig = (projectDirectory: string) => {
  const fluidConfigPath = path.join(projectDirectory, 'fluid.json');
  const fluidConfigContents = fs.readFileSync(fluidConfigPath, 'utf8');
  const fluidConfig: IFluidConfig = JSON.parse(fluidConfigContents);
  return fluidConfig;
};

const getFullExcludedPaths = (projectDirectory: string, excludedFiles: string[]) => {
  const fullPaths = excludedFiles.map((excludedFile) => path.join(projectDirectory, excludedFile));
  return fullPaths;
};

const getProcessedFiles = (fluidFiles: FluidIndex) => {
  const preprocessor = new Preprocessor();
  const processedFiles = preprocessor.processFiles(fluidFiles);
  return processedFiles;
};

const getFluidFunctionResults = (fluidFunctions: FluidFunction[], fileData: string, fileName: string) => {
  const fluidFunctionResults = fluidFunctions.map((fluidFunction) => {
    const fluidResults = executor.execute(fluidFunction, fileData, { referenceFilePath: fileName });
    return fluidResults;
  });
  return fluidFunctionResults;
};

const getOutputPath = (filePath: string, fluidConfig: IFluidConfig, projectDirectory: string) => {
  const srcPath = path.join(projectDirectory, fluidConfig.src_dir);
  const outPath = path.join(projectDirectory, fluidConfig.output_dir);
  const outputFilePath = filePath.replace(srcPath, outPath);
  return outputFilePath;
};

const writeFileData = (outputFilePath: string, modifiedFluidData: string) => {
  const parentDirectory = path.dirname(outputFilePath);
  if (!fs.existsSync(parentDirectory)) {
    fs.mkdirSync(parentDirectory, { recursive: true });
  }
  fs.writeFileSync(outputFilePath, modifiedFluidData);
};

export const build = (params: string[]) => {
  const projectDirectory = getProjectDirectory(params);
  const fluidConfig = getFluidConfig(projectDirectory);
  const sourceDirectory = path.join(projectDirectory, fluidConfig.src_dir);
  const fullExcludedPaths = getFullExcludedPaths(projectDirectory, fluidConfig.exclude);
  const { fluidFiles, nonFluidFiles } = indexer.indexAllFiles(sourceDirectory, fullExcludedPaths);
  const processedFiles = getProcessedFiles(fluidFiles);

  processedFiles.forEach((file) => {
    const fileData = fs.readFileSync(file.name, 'utf8');
    const fluidFunctions = analyzer.getFluidFunctions(fileData);
    const strippedFluidData = analyzer.stripFluidFunctions(fileData);
    const fluidFunctionResults = getFluidFunctionResults(fluidFunctions, fileData, file.name);
    const modifiedFluidData = strippedFluidData.replace(fluidregex.index, (_, index) => fluidFunctionResults[index]);
    const outputFilePath = getOutputPath(file.name, fluidConfig, projectDirectory);
    writeFileData(outputFilePath, modifiedFluidData);
  });

  nonFluidFiles.foreach((_, filePath) => {
    const fileData = fs.readFileSync(filePath, 'utf8');
    const outputFilePath = getOutputPath(filePath, fluidConfig, projectDirectory);
    writeFileData(outputFilePath, fileData);
  });
};

export const init = (params: string[]) => {
  const workingDirectory = getWorkingDirectory(params);
  configCreator.createConfig(workingDirectory);
};
