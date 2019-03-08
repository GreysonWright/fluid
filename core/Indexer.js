const path = require('path');
const fs = require('fs');

const fluidFileTypes = ['.fjson', '.fjs', '.fscss', '.fcss', '.fliquid'];

const isFluidFile = (fileName) => {
  const fileExtension = path.extname(fileName);
  const orReducer = (previousEvaluation, fileType) => {
    return previousEvaluation || fileExtension == fileType;
  };
  const isValidFluidFile = fluidFileTypes.reduce(orReducer, false);
  return isValidFluidFile;
};

const FileFinder = {
  getAllFluidFiles: (directory) => {
    let files = fs.readdirSync(directory);
    const fluidFiles = [];
    while(files.length > 0) {
      const file = files.shift();
      const fullFilePath = path.join(directory, file);
      const fileStatus = fs.lstatSync(fullFilePath);
      if (isFluidFile(fullFilePath)) {
        fluidFiles.push(fullFilePath);
      } else if (fileStatus.isDirectory()) {
        const directoryContents = fs.readdirSync(fullFilePath);
        const scopedDirectoryContents = directoryContents.map( function(subFile) {
          return path.join(file, subFile);
        });
        files = files.concat(scopedDirectoryContents);
      }
    }
    return fluidFiles;
  },
};

module.exports = FileFinder;
