"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FluidFile {
    constructor(name = '', rank = 0) {
        this.name = name;
        this.rank = rank;
        this.wasSeen = false;
        this.isUnresolved = false;
        this.isResolved = false;
        this.children = [];
    }
}
exports.FluidFile = FluidFile;
//# sourceMappingURL=FluidFile.js.map