import * as path from 'path';
import * as fs from 'fs';
import { FluidFile } from './FluidFile';
import { Index } from './Index';

const fluidFileTypes = ['.fjson', '.fjs', '.fts', '.fcss', '.fcscc', '.fliquid', '.fhtml'];

const isFluidFile = (fileName: string) => {
  const fileExtension = path.extname(fileName);
  const isValidFluidFile = fluidFileTypes.reduce((previous: boolean, current: string) => previous || fileExtension == current, false);
  return isValidFluidFile;
};

export const getAllFluidFiles = (directory: string) => {
  let files = fs.readdirSync(directory);
  const fluidFiles = new Index();
  while (files.length > 0) {
    const file = files.shift()!;
    const fullFilePath = path.join(directory, file);
    const fileStatus = fs.lstatSync(fullFilePath);
    if (isFluidFile(fullFilePath)) {
      const fluidFile = new FluidFile(fullFilePath);
      fluidFiles.add(fullFilePath, fluidFile);
    } else if (fileStatus.isDirectory()) {
      const directoryContents = fs.readdirSync(fullFilePath);
      const fullPathContents = directoryContents.map((subFile) => path.join(file, subFile));
      files = files.concat(fullPathContents);
    }
  }
  return fluidFiles;
};
