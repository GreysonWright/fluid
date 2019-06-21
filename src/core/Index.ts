import { FluidFile } from "./FluidFile";

export class Index {
  private store: Map<string, FluidFile>;
  constructor() {
    this.store = new Map();
  }

  add(filePath: string, fluidFile: FluidFile) {
    this.store.set(filePath, fluidFile);
  }

  get(filePath: string) {
    const vlaue = this.store.get(filePath);
    return vlaue;
  }

  has(filePath: string) {
    const doesHaveFile = this.store.has(filePath);
    return doesHaveFile;
  }

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

  foreach(callback: (fluidFile: FluidFile, filePath: string) => void) {
    return this.store.forEach(callback);
  }
}