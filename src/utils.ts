import fs from 'fs';
import { file } from './declare';

export function removeComments(str: string): string {
  return str.replace(/(?<!:)\/\/[^\r\n]+?|\/\*[\s\S]+?\*\//gm, '');
}

export function cauculate(content: string, targetPath: string) {
  let result: file = { path: targetPath, numbers: 0, chinese: [] };
  content.replace(/[\u4e00-\u9fa5\r\n]+/gim, chinese => {
    result.numbers++;
    result.chinese.push(chinese);
    return chinese;
  });
  return result;
}

export function isPathLegal(tar: string): boolean {
  if (!fs.existsSync(tar)) {
    return false;
  }
  const stat = fs.statSync(tar);
  if (!stat.isDirectory()) {
    return /\.(t|j)sx?$/.test(tar);
  }
  return true;
}
