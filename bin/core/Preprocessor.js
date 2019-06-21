"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const analyzer = __importStar(require("./analyzer"));
const Index_1 = require("./Index");
class Preprocessor {
    constructor() {
        this.index = new Index_1.Index();
        this.resolvedFiles = new Index_1.Index();
    }
    processFiles(index) {
        this.index = index;
        index.foreach((file, filePath) => {
            if (!file.wasSeen) {
                this.process({ file, filePath });
            }
        });
        const rankedFiles = this.resolvedFiles.toRankedArray();
        return rankedFiles;
    }
    process({ file, filePath }) {
        this.resolvedFiles.add(filePath, file);
        file.wasSeen = true;
        file.isResolved = true;
        const fileData = fs.readFileSync(filePath, 'utf8');
        const fileChildren = analyzer.getAllIncludedFileNames(fileData);
        const parentDirectory = path.dirname(filePath);
        const childrenAbsolutePaths = fileChildren.map(relativeChildPath => path.resolve(parentDirectory, relativeChildPath));
        file.children = childrenAbsolutePaths;
        file.rank = this.getRanks(childrenAbsolutePaths);
        return file.rank;
    }
    getRanks(filePaths) {
        const childrenRanks = filePaths.map((filePath) => {
            const file = this.index.get(filePath);
            if (this.isCircularDependency(file)) {
                throw new Error(`Circular reference not allowed. ${filePath} depends on ${filePath}`);
            }
            return this.process({ file, filePath });
        });
        const rank = childrenRanks.reduce((left, right) => left + right + 1);
        return rank;
    }
    isCircularDependency(file) {
        return !file.isResolved && file.isUnresolved;
    }
}
exports.Preprocessor = Preprocessor;
//# sourceMappingURL=Preprocessor.js.map