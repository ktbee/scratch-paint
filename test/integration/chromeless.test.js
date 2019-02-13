/* eslint-env jest */
const {Chromeless} = require('chromeless');
const path = require('path');
const fs = require('fs');
const chromeless = new Chromeless({debug: true});

const indexHTML = path.resolve(__dirname, 'index.html');
const testDir = (...args) => path.resolve(__dirname, 'tests', ...args);

afterAll(() => {
    // close the browser window we used
    return chromeless.end();
});

const testFile = file => test('canvas test', async () => {
    // start each test by going to the index.html, and loading the scratch file
    await chromeless.goto(`file://${indexHTML}`)
        .setFileInput('#file', testDir(file))
        .wait('#loaded')
        .evaluate(() => {
            return Promise.resolve()
                .then( () => {
                    // In-browser tests go here
                });
        })
});


// immediately invoked async function to let us wait for each test to finish before starting the next.
(() => {
    const files = fs.readdirSync(testDir())
        .filter(uri => uri.endsWith('.png') || uri.endsWith('.svg'));

    for (const file of files) {
        testFile(file);
    }
})();
