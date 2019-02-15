const fs = require('fs');
const path = require('path');
const renderIndex = require('../src/page/index');

const output = renderIndex();

fs.mkdirSync(path.join(__dirname, '..', 'dist'), { recursive: true });
fs.writeFileSync(path.join(__dirname, '..', 'dist', 'index.html'), output, {flag: 'w'});
