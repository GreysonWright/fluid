const Injector = require('../utils/Injector');

const Commands = {
  inject: (sourceContents, tokens) => {
    const injecteeFilePath = tokens[2];
    var injectedSourceContents = Injector.inject(sourceContents, injecteeFilePath);
    return injectedSourceContents;
  },
  override: (sourceContents, tokens) => {
  },
}

module.exports = Commands;
