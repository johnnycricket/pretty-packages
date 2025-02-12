import axios from 'axios'

interface NpmPackageMetadata {
    license: string
}

export const getPackageLicense = async (packageName: string): Promise<string> => {
    try {
        const response = await axios.get<NpmPackageMetadata>(
            `https://registry.npmjs.org/${packageName}`
        )
        return response.data.license || ''
    } catch (err: any) {
        console.log(`Error fetching license for package '${packageName}': ${err.message}`)
        return Promise.reject(`Error fetching license for package '${packageName}': ${err.message}`)
    }
}
