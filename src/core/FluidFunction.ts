import { FluidError } from "../FluidError";

export class FluidFunction {
  name: string;
  parameters: string[];

  constructor(tokens: string[]) {
    if (tokens.length < 1) {
      throw new FluidError(`Cannot construct FluidFunction from tokens ${tokens}`);
    }
    this.name = tokens[1];
    this.parameters = tokens.slice(2, tokens.length);
  }
}
