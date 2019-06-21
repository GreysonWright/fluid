"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FluidFunction {
    constructor(tokens) {
        if (tokens.length < 1) {
            throw new Error(`Cannot construct FluidFunction from tokens ${tokens}`);
        }
        this.name = tokens[1];
        this.parameters = tokens.slice(2, tokens.length);
    }
}
exports.FluidFunction = FluidFunction;
//# sourceMappingURL=FluidFunction.js.map