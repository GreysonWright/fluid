import * as path from 'path';
import * as fluidRegex from '../fluid-regex';
import { FluidFunction } from '../analyzer/core';
import { FileCache } from '../file-cache/core';
import { IExecutorParameters } from './IExecutorParameters';

const resolveRelativePath = (relativePath: string, referenceFilePath: string) => {
  const enclosingDirectory = path.dirname(referenceFilePath);
  const fullPath = path.resolve(enclosingDirectory, relativePath);
  return fullPath;
};

export const exportModule = (fluidFunction: FluidFunction, fileData: string, { fluidFile }: IExecutorParameters) => {
  const modifiedFileData = fileData.replace(fluidRegex.fluidFunction, '');
  const finalFileData = modifiedFileData.trim();
  fluidFile.shouldOutput = true;
  return finalFileData;
};

export const inject = (fluidFunction: FluidFunction, injecteeFileData: string, { referenceFilePath }: IExecutorParameters) => {
  const [ injectorFilePath ] = fluidFunction.parameters;
  const injectorFullFilePath = resolveRelativePath(injectorFilePath, referenceFilePath);
  const fileCache = FileCache.shared();
  const injectorFileData = fileCache.get(injectorFullFilePath)!;
  const trimmedInjectorFileData = injectorFileData.trim();
  const injectedFileData = injecteeFileData.replace(fluidRegex.fluidFunction, trimmedInjectorFileData);
  return injectedFileData;
}
