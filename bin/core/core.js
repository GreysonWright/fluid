"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const analyzer = __importStar(require("./analyzer"));
exports.analyzer = analyzer;
const indexer = __importStar(require("./indexer"));
exports.indexer = indexer;
const executor = __importStar(require("./executor"));
exports.executor = executor;
const Preprocessor_1 = require("./Preprocessor");
exports.Preprocessor = Preprocessor_1.Preprocessor;
//# sourceMappingURL=core.js.map