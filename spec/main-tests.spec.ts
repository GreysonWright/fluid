import { Main } from '../src/main';

describe('main', () => {
    let main: Main;

    beforeEach(() => {
        // setup code
        main = new Main();
    });

    it('run', () => {
        const exitCode = main.run();
        expect(exitCode).toBe(1);
    });

    afterEach(() => {
        // teardown code
    })
});
