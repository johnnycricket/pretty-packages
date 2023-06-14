export type Totals = {
    repo?: string,
    tableObjects: TableObject[]
}

export type TableObject = {
    depLevel: string
    name: string
    type?: ('prod' | 'dev')
    version?: string
    license?: string
    url?: string
}