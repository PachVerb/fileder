const fs = require('fs')

function isDir(file) {
  if (!file) throw new Error('错误')

  return file.isDirectory()
}

module.exports = isDir