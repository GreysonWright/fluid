import * as fs from 'fs';
import * as path from 'path';
import * as analyzer from '../analyzer/core';
import { FluidIndex, FluidFile } from '../indexer/core';
import { FluidError } from '../../FluidError';
import { isFluidFile } from '../file-types';

export class Preprocessor {
  private index: FluidIndex;
  private resolvedFiles: FluidIndex;

  constructor() {
    this.index = new FluidIndex();
    this.resolvedFiles = new FluidIndex();
  }

  private validateFilePaths(filePaths: string[]) {
    filePaths.forEach((filePath) => {
      if (!fs.existsSync(filePath) || !isFluidFile(filePath)) {
        throw new FluidError(`The file at '${filePath}' does not exist or is not a valid fluid file.`);
      }
    });
  }

  private getRanks(filePaths: string[]) {
    const childrenRanks: number[] = filePaths.map((filePath) => {
      const file = this.index.get(filePath)!;
      if (file.isCircluarDependency()) {
        throw new FluidError(`Circular reference not allowed in file '${filePath}'.`);
      }
      return this.process({ file, filePath });
    });
    const rank = childrenRanks.reduce((left, right) => left + right, 1);
    return rank;
  }

  private process({ file, filePath }: { file: FluidFile, filePath: string }) {
    this.resolvedFiles.add(filePath, file);
    file.wasSeen = true;
    file.isResolved = true;
    const fileData = fs.readFileSync(filePath, 'utf8');
    const fileChildren =  analyzer.getIncludedFileNames(fileData);
    const parentDirectory = path.dirname(filePath);
    const childrenAbsolutePaths = fileChildren.map(relativeChildPath => path.resolve(parentDirectory, relativeChildPath));
    this.validateFilePaths(childrenAbsolutePaths);
    file.children = childrenAbsolutePaths;
    file.rank = this.getRanks(childrenAbsolutePaths);
    return file.rank;
  }

  processFiles(index: FluidIndex) {
    this.index = index;
    index.foreach((file, filePath) => {
      if (!file.wasSeen) {
        this.process({ file, filePath });
      }
    });
    const rankedFiles = this.resolvedFiles.toRankedArray();
    return rankedFiles;
  }
}
