const isDir = require('./isDir')
let root = []
function createDir(files) {
  if (!files) return;
  root = []
  for (let i = 0; i < files.length; i++) {
    const single = {}

    if (isDir(files[i])) {
      single.title = files[i].name;
      single.key = files[i].name;
      single.children = []
      single.type = 1
      root.push(single)
    } else {
      single.title = files[i].name;
      single.key = files[i].name;
      single.type = 0
      root.push(single)
    }
  }

  return root;
}

module.exports = createDir;