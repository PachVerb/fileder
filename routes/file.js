const express = require("express");
const router = express.Router();
const fs = require("fs");
const createDir = require("../utils/creatDir");
const root = "/Users/ousan/desktop/test";
router.get("/list", async (req, res) => {
  // source root
  let file = null;
  await fs.stat(root, {}, (err, path) => {
    if (err) throw err;
    file = path;
  });
  if (file) {
    await fs.dirname(path, { recursive: false }, (err) => {
      if (err) throw err;
    });
  }
  await fs.readdir(root, { withFileTypes: true }, (err, files) => {
    if (err) return res.send({ code: 1, msg: "服务器出了点故障" });
    return res.send({ code: 0, msg: createDir(files) });
  });
});

router.post("/getcontent", async (req, res) => {
  const { path } = req.body;
  const fullPath = root + path.substring(path.indexOf("/") + 1, path.length);

  await fs.readdir(fullPath, { withFileTypes: true }, (err, files) => {
    if (err) return res.send({ code: 1, msg: "服务器出了点故障" + err });
    return res.send({ code: 0, msg: createDir(files) });
  });
});

router.post("/mkdir", async (req, res) => {
  const { path, dirname, type } = req.body;
  console.log(type);
  const fullPath = root + path.substring(path.indexOf("/") + 1, path.length);
  let notexit = false;
  if (type === 1) {
    console.log("dir");
    const data = await fs.promises.readdir(fullPath, { withFileTypes: true });
    if (data.find((val) => val.name === dirname)) {
      res.send({
        code: 1,
        msg: "目录已存在",
      });
    } else {
      notexit = true;
    }

    if (notexit) {
      await fs.promises.mkdir(fullPath + "/" + dirname, { recursive: false });
      res.send({
        code: 0,
        msg: "创建成功",
      });
    }
  }
  if (type === 2) {
    console.log("file");
    const data = await fs.promises.readdir(fullPath, {
      withFileTypes: true,
    });
    if (data.find((val) => val.name === dirname)) {
      res.send({
        code: 1,
        msg: "文件已存在",
      });
    } else {
      notexit = true;
    }
    if (notexit) {
      const data = new Uint8Array(Buffer.from("Node.js 中文网"));
      await fs.promises
        .appendFile(fullPath + "/" + dirname, data, {
          flag: "a+",
        })
        .then((re) => {
          res.send({
            code: 0,
            msg: "文件创建成功",
          });
        })
        .catch((err) => {
          res.send({
            code: 1,
            msg: "文件创建失败:" + err,
          });
        });
    }
  }
  return res.end();
});

// * 移除目录
/**
 * I fs.prmoises
 * II. rm -> argus
 * @parm {string} path - 移除指定路径的文件或目录
 * @parm {object} options - 配置项目
 * 1. maxRetries: 遇到错误时，nodejs尝试重新操作此顺
 * 2. retryDelay: 每次操作的质检的间隔
 * 3. recursive: 递归删除
 *
 *
 */
router.post("/remove", async (req, res) => {
  const { path } = req.body;
  const fullPath = root + path.substring(path.indexOf("/") + 1, path.length);

  try {
    await fs.promises.rm(fullPath, {
      maxRetries: 1,
      retryDelay: 100,
      recursive: true,
    });
    res.send({ code: 0, msg: "删除成功" });
  } catch (err) {
    res.send({ code: 1, msg: "操作失败:" + err });
  }
});

// 文件下载
router.get("/download", (req, res) => {
  const { fpath } = req.query; // 获取查询参数
  const fullPath = root + fpath.substring(fpath.indexOf("/") + 1, fpath.length);
  const fread = fs.createReadStream(fullPath);
  let size = 0;
  let chunks = 0;
  res.set("Content-Type", "application/octet-stream");
  fread.on("data", (chunk) => {
    console.log(chunk);
    size += chunk.length;
    chunks += chunk;
  });
  fread.on("end", () => {
    res.set({ "Content-Length": size }).send(chunks);
  });

  //   fread.pipe(res);
});

module.exports = router;
