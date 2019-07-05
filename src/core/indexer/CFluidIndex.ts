import { FluidFile} from './indexer-core';
import { Index } from './CIndex';

export class FluidIndex extends Index<FluidFile> {
  toRankedArray() {
    const array = this.toSortedArray( (left, right) =>  left.rank - right.rank);
    return array;
  }

  toSortedArray(comparator: ( left: FluidFile, right: FluidFile ) => number) {
    const array = this.toArray();
    array.sort(comparator);
    return array;
  }

  toArray() {
    const array: FluidFile[] = [];
    this.foreach((fluidFile) => {
      array.push(fluidFile);
    });
    return array;
  }
}