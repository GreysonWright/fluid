import { FluidFunction } from '../src/base/analyzer/core';

describe('FluidFunction', () => {
    beforeEach(() => {
        // setup code
    });

    it('init', () => {
      const name = 'func';
      const param1 = 'param1';
      const param2 = 'param2';
      const unParsed = `{{ ${name} ${param1} ${param2} }}`;
      const tokens = [unParsed, name, param1, param2];
      const fluidFunction = new FluidFunction(tokens);
      expect(fluidFunction.name).toBe(name);
      expect(fluidFunction.parameters.length).toBe(2);
      expect(fluidFunction.parameters[0]).toBe(param1);
      expect(fluidFunction.parameters[1]).toBe(param2);
    });

    it('init failure', () => {
      expect(() => new FluidFunction([])).toThrow();
    });

    afterEach(() => {
        // teardown code
    })
});
