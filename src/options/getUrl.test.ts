import { Options } from "./Options";
import { getUrl } from "./getUrl";

describe('test getUrl', () => {
    const mockOptions: Options = {
        includeUrl: true
    }

    beforeEach(() => {
        mockOptions.includeUrl = true;
    })

    it('should call getUrl with true option and dep name and return a url string', () => {
        const actual = getUrl(mockOptions, 'some-package');
        expect(actual).toEqual('https://www.npmjs.com/package/some-package');
    });

    it('should call getUrl with false option and return undefined', () => {
        mockOptions.includeUrl = false;

        const actual = getUrl(mockOptions, 'some-package')
        expect(actual).toBeFalsy();
    })
})