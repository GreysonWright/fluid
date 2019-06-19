const Indexer = require('./Indexer')
const File = require('../utils/File');
const Analyzer = require('./Analyzer');

const Fluid = {
  build: (projectDirectory) => {
    const fluidFiles = Indexer.getAllFluidFiles(projectDirectory);
  }
}

module.exports = Fluid;
