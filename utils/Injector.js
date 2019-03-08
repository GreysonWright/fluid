const fileUtil = require('../utils/File.js');

const Injector = {
  inject: (sourceContents, filePath) => {
    const injecterFileContents = fileUtil.read(filePath);
    var injectedSourceContents = sourceContents.replace(/{{\s*@(.*)\s*'(.*)'\s*}}/, injecterFileContents);
    return injectedSourceContents;
  },
}

module.exports = Injector;
