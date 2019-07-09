import { File } from './indexer-core';

export class FluidFile extends File {
  rank: number;
  wasSeen: boolean;
  isUnresolved: boolean;
  isResolved: boolean;
  shouldOutput: boolean;

  constructor(name = '', rank = 0) {
    super(name);
    this.rank = rank;
    this.wasSeen = false;
    this.isUnresolved = false;
    this.isResolved = false;
    this.shouldOutput = true;
  }

  isCircluarDependency() {
    return !this.isResolved && this.isUnresolved;
  }
}