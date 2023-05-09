const fs = require('fs');
const path = require('path');
const { readdir, copyFile, mkdir, rm} =  require('fs').promises;

const dirrPath = path.join(__dirname, 'files');
const newDirrPath = path.join(__dirname, 'files-copy');

async function copyDir() {
  const filesDirr = await readdir(dirrPath, {withFileTypes: true});
  const newFolder = await mkdir(newDirrPath, {recursive: true,});
  const filesNewDir = await readdir(newDirrPath, {withFileTypes: true});
  for (const file of filesNewDir){
    const filePath = path.join(newDirrPath, file.name);
    await rm(filePath);
  }
  for (const file of filesDirr) {
    try {
      const filePath = path.join(dirrPath, file.name);
      const newFilePath = path.join(newDirrPath, file.name);
      await copyFile(filePath, newFilePath);
    } catch {
      console.error('Файлы не удалось скопировать');
    }
  }
}
copyDir().catch(console.error);

