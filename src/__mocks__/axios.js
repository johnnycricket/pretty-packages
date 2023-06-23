const axios = jest.createMockFromModule('axios');

const get = (url) => {
    return new Promise((resolve, reject) => {
        const testUrl = 'https://registry.npmjs.org/some-package';
        const responseObj = {
            data: {
                license: 'a thing'
            }
        }

        process.nextTick(() => {
            testUrl === url 
                ? resolve(responseObj)
                : reject({
                    error: 'no package found'
                })
        })
    })
}

axios.get = get;

module.exports = axios;
