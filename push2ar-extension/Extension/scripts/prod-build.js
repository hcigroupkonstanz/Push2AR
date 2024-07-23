const fs = require('fs/promises');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

main();

async function main() {
  try {
    await fs.rm('./dist', { recursive: true });
  } catch {}
  await fs.mkdir('./dist');
  await exec('npm run build -- --prod');
  console.log('Done');
}
