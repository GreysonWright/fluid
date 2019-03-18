const Injector = require('../utils/Injector');

const Commands = {
  inject: (sourceContents, fluidFunction) => {
    const injecteeFilePath = fluidFunction.parameters[0];
    const injectedSourceContents = Injector.inject(sourceContents, injecteeFilePath);
    return injectedSourceContents;
  },
  override: (sourceContents, tokens) => {
  },
}

module.exports = Commands;
