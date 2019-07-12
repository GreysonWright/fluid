import * as fs from 'fs';
import * as path from 'path';
import { config } from './config-template';
import { FluidError } from '../../FluidError';

export const createConfig = (workingDirectory: string) => {
  const configString = JSON.stringify(config, null, 2);
  const configPath = path.join(workingDirectory, 'fluid.json');
  if (fs.existsSync(configPath)) {
    throw new FluidError('A fluid.json file already exists in this project.');
  }
  fs.writeFileSync(configPath, configString);
};
