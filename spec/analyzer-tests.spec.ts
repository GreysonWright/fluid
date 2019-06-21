import * as analyzer from '../src/analyzer';
import { FluidFunction } from '../src/FluidFunction';

describe('analyzer', () => {

    beforeEach(() => {
        // setup code
    });

    it('getAllFluidFunctions single param', () => {
      const func = `inject`;
      const param = 'asdf.txt';
      const data = `{{ @${ func } \'${ param }\' }}`;
      const [ fluidFunction ]  = analyzer.getAllFluidFunctions(data);
      expect(fluidFunction.name).toBe(func);
      expect(fluidFunction.parameters).toEqual([ param ]);
    });

    it('getAllFluidFunctions double param', () => {
      const func = `override`;
      const params = ['asdf.txt', 'jkl.txt'];
      const data = `{{ @${ func } \'${ params[0] }\' \'${params[1]}\' }}`;
      const [ fluidFunction ]  = analyzer.getAllFluidFunctions(data);
      expect(fluidFunction.name).toBe(func);
      expect(fluidFunction.parameters).toEqual(params);
    });

    it('getAllFluidFunctions invalid', () => {
      const func = `override`;
      const data = `{{ @${ func } }}`;
      const tokens = analyzer.getAllFluidFunctions(data);
      expect(tokens.length).toBe(0);
    });

    it('getAllIncludedFileNames valid', () => {
      const param = 'asdf.txt';
      const data = `{{ @inject \'${ param }\' }}`;
      const [ fileName ]  = analyzer.getAllIncludedFileNames(data);
      expect(fileName).toBe(param);
    });

    it('getAllIncludedFileNames invalid', () => {
      const data = `{{ @inject }}`;
      const fileNames = analyzer.getAllIncludedFileNames(data);
      expect(fileNames.length).toBe(0);
    });

    afterEach(() => {
        // teardown code
    })
});
