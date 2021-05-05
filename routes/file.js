const express = require('express');
const router = express.Router();
const fs = require('fs')
const createDir = require('../utils/creatDir')
const root = '/Users/ousan/desktop/test'
router.get('/list', async (req, res) => {
  // source root
    let file = null;
    await fs.stat(root, {}, (err, path) => {
      if (err) throw err;
      file = path;
    })
    if (file) {
      await fs.mkdir(path , { recursive: false }, (err) => {
        if (err) throw err;
      })
    }
    await fs.readdir(root ,{withFileTypes: true}, (err, files) => {
      if(err) return res.send({ code: 1, msg: '服务器出了点故障'})
      return res.send({code: 0, msg: createDir(files)})
    })
})

router.post('/getcontent', async (req, res) => {
  const { path } = req.body
  const fullPath = root + path.substring(path.indexOf('/') + 1, path.length) 

  await fs.readdir(fullPath, {withFileTypes: true}, (err, files) => {
    if(err) return res.send({ code: 1, msg: '服务器出了点故障' + err})
    return res.send({code: 0, msg: createDir(files)})
  })
})

module.exports = router