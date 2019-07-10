import * as path from 'path';
import * as fs from 'fs';
import { FluidFile, FluidIndex, NonFluidIndex, File } from './indexer-core';
import { IIndexerResults } from './IIndexerResults';
import { isFluidFile } from '../file-types';

const isFileExcluded = (filePath: string, excludedFiles: string[]) => {
  return excludedFiles.includes(filePath);
};

export const indexAllFiles = (directory: string, excludedFiles: string[]): IIndexerResults => {
  let files = fs.readdirSync(directory);
  const fluidFiles = new FluidIndex();
  const nonFluidFiles = new NonFluidIndex();
  while (files.length > 0) {
    const file = files.shift()!;
    const fullFilePath = path.join(directory, file);
    const fileStatus = fs.lstatSync(fullFilePath);
    if (!isFileExcluded(file, excludedFiles)) {
      if (fileStatus.isDirectory()) {
        const directoryContents = fs.readdirSync(fullFilePath);
        const fullPathContents = directoryContents.map((subFile) => path.join(file, subFile));
        files = files.concat(fullPathContents);
      } else if (isFluidFile(fullFilePath)) {
        const fluidFile = new FluidFile(fullFilePath);
        fluidFiles.add(fullFilePath, fluidFile);
      } else {
        const fileName = path.basename(fullFilePath);
        const file = new File(fileName);
        nonFluidFiles.add(fullFilePath, file);
      }
    }
  }
  return { fluidFiles, nonFluidFiles};
};
