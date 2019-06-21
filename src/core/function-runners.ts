import * as fs from 'fs';
import * as fluidRegex from './fluid-regex';
import { FluidFunction } from './FluidFunction';

export const inject = (fluidFunction: FluidFunction) => {
  const [ injecteeFilePath, injectorFilePath ] = fluidFunction.parameters;
  const injecteeFileData = fs.readFileSync(injectorFilePath, 'utf8');
  const injecterFileData = fs.readFileSync(injectorFilePath, 'utf8');
  const injectedFileData = injecteeFileData.replace(fluidRegex.fluidFunction, injecterFileData);
  fs.writeFileSync(injecteeFilePath, injectedFileData);
};

export const override = (fluidFunction: FluidFunction) => {
  throw new Error('Not implemented.')
};
