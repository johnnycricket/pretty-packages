const getPackageLicense = (packageName) => {
    return new Promise((resolve, reject) => {
        process.nextTick(() => {
            packageName 
                ? resolve(`https://registry.npmjs.org/${packageName}`)
                : reject(`Error fetching license for package '${packageName}': sad trombone`)
        })
    })  
}

module.exports = {
    getPackageLicense
};
 