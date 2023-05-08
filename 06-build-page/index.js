const fs = require('fs');
const path = require('path');
const { readdir, readFile, mkdir, copyFile, writeFile } = require('fs').promises;

const stylesPath = path.join(__dirname, 'styles');
const assetsPath = path.join(__dirname, 'assets');
const distPath = path.join(__dirname, 'project-dist');
const templatePath = path.join(__dirname, 'template.html');
const componentsPath = path.join(__dirname, 'components');
const bundlePath = path.join(distPath, 'style.css');
const newAssetsPath = path.join(distPath, 'assets');
const newHtmlPath = path.join(distPath, 'index.html');

const styleOutput = fs.createWriteStream(bundlePath, 'utf-8');

(async function(){
  try {
    const newFolder = await mkdir(distPath, {recursive: true,});
    const stylesFiles = await readdir(stylesPath, {withFileTypes: true});
    for (const file of stylesFiles) {
      const filePath = path.join(stylesPath, file.name);
      const fileExtname = path.extname(filePath);
      if (file.isFile() && fileExtname === '.css') {
        const stream = fs.createReadStream(filePath);
        let data = '';
        stream.on('data', chunk => data += chunk);
        stream.on('end', () => styleOutput.write(data + '\n'));
      }
    }
    await copyFile(templatePath, newHtmlPath);
    const componentsFiles = await readdir(componentsPath, {withFileTypes: true});
    for (const file of componentsFiles) {
      const filePath = path.join(componentsPath, file.name);
      const fileExtname = path.extname(filePath);
      if (file.isFile() && fileExtname === '.html') {
        const htmlData = await readFile(newHtmlPath, 'utf-8');
        const fileData = await readFile(filePath, 'utf-8');
        const newHtml = htmlData.replace(`{{${file.name.split('.')[0]}}}`, fileData);
        await writeFile(newHtmlPath, newHtml);
      }
    }
  } catch (err) {
    console.error(err);
  }
})();

async function copyDir(dir, newDir) {  
  try {
    const filesAssets = await readdir(dir, {withFileTypes: true});
    await mkdir(newDir, {recursive: true,});
    for (const file of filesAssets) {
      try {
        const filePath = path.join(dir, file.name);
        const newFilePath = path.join(newDir, file.name);
        if (file.isFile()) {
          await copyFile(filePath, newFilePath);
        } else if (file.isDirectory()){
          await mkdir(newFilePath, {recursive: true,});
          copyDir(filePath, newFilePath);
        }
      } catch {
        console.error('Файлы не удалось скопировать');
      }
    }
  } catch (err) {
    console.error(err);
  }
};
copyDir(assetsPath, newAssetsPath);

