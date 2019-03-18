const File = require('../utils/File');
const Analyzer = require('./Analyzer');
const path = require('path');

let files = {};
let resolvedFiles = {};
let unResolvedFiles = {};
let seenFiles = {};

const isFileInMap = (filePath, map) => map.get(filePath) !== undefined;

const isFileUnresolved = filePath => isFileInMap(filePath, unResolvedFiles);

const isFileResolved = filePath => isFileInMap(filePath, resolvedFiles);;

const isCircularDependency = filePath => !isFileResolved(filePath) && isFileUnresolved(filePath);

const wasFileSeen = filePath => isFileInMap(filePath, seenFiles);

const getFileChildren = async filePath => {
  const fileData = await File.read(filePath);
  const fileChildren = Analyzer.getAllIncludedFiles(fileData);
  return fileChildren;
};

// const process = async filePath => {
//   const files = [filePath, -1];
//   let count = 0;
//   while (files.length > 0) {
//     let filePath = files.shift();
//     seenFiles.set(filePath, true);
//     unResolvedFiles.set(filePath, true);
//     let fileChildren = getFileChildren(filePath);
//     const parentDirectory = path.dirname(filePath);
//     const absoluteChildrenPaths = fileChildren.map(relativeChildPath => {
//       const absolutChildPath = path.resolve(parentDirectory, relativeChildPath)
//       return absolutChildPath;
//     });
//     absoluteChildrenPaths.forEach(absoluteChildPath => {
//       if (isCircularDependency(childFilePath)) {
//         throw new Error(`Circular reference not allowed. ${filePath} depends on ${childFilePath}`);
//       }
//       files.push(absoluteChildPath);
//     });
//     const fluidFile = availableFiles.get(filePath);
//     fluidFile.setChildren(absoluteChildrenPaths);
//   }
// };

const process = async (filePath) => {
  seenFiles.set(filePath, true);
  unResolvedFiles.set(filePath, true);
  const fileData = await File.read(filePath);
  const fileChildren = Analyzer.getAllIncludedFiles(fileData);
  const parentDirectory = path.dirname(filePath);
  const absoluteChildrenPaths = fileChildren.map(relativeChildPath => {
    const absolutChildPath = path.resolve(parentDirectory, relativeChildPath)
    return absolutChildPath;
  });
  const fluidFile = files.get(filePath);
  fluidFile.setChildren(absoluteChildrenPaths);
  // fluidFile.rank = absoluteChildrenPaths.map(async childFilePath => {
  //   if (isCircularDependency(childFilePath)) {
  //     throw new Error(`Circular reference not allowed. ${filePath} depends on ${childFilePath}`);
  //   }
  //   return await process(childFilePath);
  // }).reduce((left, right) => {left + right}, 1);

  let ranks = await Promise.all(absoluteChildrenPaths.map(childFilePath => {
    if (isCircularDependency(childFilePath)) {
      throw new Error(`Circular reference not allowed. ${filePath} depends on ${childFilePath}`);
    }
    return process(childFilePath);
  }));

  fluidFile.rank = ranks.reduce((left, right) => left + right, 1);

  resolvedFiles.set(filePath, true);
  unResolvedFiles.delete(filePath);
  return fluidFile.rank;
}

const Preprocessor = {
  processFiles: async (indexedFiles) => {
    files = indexedFiles;
    unResolvedFiles = new Map();
    resolvedFiles = new Map();
    seenFiles = new Map();
    for (let [key, _] of files) {
      if (!wasFileSeen(key)) {
        await process(key);
      }
    }

    return availableFiles;
  }
}

module.exports = Preprocessor;
