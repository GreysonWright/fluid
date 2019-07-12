import { File } from './core';

export class Index<T extends File> {
  store: Map<string, T>;
  constructor() {
    this.store = new Map();
  }

  add(filePath: string, file: T) {
    this.store.set(filePath, file);
  }

  get(filePath: string) {
    const vlaue = this.store.get(filePath);
    return vlaue;
  }

  has(filePath: string) {
    const doesHaveFile = this.store.has(filePath);
    return doesHaveFile;
  }

  foreach(callback: (file: T, filePath: string) => void) {
    return this.store.forEach(callback);
  }
}