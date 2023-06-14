import { Options } from "../options/Options";
import { TableObject, Totals } from "../tabletypes/tableTypes";
import { filterEmpty } from "./filterEmpty";

export const getMarkdownTable = (allDeps: Totals, options: Options): string => {
    const header = ` | repo | ${Object.keys(allDeps.tableObjects[0]).join(' | ')} | `
    const separator = ` | --- | ${Object.keys(allDeps.tableObjects[0]).map(() => '---').join(' | ')} | `
    const tableObjs: TableObject[] = allDeps.tableObjects;
    const rowItems: string[][] = tableObjs.map(item => {
        const bits = Object.values(item);
        return bits.filter(filterEmpty);
    });
        
    const rows: string[] = rowItems.map((row) => { 
        return ` | ${allDeps.repo} | ${row.join(' | ')} | `
    });
        
    return [header, separator, ...rows].join('\n')
}