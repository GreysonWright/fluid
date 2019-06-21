"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const FluidFunction_1 = require("./FluidFunction");
const fluidRegex = __importStar(require("./fluid-regex"));
const parseFluid = (regex, data, callback) => {
    let fluidTokens = regex.exec(data);
    const fluidFunctions = [];
    while (fluidTokens != null) {
        fluidTokens = fluidTokens.filter(token => token !== undefined);
        const fluidData = callback(fluidTokens);
        fluidFunctions.push(fluidData);
        fluidTokens = regex.exec(data);
    }
    return fluidFunctions;
};
exports.getAllFluidFunctions = (data) => {
    const fluidFunctions = parseFluid(fluidRegex.fluidFunction, data, (fluidTokens) => new FluidFunction_1.FluidFunction(fluidTokens));
    return fluidFunctions;
};
exports.getAllIncludedFileNames = (data) => {
    const filesNames = parseFluid(fluidRegex.fluidFile, data, ([, y]) => y);
    return filesNames;
};
//# sourceMappingURL=analyzer.js.map