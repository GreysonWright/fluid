"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Index {
    constructor() {
        this.store = new Map();
    }
    add(filePath, fluidFile) {
        this.store.set(filePath, fluidFile);
    }
    get(filePath) {
        const vlaue = this.store.get(filePath);
        return vlaue;
    }
    has(filePath) {
        const doesHaveFile = this.store.has(filePath);
        return doesHaveFile;
    }
    toRankedArray() {
        const array = this.toSortedArray((left, right) => left.rank - right.rank);
        return array;
    }
    toSortedArray(comparator) {
        const array = this.toArray();
        array.sort(comparator);
        return array;
    }
    toArray() {
        const array = [];
        this.foreach((fluidFile) => {
            array.push(fluidFile);
        });
        return array;
    }
    foreach(callback) {
        return this.store.forEach(callback);
    }
}
exports.Index = Index;
//# sourceMappingURL=Index.js.map