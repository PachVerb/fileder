// const options = {
//   /* ... */
// };
// const io = require("socket.io")(httpServer, options);

// io.on("connection", (socket) => {
//   /* ... */
// });

const ios = require("socket.io");
const ss = require("socket.io-stream");
const fs = require("fs");
module.exports = class Socket {
  constructor(server, options = {}) {
    this.server = server;
    this.options = options;
  }
  init() {
    const io = ios(this.server, this.options);
    return io;
  }
  static upload(io, socket) {
    const root = "/Users/ousan/desktop/test";
    ss(socket).emit("getprocess", "hello");
    ss(socket).on("file", function (stream, data) {
      const fullPath =
        root +
        data.path.substring(data.path.indexOf("/") + 1, data.path.length);
      const filewirte = fs.createWriteStream(fullPath + "/" + data.filename);
      stream.pipe(filewirte);
    });

    socket.on("process", (pro) => {
      console.log(pro);
      socket.broadcast.emit("process", pro);
    });
  }
};
