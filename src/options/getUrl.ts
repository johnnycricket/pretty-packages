import { Options } from "./Options";

export const getUrl = (options: Options, depName: string): string | undefined => {
    let url: string | undefined;

    if (options.includeUrl) {
        url = `https://www.npmjs.com/package/${depName}`;
    } else {
        url = undefined;
    }

    return url
}