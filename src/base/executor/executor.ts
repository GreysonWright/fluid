import { FluidFunction } from "../analyzer/FluidFunction";
import * as functionRunners from "./function-runners";
import { IExecutorParameters } from "./IExecutorParameters";
import { FluidError } from "../../FluidError";

export const execute = (fluidFunction: FluidFunction, fileData: string, params: IExecutorParameters) => {
  switch (fluidFunction.name) {
    case 'export-module':
      return functionRunners.exportModule(fluidFunction, fileData, params);
    case 'inject':
      return functionRunners.inject(fluidFunction, fileData, params);
    case 'use':
      return functionRunners.use(fluidFunction, fileData, params);
    default:
      throw new FluidError(`Unrecognized function '${fluidFunction.name}'`);
  }
};
