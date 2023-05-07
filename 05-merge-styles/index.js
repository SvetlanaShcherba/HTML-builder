const fs = require('fs');
const path = require('path');
const { readdir } = require('fs').promises;

const folderPath = path.join(__dirname, 'styles');
const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');
const output = fs.createWriteStream(bundlePath, 'utf-8');

(async function(){
  try {
    const files = await readdir(folderPath, {withFileTypes: true});
    for (const file of files) {
      const filePath = path.join(__dirname, 'styles', file.name);
      const fileExtname = path.extname(filePath);
      if (file.isFile() && fileExtname === '.css') {
        const stream = fs.createReadStream(filePath);
        let data = '';
        stream.on('data', chunk => data += chunk);
        stream.on('end', () => output.write(data + '\n'));
      }
    }
  } catch (err) {
      console.error(err);
    }
})();