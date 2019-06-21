import * as fs from 'fs';
import * as path from 'path';
import * as analyzer from './analyzer';
import { Index } from './Index';
import { FluidFile } from './FluidFile';

export class Preprocessor {
  private index: Index;
  private resolvedFiles: Index;

  constructor() {
    this.index = new Index();
    this.resolvedFiles = new Index();
  }

  processFiles(index: Index) {
    this.index = index;
    index.foreach((file, filePath) => {
      if (!file.wasSeen) {
        this.process({ file, filePath });
      }
    });
    const rankedFiles = this.resolvedFiles.toRankedArray();
    return rankedFiles;
  }

  private process({ file, filePath }: { file: FluidFile, filePath: string }) {
    this.resolvedFiles.add(filePath, file);
    file.wasSeen = true;
    file.isResolved = true;
    const fileData = fs.readFileSync(filePath, 'utf8');
    const fileChildren =  analyzer.getAllIncludedFileNames(fileData);
    const parentDirectory = path.dirname(filePath);
    const childrenAbsolutePaths = fileChildren.map(relativeChildPath => path.resolve(parentDirectory, relativeChildPath));
    file.children = childrenAbsolutePaths;
    file.rank = this.getRanks(childrenAbsolutePaths);
    return file.rank;
  }

  private getRanks(filePaths: string[]) {
    const childrenRanks: number[] = filePaths.map((filePath) => {
      const file = this.index.get(filePath)!;
      if (this.isCircularDependency(file)) {
        throw new Error(`Circular reference not allowed. ${ filePath } depends on ${ filePath }`);
      }
      return this.process({ file, filePath });
    })
    const rank = childrenRanks.reduce((left, right) => left + right + 1);
    return rank;
  }

  private isCircularDependency(file: FluidFile) {
    return !file.isResolved && file.isUnresolved;
  }
}
