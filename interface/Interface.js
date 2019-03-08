const Fluid = require('../core/Fluid');

const isInputValid = (args) => {
}

const getCommand = (commandArg) => {
  switch (commandArg) {
    case 'build':
      return Fluid.build;
    default:
    throw new Error(`Undefined command '${command}'`);
  }
};

const Interface = {
  interpret: (args) => {
    if (isInputValid(args)) {
      const commandArg = args[2]; // maybe just join args into string and use regex
      var command = getCommand(commandArg);
      // execute command and stuff
    }
  },
}

module.exports = Interface;
