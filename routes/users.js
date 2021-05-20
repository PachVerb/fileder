const express = require("express");
const router = express.Router();
const user = require("../db/count");
const info = require("../db/userinfo");
const { pachverb } = user;
const session = require("express-session");
/* GET users listing. */

/** 
 * {
    name:  'token', // 对session id 相关的cookie 进行签名
    secret:'pachverb',
    resave: true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie: {
        maxAge : 1000 * 60, // 设置 session 的有效时间，单位毫秒
    },
}
 * 
 * 
 * 
*/
router.post("/login", function (req, res, next) {
  console.log(req.body.user);
  if (
    req.body.user &&
    req.body.user === pachverb.username &&
    req.body.pass &&
    req.body.pass === pachverb.pass
  ) {
    req.session.user = req.body.user; // 设置session
    res.send({ code: 0, msg: "登陆成功", sessionId: req.session.id });
  } else {
    res.send({ code: 1, msg: "账号或密码错误" });
  }
});

router.get("/userinfo", function (req, res, next) {
  console.log(req);
  if (req.session.user) {
    res.send({
      code: 0,
      info: info[req.session.user],
    });
  } else {
    res.status(401).end();
  }
});

router.get("/logout", function (req, res, next) {
  req.session.destroy(); // 销毁session
  res.send({ code: 0, msg: "退出成功" });
});

module.exports = router;
