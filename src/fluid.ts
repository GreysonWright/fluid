import * as path from 'path';
import { analyzer, executor, indexer, Preprocessor } from './core/core';

const getWorkingDirectory = (params: string[]) => {
  const [passedDirectory] = params;
  const currentDirectory = process.cwd();
  return passedDirectory || currentDirectory;
};

export const build = (params: string[]) => {
  const workingDirectory = getWorkingDirectory(params);
  const fileIndex = indexer.getAllFluidFiles(workingDirectory);
  const preprocessor = new Preprocessor();
  const processedFiles = preprocessor.processFiles(fileIndex);
  processedFiles.forEach((file) => {
    const filePath = path.join(workingDirectory, file.name);
    const fluidFunctions = analyzer.getAllFluidFunctions(filePath);
    fluidFunctions.forEach((fluidFunction) => {
      executor.execute(fluidFunction);
    })
  });
};
