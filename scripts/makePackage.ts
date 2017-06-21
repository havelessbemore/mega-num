import * as fs from 'fs';
import * as path from 'path';

let packageJson: {[id: string]: any} = require(path.join(process.cwd(), './package.json'));

//Edit package.json
packageJson = Object.assign({}, packageJson, {
  main: 'index.js',
  typings: 'index.d.ts',
  scripts: {},
  directories: {}
});

//Add package.json and README.md
fs.writeFileSync('build/src/package.json', JSON.stringify(packageJson, null, 2));
fs.writeFileSync('build/src/README.md', fs.readFileSync('./README.md').toString());
