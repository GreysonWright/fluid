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
const fluidRegex = __importStar(require("./fluid-regex"));
exports.inject = (fluidFunction) => {
    const [injecteeFilePath, injectorFilePath] = fluidFunction.parameters;
    const injecteeFileData = fs.readFileSync(injectorFilePath, 'utf8');
    const injecterFileData = fs.readFileSync(injectorFilePath, 'utf8');
    const injectedFileData = injecteeFileData.replace(fluidRegex.fluidFunction, injecterFileData);
    fs.writeFileSync(injecteeFilePath, injectedFileData);
};
exports.override = (fluidFunction) => {
    throw new Error('Not implemented.');
};
//# sourceMappingURL=function-runners.js.map