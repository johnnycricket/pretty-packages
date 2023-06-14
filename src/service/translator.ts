import { Options } from "../options/Options";
import { getLicense } from "../options/getLicense";
import { getUrl } from "../options/getUrl";
import { getVersion } from "../options/getVersion";
import { TableObject, Totals } from "../tabletypes/tableTypes";
import { getMarkdownTable } from "../table/markdownTableGen";
import { getCsvTable } from "../table/csvTableGen";

export const translate = async (packageJsonContent: string, options: Options): Promise<string> => {
    const packageJson = JSON.parse(packageJsonContent)
    const tableObjects = await getTableObject(packageJsonContent, options)
    const allDeps: Totals = {
        repo: packageJson.name,
        tableObjects
    };
    
    if (allDeps.tableObjects.length < 1) {
        return 'Could not parse package.json'
    }
    
    return getTable(allDeps, options)
}

const getTableObject = async (packageJsonContent: string, options: Options): Promise<TableObject[]> => {
    try {
        const packageJson = JSON.parse(packageJsonContent)

        const dependencies: string[] = Object.keys(packageJson.dependencies);
        const devDependencies: string[] = packageJson.devDependencies ? Object.keys(packageJson.devDependencies) : [];
        const peerDependencies: string[] = packageJson.peerDependencies ? Object.keys(packageJson.peerDependencies) : [];

        const tableDeps: TableObject[] = await Promise.all(dependencies.map(async (item, i) => {
            const version = getVersion(options, packageJson.dependencies[item]);
            const url = getUrl(options, dependencies[i]);
            const license = await getLicense(options, dependencies[i]);
            return {
                depLevel: '',
                name: dependencies[i],
                version,
                url,
                license
            } as TableObject;
        }));

        const tableDevDeps: TableObject[] = await Promise.all(devDependencies.map(async (item, i) => {
            if (!options.includeDevDependencies && !packageJson.devDependencies) {
                return {
                    name: 'filter'
                } as TableObject
            }
            const version = getVersion(options, packageJson.devDependencies[item]);
            const url = getUrl(options, devDependencies[i]);
            const license: string | undefined = await getLicense(options, devDependencies[i]);
            
            return {
                depLevel: 'Dev',
                name: devDependencies[i],
                version,
                url,
                license
            } as TableObject;
        }));

        const tablePeerDeps: TableObject[] = await Promise.all(peerDependencies.map(async (item, i) => {
            if (!options.includePeerDependencies && !packageJson.peerDependencies) {
                return {
                    name: 'filter'
                } as TableObject
            }
            const version = getVersion(options, packageJson.peerDependencies[item]);
            const url = getUrl(options, peerDependencies[i]);
            const license = await getLicense(options, peerDependencies[i]);
            return {
                depLevel: 'Peer',
                name: peerDependencies[i],
                version,
                url,
                license
            } as TableObject;
        }));
        
        const allTableObjects = tableDeps.concat(tableDevDeps, tablePeerDeps);
        
        return allTableObjects;
    } catch (e) {
        console.error('Could not parse package.json')
        const empty: TableObject[] = []
        
        return empty;
    }
}

const getTable = (allDeps: Totals, options: Options): string => {
    if (options.markdown) {
        return getMarkdownTable(allDeps, options)
    } else {
        return getCsvTable(allDeps, options)
    }
}
