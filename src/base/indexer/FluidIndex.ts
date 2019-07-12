import { FluidFile} from './core';
import { Index } from './Index';

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