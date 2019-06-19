const Indexer = require('./core/Indexer');
const files = Indexer.getAllFluidFiles('/Users/gwright/Desktop/some_proj');
const Preprocessor = require('./core/Preprocessor');

const stuff = async () => {
  const processedFiles = await Preprocessor.processFiles(files);
  console.log(processedFiles);
}

stuff();
