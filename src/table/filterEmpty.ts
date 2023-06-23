export const filterEmpty = (value: string | undefined): boolean | string => {
    if(value === undefined) {
        return false;
    };
    
    return value;
}