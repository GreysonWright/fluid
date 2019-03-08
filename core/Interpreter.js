const Commands = require('./Commands');

const Interpreter = {
  interpret: (tokens) => {
    const commandText = tokens[1];
    switch(commandText) {
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
