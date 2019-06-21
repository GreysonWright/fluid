import { FluidFunction } from "./FluidFunction";
import * as functionRunners from "./function-runners";

export const execute = (fluidFunction: FluidFunction, fileData: string, params: any) => {
  switch (fluidFunction.name) {
    case 'inject':
      return functionRunners.inject(fluidFunction, fileData, params);
    case 'override':
      return functionRunners.override(fluidFunction, fileData);
    default:
      throw new Error(`Unrecognized command '${fluidFunction.name}'`);
  }
};
