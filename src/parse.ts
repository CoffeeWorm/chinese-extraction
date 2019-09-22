import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { files } from './declare';
import { isPathLegal, removeComments, cauculate } from './utils';

function parse(targetPath: string, result: files = {}): files {
  if (!isPathLegal(targetPath)) {
    console.log(chalk.red(targetPath + ' is not exist!'));
    process.exit(1);
  }

  const stat = fs.statSync(targetPath);

  if (stat.isDirectory()) {
    fs.readdirSync(targetPath).forEach((filename: string) => {
      const tmpPath = path.normalize(targetPath + '/' + filename);
      parse(tmpPath, result);
    });
  } else {
    const buf = fs.readFileSync(targetPath);
    let content = buf.toString();
    content = removeComments(content);
    result[targetPath] = cauculate(content, targetPath);
  }
  return result;
}

export default parse;
