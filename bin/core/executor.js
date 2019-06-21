"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const functionRunners = __importStar(require("./function-runners"));
exports.execute = (fluidFunction) => {
    switch (fluidFunction.name) {
        case 'inject':
            return functionRunners.inject(fluidFunction);
        case 'override':
            return functionRunners.override(fluidFunction);
        default:
            throw new Error(`Unrecognized command '${fluidFunction.name}'`);
    }
};
//# sourceMappingURL=executor.js.map