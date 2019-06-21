"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const core_1 = require("./core/core");
const getWorkingDirectory = (params) => {
    const [passedDirectory] = params;
    const currentDirectory = process.cwd();
    return passedDirectory || currentDirectory;
};
exports.build = (params) => {
    const workingDirectory = getWorkingDirectory(params);
    const fileIndex = core_1.indexer.getAllFluidFiles(workingDirectory);
    const preprocessor = new core_1.Preprocessor();
    const processedFiles = preprocessor.processFiles(fileIndex);
    processedFiles.forEach((file) => {
        const filePath = path.join(workingDirectory, file.name);
        const fluidFunctions = core_1.analyzer.getAllFluidFunctions(filePath);
        fluidFunctions.forEach((fluidFunction) => {
            core_1.executor.execute(fluidFunction);
        });
    });
};
//# sourceMappingURL=fluid.js.map