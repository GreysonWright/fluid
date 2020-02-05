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
  const finalModifiedFileData = modifiedFileData.trimStart();
  fluidFile.shouldOutput = true;
  return finalModifiedFileData;
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

export const use = (fluidFunction: FluidFunction, injecteeFileData: string, { referenceFilePath }: IExecutorParameters) => {
  const [ templateFilePath, injectorFilePath ] = fluidFunction.parameters;
  const templateFullPath = resolveRelativePath(templateFilePath, referenceFilePath);
  const injectorFullFilePath = resolveRelativePath(injectorFilePath, referenceFilePath);
  const fileCache = FileCache.shared();
  const templateFileData = fileCache.get(templateFullPath)!.trim();
  const injectorFileData = fileCache.get(injectorFullFilePath)!.trim();
  const replacedTemplateData = templateFileData.replace(fluidRegex.fluidTemplateContentLiteral, injectorFileData);
  const trimmedInjectorFileData = injecteeFileData.trim();
  const injectedFileData = trimmedInjectorFileData.replace(fluidRegex.fluidFunction, replacedTemplateData);
  return injectedFileData;
}
