const Commands = require('./Commands');

const Interpreter = {
  interpret: (fluidFunction) => {
    switch(fluidFunction.function) {
      case 'inject':
        return Commands.inject;
      case 'override':
        return Commands.override;
      default:
        throw new Error(`Unrecognized command '${commandText}'`);
      }
  },
}

module.exports = Interpreter;
