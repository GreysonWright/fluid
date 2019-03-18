const FluidFunction = require('../utils/FluidFunction');

const Analyzer = {
  analyzeFileData: (data) => {
    try {
      const fluidRegex = /{{\s*@(\S*)\s*(\S*)?\s*'(\S*)'\s*}}/g;
      let fluidTokens = fluidRegex.exec(data);
      fluidFunctions = [];
      while (fluidTokens != null) {
        const fluidFunction = new FluidFunction(fluidTokens);
        fluidFunctions.push(fluidFunction);
        fluidTokens = fluidRegex.exec(data);
      }
      return fluidFunctions;
    } catch(e) {
      console.log(e);
    }
  },
  getAllIncludedFiles: (data) => {
    try {
      const fluidRegex = /{{\s*@\S.*'(\S*)'\s*}}/g;
      let fluidTokens = fluidRegex.exec(data);
      fluidFiles = [];
      while (fluidTokens != null) {
        const fluidFile = fluidTokens[1];
        fluidFiles.push(fluidFile);
        fluidTokens = fluidRegex.exec(data);
      }
      return fluidFiles;
    } catch(e) {
      console.log(e);
    }
  },
}

module.exports = Analyzer;
