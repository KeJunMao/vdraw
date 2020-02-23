const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

let allRoom = {};
let nextUserId = 0;

class RoomInfo {
  constructor(name, password, user) {
    this.name = name;
    this.password = password;
    this.users = [];
    this.history = [];
    this.addUser(user);
  }
  addUser(user) {
    const Userid = nextUserId++;
    user = Object.assign(
      user || {
        name: "user" + Userid
      },
      {
        id: Userid
      }
    );
    this.users.push(user);
    return user;
  }
  addHistory(emitData) {
    this.history.push(emitData);
  }
}
class SysMsg {
  constructor(msg, code, data) {
    this.msg = msg;
    this.code = code || 200;
    // 200 通用成功
    // 201 创建房间成功
    // 202 加入房间成功
    // 203 同步成功
    // 400 密码错误
    // 500 服务器通用错误
    // 501 同步失败
    this.data = data || null;
  }
}

io.on("connection", socket => {
  socket.on("join", ({ name, password, user }) => {
    let isCreate = false;
    if (!allRoom[name]) {
      isCreate = true;
      allRoom[name] = new RoomInfo(name, password, user);
    }
    if (allRoom[name].password !== password) {
      io.in(name).emit("sys", new SysMsg("密码错误！", 400));
      return;
    }
    user = allRoom[name].addUser(user);
    socket.join(name);
    let msg = "";
    let code = 200;
    if (isCreate) {
      msg = user.name + "创建房间！";
      code = 201;
    } else {
      msg = user.name + "加入本房间！";
      code = 202;
    }
    io.in(name).emit(
      "sys",
      new SysMsg(msg, code, {
        room: allRoom[name],
        user: user
      })
    );

    if (code === 202) {
      io.to(socket.id).emit("sys", new SysMsg("同步中..."));
      allRoom[name].history.forEach(emitData => {
        io.to(socket.id).emit(emitData.type, emitData);
      });
      io.to(socket.id).emit("sys", new SysMsg("同步成功...", 203));
    }
  });
  socket.on("action", ({ room, type, data, user }) => {
    if (!room) return;
    if (allRoom[room.name] && allRoom[room.name].password === room.password) {
      if (type === "draw") {
        const { layerName, pathName, action, json } = data;
        const emitData = {
          type: "draw",
          layerName,
          pathName,
          action,
          data: {
            json,
            user
          }
        };
        io.in(room.name).emit(emitData.type, emitData);
        allRoom[room.name].addHistory(emitData);
      }
      if (type === "layer") {
        const { layerName, action, json } = data;
        const emitData = {
          type: "layer",
          layerName,
          action,
          data: {
            json,
            user
          }
        };
        io.in(room.name).emit(emitData.type, emitData);
        allRoom[room.name].addHistory(emitData);
      }
    }
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
