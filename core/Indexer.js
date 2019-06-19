const path = require('path');
const fs = require('fs');
const FluidFile = require('../utils/FluidFile');

const fluidFileTypes = ['.fjson', '.fjs', '.fscss', '.fcss', '.fliquid'];

const isFluidFile = (fileName) => {
  const fileExtension = path.extname(fileName);
  const orReducer = (previousEvaluation, fileType) => {
    return previousEvaluation || fileExtension == fileType;
  };
  const isValidFluidFile = fluidFileTypes.reduce(orReducer, false);
  return isValidFluidFile;
};

const Indexer = {
  getAllFluidFiles: (directory) => {
    let files = fs.readdirSync(directory);
    const fluidFiles = new Map();
    while(files.length > 0) {
      const file = files.shift();
      const fullFilePath = path.join(directory, file);
      const fileStatus = fs.lstatSync(fullFilePath);
      if (isFluidFile(fullFilePath)) {
        const fluidFile = new FluidFile(file);
        fluidFiles.set(fullFilePath, fluidFile);
      } else if (fileStatus.isDirectory()) {
        const directoryContents = fs.readdirSync(fullFilePath);
        const scopedDirectoryContents = directoryContents.map(function(subFile) {
          return path.join(file, subFile);
        });
        files = files.concat(scopedDirectoryContents);
      }
    }
    return fluidFiles;
  },
};

module.exports = Indexer;
