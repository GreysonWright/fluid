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
const fs = __importStar(require("fs"));
const FluidFile_1 = require("./FluidFile");
const Index_1 = require("./Index");
const fluidFileTypes = ['.fjson', '.fjs', '.fts', '.fcss', '.fcscc', '.fliquid', '.fhtml'];
const isFluidFile = (fileName) => {
    const fileExtension = path.extname(fileName);
    const isValidFluidFile = fluidFileTypes.reduce((previous, current) => previous || fileExtension == current, false);
    return isValidFluidFile;
};
exports.getAllFluidFiles = (directory) => {
    let files = fs.readdirSync(directory);
    const fluidFiles = new Index_1.Index();
    while (files.length > 0) {
        const file = files.shift();
        const fullFilePath = path.join(directory, file);
        const fileStatus = fs.lstatSync(fullFilePath);
        if (isFluidFile(fullFilePath)) {
            const fluidFile = new FluidFile_1.FluidFile(fullFilePath);
            fluidFiles.add(fullFilePath, fluidFile);
        }
        else if (fileStatus.isDirectory()) {
            const directoryContents = fs.readdirSync(fullFilePath);
            const fullPathContents = directoryContents.map((subFile) => path.join(file, subFile));
            files = files.concat(fullPathContents);
        }
    }
    return fluidFiles;
};
//# sourceMappingURL=indexer.js.map