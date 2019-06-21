"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fluid = __importStar(require("../fluid"));
exports.interpret = (command) => {
    switch (command) {
        case 'build':
            return fluid.build;
        default:
            throw new Error(`Unrecognized command '${command}'`);
    }
};
//# sourceMappingURL=interpreter.js.map