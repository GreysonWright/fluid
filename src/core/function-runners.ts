import * as fs from 'fs';
import * as path from 'path';
import * as fluidRegex from './fluid-regex';
import { FluidFunction } from './FluidFunction';

const resolveRelativePath = (relativePath: string, referenceFilePath: string) => {
  const enclosingDirectory = path.dirname(referenceFilePath);
  const fullPath = path.resolve(enclosingDirectory, relativePath);
  return fullPath;
};

export const inject = (fluidFunction: FluidFunction, injecteeFileData: string, { referenceFilePath }: { referenceFilePath: string }) => {
  const [ injectorFilePath ] = fluidFunction.parameters;
  const injectFullFilePath = resolveRelativePath(injectorFilePath, referenceFilePath);
  const injecterFileData = fs.readFileSync(injectFullFilePath, 'utf8');
  const injectedFileData = injecteeFileData.replace(fluidRegex.fluidFunction, injecterFileData);
  return injectedFileData;
};

export const override = (fluidFunction: FluidFunction, injecteeFileData: string) => {
  throw new Error('Not implemented.')
};
