const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '../../')
// TODO: env环境变量的读取
function readEnv(env) {
  const dirs = [
    path.resolve(root, './.env'),
    path.resolve(root, `./.env.${env}`),
  ]

  for (let i = 0; i < 2; i++) {
    const obj = readFile(dirs[i])
    if (obj) {
      return obj
    }
  }
  return {}
}
// 先读.env 再读 .env.*
function readFile(path) {
  try {
    fs.accessSync(path)
    const data = fs.readFileSync(path, 'utf-8')
    if (data) {
      const obj = {}
      data
        .split('\r\n')
        .map((keyvalue) => keyvalue.split('='))
        .forEach((arr) => {
          const key = arr[0].trim()
          const value = JSON.stringify(arr[1].trim())
          if (key.startsWith('VUE_APP_')) {
            obj[key] = value
          }
        })
      return obj
    }
  } catch (err) {
    console.log('load env file fail: ', err.message)
  }
}

module.exports = {
  readEnv,
}
