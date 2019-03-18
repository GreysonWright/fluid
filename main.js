const Interface = require('./interface/Interface');

// Interface.interpret(process.argv);

const Indexer = require('./core/Indexer');
const files = Indexer.getAllFluidFiles('/Users/gwright/Desktop/some_proj');
console.log(files);

const File = require('./utils/File');
const Analyzer = require('./core/Analyzer');

const Preprocessor = require('./core/Preprocessor');

const stuff = async () => {
  const fileData = await File.read('/Users/gwright/Desktop/some_proj/test.fjs');
  const tokens = Analyzer.getAllIncludedFiles(fileData);
  console.log(tokens);

  const processedFiles = await Preprocessor.processFiles(files);
  console.log(processedFiles);
}

stuff();
