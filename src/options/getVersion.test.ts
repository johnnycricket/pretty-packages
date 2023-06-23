import { Options } from "./Options";
import { getVersion } from "./getVersion";

describe('test getVersion', () => {
    const mockOptions: Options = {
        includeVersion: true
    }

    beforeEach(() => {
        mockOptions.includeVersion = true;
    })

    test('getVersion should return string of package\'s version when option exists and dependency is provided', () => {
        const actual = getVersion(mockOptions, '^1.2.3');
        expect(actual).toBe('^1.2.3');
    })
    test('getVersion should return undefined if option is false', () => {
        mockOptions.includeVersion = false;
        const actual = getVersion(mockOptions, '^1.2.3');
        expect(actual).toBeFalsy();
    })
    test('getVersion should return undefined if version option not included', () => {
        delete mockOptions.includeVersion;
        const actual = getVersion(mockOptions, '^1.2.3');
        expect(actual).toBeFalsy();
    })
})