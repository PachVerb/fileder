const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session");
const usersRouter = require("./routes/users");
const file = require("./routes/file");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
// !session注册

app.use(
  session({
    name: "token",
    secret: "pachverb",
    saveUninitialized: false,
    resave: false,
    cookie: { path: "/", maxAge: 60 * 1000 * 30 },
  })
);
app.all("*", function (req, res, next) {
  // console.log(req.headers.origin)
  // res.header("Access-Control-Allow-Origin", req.headers.origin);  // 指定跨域字段
  // res.header("Access-Control-Allow-Origin", '*');    // 放通所有客户端地址
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") res.send(200);
  /*让options请求快速返回*/ else next();
});
// io 注册
app.use("/users", usersRouter);
app.use("/file", file);

module.exports = app;
