const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

const textPath = path.join(__dirname, 'text.txt');
const output = fs.createWriteStream(textPath);
stdout.write('Введите текст\n');
stdin.on('data', data => {
  if (data.toString().trim() !== 'exit') {
    output.write(data);
    stdout.write('Введите текст\n');
  } else {
    stdout.write('Всего хорошего!');
    process.exit();
  }
});
process.on('SIGINT', () => {
  stdout.write('Всего хорошего!');
  process.exit();
});
