jest.mock('axios');

// eslint-disable-next-line import/first
import { getPackageLicense } from "./metadataRetriever";

describe('test metadataRetriever', () => {
    describe('test getPackageLicense', () => {
        it('should take a package name that exists and return the license', async () => {
            await expect(getPackageLicense('some-package')).resolves.toBe('a thing');
        });
        
        it('should take a package that doesn\'t exist and return error', async () => {
            await expect(getPackageLicense('nope-package')).rejects.toEqual("Error fetching license for package 'nope-package': undefined");
        })
    })
})