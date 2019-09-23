import fs from 'fs';
import ejs from 'ejs';
import parse from './src/parse';
import config from './config.json';
import chalk from 'chalk';

const { path: targetPath } = config;
const result = parse(targetPath);

fs.writeFileSync('./result.json', JSON.stringify(result));

ejs.renderFile(
  './src/front-end/index.ejs',
  {
    legend: Object.keys(result),
    pieData: Object.keys(result).map(key => ({
      value: result[key].numbers,
      name: key
    })),
    barData: Object.keys(result).map(key => result[key].numbers),
    total: Object.keys(result).reduce(
      (sum, key) => sum + result[key].numbers,
      0
    )
  },
  (err, html) => {
    if (err) {
      return console.log(chalk.red(err.toString()));
    }
    fs.writeFileSync('./index.html', html);
  }
);
