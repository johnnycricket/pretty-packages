import { Options } from "../options/Options"
import { Totals } from "./tableTypes"

export const getCsvTable = (allDeps: Totals, options: Options): string => {
    const header = Object.keys(allDeps.tableObjects).join(',')
    const rows = allDeps.tableObjects.map((item, index) => {
        const row = Object.values(item).map(value => value[index])
        return row.join(',')
    })
    return [header, ...rows].join('\n')
}