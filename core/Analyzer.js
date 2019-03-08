const Analyzer = {
  analyze: async (data) => {
    try {
      const fluidRegex = new RegExp(/{{\s*@(\S*)\s*'(.*)'\s*}}/g);
      const fluidTokens = fluidRegex.exec(data);
      return fluidTokens;
    } catch(e) {
      console.log(e);
    }
  },
}

module.exports = Analyzer;
