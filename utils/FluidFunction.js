class FluidFunction {
  constructor(tokenArray) {
    if (tokenArray.length > 1) {
      this.function = tokenArray[1];
      this.parameters = tokenArray.slice(2, tokenArray.length);
    } else {
      throw new Error(`Invalid fluid function '${tokenArray}'`);
    }
  }
}

module.exports = FluidFunction;
