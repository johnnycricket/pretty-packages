import { filterEmpty } from "./filterEmpty";

describe('test filterEmpty', () => {
    test('filterEmpty should return string if given one', () => {
        const actual = filterEmpty('boop');
        
        expect(actual).toBeTruthy();
    });
    test('filterEmpty should not return if given undefined', () => {
        const actual = filterEmpty(undefined);

        expect(actual).toBeFalsy();
    });
})
