import * as fs from 'fs';
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
    const fileData = fs.readFileSync(file.name, 'utf8');
    const fluidFunctions = analyzer.getAllFluidFunctions(fileData);
    fluidFunctions.forEach((fluidFunction) => {
      const completeData = executor.execute(fluidFunction, fileData, { referenceFilePath: file.name });
      fs.writeFileSync(file.name, completeData);
    });
  });
};
