const zip = require('bestzip');
const package = require('./package.json');

console.log('Zipping started:');

zip({
  source: 'build/*',
  destination: `nt-dashboard_v${package.version}.zip`,
})
  .then(function () {
    console.log('Zipped up!');
  })
  .catch(function (err) {
    console.error(err.stack);
    process.exit(1);
  });
