import { FluidFunction } from "./FluidFunction";
import * as functionRunners from "./function-runners";
import { IExecutorParameters } from "./IExecutorParameters";
import { FluidError } from "../FluidError";

export const execute = (fluidFunction: FluidFunction, fileData: string, params: IExecutorParameters) => {
  switch (fluidFunction.name) {
    case'export-module':
      return functionRunners.declareModule(fluidFunction, fileData, params);
    case 'inject':
      return functionRunners.inject(fluidFunction, fileData, params);
    case 'override':
      return functionRunners.override(fluidFunction, fileData);
    default:
      throw new FluidError(`Unrecognized function '${fluidFunction.name}'`);
  }
};
