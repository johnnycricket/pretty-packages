import { Options } from "./Options";
import * as metadataRetriever from "../service/metadataRetriever";
import { getLicense } from "./getLicense";


describe('test getLicense', () => {
    const mockOptions: Options = {
        includeLicense: true
    }

    jest.spyOn(metadataRetriever, 'getPackageLicense').mockResolvedValueOnce('https://registry.npmjs.org/doot');
    jest.spyOn(metadataRetriever, 'getPackageLicense').mockRejectedValueOnce(`Error fetching license for package 'doot': sad trombone`)

    beforeEach(() => {
        mockOptions.includeLicense = true;
    })

    it('should be given truthy option and dependency name and return url string', async () => {
        await expect(getLicense(mockOptions, 'doot')).resolves.toBe('https://registry.npmjs.org/doot')
    })

    it('should be given truthy option and dependency name and return error message if get fails', async () => {
        await expect(getLicense(mockOptions, 'doot')).rejects.toBe(`Error fetching license for package 'doot': sad trombone`)
    })
})