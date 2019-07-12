import * as fs from 'fs';
import * as path from 'path';
import { analyzer, executor, Preprocessor } from './base/core';
import * as configCreator from './base/config-manager/config-creator';
import { IFluidConfig } from './base/config-manager/IFluidConfig';
import { FluidIndex, indexer } from './base/indexer/core';
import { FileCache } from './base/file-cache/core';
import { ConfigReader } from './base/config-manager/core';

let fluidConfig: IFluidConfig;

const getWorkingDirectory = (params: string[]) => {
  const [specifiedDirectory] = params;
  const currentDirectory = process.cwd();
  return specifiedDirectory || currentDirectory;
};

const getFluidConfig = (workingDirectory: string) => {
  const configReader = new ConfigReader(workingDirectory);
  const config = configReader.getFluidConfig();
  return config;
};

const getProcessedFiles = (fluidFiles: FluidIndex) => {
  const preprocessor = new Preprocessor();
  const processedFiles = preprocessor.processFiles(fluidFiles);
  return processedFiles;
};

const getCorrectFileExtension = (filePath: string) => {
  const correctFileExtension = filePath.replace(/\.f(\S*)/, '.$1')
  return correctFileExtension;
};

const getOutputPath = (filePath: string, fluidConfig: IFluidConfig) => {
  const srcPath = fluidConfig.src_dir;
  const outPath = fluidConfig.output_dir;
  const outputFilePath = filePath.replace(srcPath, outPath);
  const correctedExtension = getCorrectFileExtension(outputFilePath);
  return correctedExtension;
};

const writeFileData = (filePath: string, modifiedFluidData: string) => {
  const outputFilePath = getOutputPath(filePath, fluidConfig);
  const parentDirectory = path.dirname(outputFilePath);
  if (!fs.existsSync(parentDirectory)) {
    fs.mkdirSync(parentDirectory, { recursive: true });
  }
  fs.writeFileSync(outputFilePath, modifiedFluidData);
};

export const build = (params: string[]) => {
  const workingDirectory = getWorkingDirectory(params);
  fluidConfig = getFluidConfig(workingDirectory);
  const { src_dir, exclude } = fluidConfig;
  const { fluidFiles, nonFluidFiles } = indexer.indexAllFiles(src_dir, exclude);
  const processedFiles = getProcessedFiles(fluidFiles);
  const fileCache = FileCache.shared();

  processedFiles.forEach((file) => {
    if (!fileCache.has(file.name)) {
      const fileData = fs.readFileSync(file.name, 'utf8');
      fileCache.set(file.name, fileData);
    }
    let fileData = fileCache.get(file.name)!;
    const fluidFunctions = analyzer.getFluidFunctions(fileData);
    fluidFunctions.forEach((fluidFunction) => {
      fileData = fileCache.get(file.name)!;
      const fluidResults = executor.execute(fluidFunction, fileData, { fluidFile: file, referenceFilePath: file.name });
      fileCache.set(file.name, fluidResults);
    })
    if (file.shouldOutput) {
      const modifiedFluidData = fileCache.get(file.name)!;
      writeFileData(file.name, modifiedFluidData);
    }
  });

  nonFluidFiles.foreach((_, filePath) => {
    const fileData = fs.readFileSync(filePath, 'utf8');
    writeFileData(filePath, fileData);
  });
};

export const init = (params: string[]) => {
  const workingDirectory = getWorkingDirectory(params);
  configCreator.createConfig(workingDirectory);
};
