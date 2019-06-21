import { FluidFunction } from "./FluidFunction";
import * as functionRunners from "./function-runners";

export const execute = (fluidFunction: FluidFunction) => {
  switch (fluidFunction.name) {
    case 'inject':
      return functionRunners.inject(fluidFunction);
    case 'override':
      return functionRunners.override(fluidFunction);
    default:
      throw new Error(`Unrecognized command '${fluidFunction.name}'`);
  }
};
