import * as path from 'path';
import * as fs from 'fs';
import { FluidFile, FluidIndex, NonFluidIndex, File } from './indexer-core';
import { IIndexerResults } from './IIndexerResults';

const fluidFileTypes = ['.fjson', '.fjs', '.fts', '.fcss', '.fcscc', '.fliquid', '.fhtml'];

const isFluidFile = (fileName: string) => {
  const fileExtension = path.extname(fileName);
  const isValidFluidFile = fluidFileTypes.reduce((previous: boolean, current: string) => previous || fileExtension == current, false);
  return isValidFluidFile;
};

export const indexAllFiles = (directory: string): IIndexerResults => {
  let files = fs.readdirSync(directory);
  const fluidFiles = new FluidIndex();
  const nonFluidFiles = new NonFluidIndex();
  while (files.length > 0) {
    const file = files.shift()!;
    const fullFilePath = path.join(directory, file);
    const fileStatus = fs.lstatSync(fullFilePath);
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
  return { fluidFiles, nonFluidFiles};
};
