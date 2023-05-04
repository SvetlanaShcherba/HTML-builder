const fs = require('fs');
const path = require('path');
const { readdir } =  require('fs').promises;
const {stdout } = process;

const folderPath = path.join(__dirname, 'secret-folder');

(async function(pathFolder){
  try {
    const files = await readdir(pathFolder, {withFileTypes: true});
    for (const file of files) {
      if (file.isFile()) {
        const fileName = file.name.split('.')[0];
        const filePath = path.join(__dirname, 'secret-folder', file.name);
        const fileExtname = path.extname(filePath).split('.')[1];
        fs.stat(filePath, (err, stats) => {
          const fileSize = stats.size;
          stdout.write(fileName + ' - ' + fileExtname + ' - ' + fileSize + '\n');
        });
      }
    }
  } catch (err) {
      console.error(err);
    }
})(folderPath);

