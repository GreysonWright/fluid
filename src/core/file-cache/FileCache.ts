export class FileCache {
  private static sharedInstance: FileCache;
  private store: Map<string, string>;

  constructor() {
    this.store = new Map<string, string>();
  }

  static shared() {
    if (this.sharedInstance === undefined) {
      this.sharedInstance = new FileCache();
    }
    return this.sharedInstance
  }

  get(filePath: string) {
    return this.store.get(filePath);
  }

  set(filePath: string, fileData: string) {
    return this.store.set(filePath, fileData);
  }

  has(filePath: string) {
    return this.store.has(filePath);
  }
}
