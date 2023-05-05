const fs = require('fs');
const path = require('path');
const { readdir, copyFile, mkdir } =  require('fs').promises;

const dirrPath = path.join(__dirname, 'files');
const newDirrPath = path.join(__dirname, 'files-copy');

async function copyDir() {
  const filesDirr = await readdir(dirrPath, {withFileTypes: true});
    const newFolder = await mkdir(newDirrPath, {recursive: true,});
    for (const file of filesDirr) {
      try {
        const filePath = path.join(__dirname, 'files', file.name);
        const newFilePath = path.join(__dirname, 'files-copy', file.name);
        await copyFile(filePath, newFilePath);
      } catch {
        console.error('Файлы не удалось скопировать');
      }
    }
  }
copyDir().catch(console.error);

