import { Options } from "./Options"

export const getVersion = (options: Options, dependency: string): string | undefined => {
    let version: string | undefined;

    if (options.includeVersion) {
        version = dependency;
    } else {
        version = undefined;
    }

    return version
}
