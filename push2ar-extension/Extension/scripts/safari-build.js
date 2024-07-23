const fs = require('fs-extra');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

main();

async function main() {
    await exec('npm run build');

    const packageDir = '../Safari/Push2AR Extension/Resources/';

    // clean package dir
    if (fs.existsSync(packageDir)) {
        await fs.rm(packageDir, { recursive: true });
    }
    await fs.mkdir(packageDir);

    await Promise.all([
        fs.copy('manifest.json', `${packageDir}/manifest.json`),
        fs.copy('dist/', `${packageDir}/dist`),
        fs.copy('_locales', `${packageDir}/_locales`),
        fs.copy('images', `${packageDir}/images`),
        fs.copy('public', `${packageDir}/public`),
    ]);

    console.log('Built for Safari');
}
