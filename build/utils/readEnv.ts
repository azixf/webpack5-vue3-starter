import path from 'path';
import fs from 'fs/promises';

export const rootDir:string = path.resolve(__dirname, '../../')

// TODO: env环境变量的读取
export function readFile(filename: string) {
  console.log('root: ', rootDir)
  let dir = path.resolve(rootDir, filename)
  console.log('dir')
}
