import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { resolve } from 'path';
import * as _ from 'lodash';

const YAML_COMMON_CONFIG_FILENAME = 'config.yml';

const filePath = resolve(__dirname, '../config/', YAML_COMMON_CONFIG_FILENAME);
const commonConfig = yaml.load(readFileSync(filePath, 'utf8'));
const envPath = resolve(
  __dirname,
  '../config/',
  `config.${process.env.NODE_ENV}.yml`,
);
const envConfig = yaml.load(readFileSync(envPath, 'utf8'));

// 因为 config module 有一个 load 方法 -> 函数
export default () => {
  return _.merge(commonConfig, envConfig);
};
