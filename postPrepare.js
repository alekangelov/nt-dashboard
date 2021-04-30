const zip = require('bestzip');
const package = require('./package.json');
const fs = require('fs');

console.log('Zipping started:');
const newPath = `./nt-dashboard_v${package.version}.zip`;

try {
  fs.unlinkSync(newPath);
  zip({
    source: './build/*',
    destination: newPath,
  })
    .then(function () {
      console.log('Zipped up!');
    })
    .catch(function (err) {
      console.error(err.stack);
      process.exit(1);
    });
} catch (e) {
  console.error(e.stack);
}
