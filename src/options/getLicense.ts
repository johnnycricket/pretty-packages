import { Options } from "./Options"
import {getPackageLicense} from "../service/metadataRetriever";

export const getLicense = async (options: Options, depName: string): Promise<string | undefined> => {    
    if (!options.includeLicense) {
        return undefined;
    } 

    return await getPackageLicense(depName)
}
