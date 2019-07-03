import * as fs from 'fs';
import * as path from 'path';
import { FluidError } from '../FluidError';

export const readConfig = (projectDirectory: string) => {
  const configPath = path.join(projectDirectory, 'fluid.json');
  if (!fs.existsSync(configPath)) {
    throw new FluidError('Could not find fluid.json. Please run \'fluid init\'');
  }
  const configContents = fs.readFileSync(configPath, 'utf8');
  return configContents;
};
