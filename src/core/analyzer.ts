import { FluidFunction } from './FluidFunction';
import * as fluidRegex from './fluid-regex';

const parseFluid = (regex: RegExp, data: string, callback: Function) => {
  let fluidTokens: string[] = regex.exec(data)!;
  const fluidFunctions = [];
  while (fluidTokens != null) {
    fluidTokens = fluidTokens.filter(token => token !== undefined);
    const fluidData = callback(fluidTokens);
    fluidFunctions.push(fluidData);
    fluidTokens = regex.exec(data)!;
  }
  return fluidFunctions;
}

export const getAllFluidFunctions = (data: string): FluidFunction[] => {
  const fluidFunctions = parseFluid(fluidRegex.fluidFunction, data, (fluidTokens: []) => new FluidFunction(fluidTokens));
  return fluidFunctions;
};

export const getAllIncludedFileNames = (data: string): string[] => {
  const filesNames = parseFluid(fluidRegex.fluidFile, data, ([, y]: [string, string]) => y);
  return filesNames;
};
