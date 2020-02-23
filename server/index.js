const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

let allRoom = {};
let nextUserId = 1;

class RoomInfo {
  constructor(name, password, user) {
    this.name = name;
    this.password = password;
    this.time = 59;
    this.users = [];
    this.history = [];
    this.addUser(user);
    this.init();
  }
  addUser(user) {
    let userId;
    if (user && user.id) {
      userId = user.id;
    } else {
      userId = nextUserId++;
    }

    user = Object.assign(
      user || {
        name: "user" + userId
      },
      {
        id: userId
      }
    );
    this.users.push(user);
    return user;
  }
  removeUser(user) {
    this.users = this.users.filter(v => {
      return v.id !== user.id;
    });

    // 无用户时释放房间
    if (this.users.length === 0) {
      this.del();
    }
  }
  addHistory(emitData) {
    this.history.push(emitData);
  }
  init() {
    // todo 自动删除房间
    // const timmer = setInterval(
    //   function() {
    //     this.time--;
    //     if (this.time <= 0) {
    //       clearInterval(timmer);
    //       delete allRoom[this.name];
    //     }
    //   }.bind(this),
    //   100
    // );
  }
  del() {
    delete allRoom[this.name];
  }
}
class SysMsg {
  constructor(msg, code, data) {
    this.msg = msg;
    this.code = code || 200;
    // info
    // 200 通用成功
    // 201 创建房间成功
    // 202 加入房间成功
    // 203 同步成功
    // 204 离开成功
    // error
    // 400 密码错误
    // 500 服务器通用错误
    // 501 同步失败
    // 502 要退出的房间不存在
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
      io.to(socket.id).emit("sys", new SysMsg("密码错误！", 400));
      return;
    }
    socket.join(name);
    let msg = "";
    let code = 200;
    if (isCreate) {
      user = allRoom[name].users[0];
      msg = user.name + "创建房间！";
      code = 201;
    } else {
      user = allRoom[name].addUser(user);
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
  socket.on("leave", ({ name, user }) => {
    if (allRoom[name]) {
      allRoom[name].removeUser(user);
      socket.leave(name);
      io.in(name).emit("sys", new SysMsg(`${user.name}已退出房间"`));
      io.to(socket.id).emit("sys", new SysMsg("已退出房间", 204));
    } else {
      io.to(socket.id).emit("sys", new SysMsg("房间不存在", 502));
    }
  });
  socket.on("action", ({ room, type, data, user }) => {
    if (!room) return;
    if (allRoom[room.name] && allRoom[room.name].password === room.password) {
      let emitData = {};
      if (type === "draw") {
        const { layerName, pathName, action, json } = data;
        emitData = {
          type,
          layerName,
          pathName,
          action,
          data: {
            json,
            user
          }
        };
      }
      if (type === "layer") {
        const { layerName, action, json } = data;
        emitData = {
          type,
          layerName,
          action,
          data: {
            json,
            user
          }
        };
      }
      if (type === "clear") {
        const { json } = data;
        emitData = {
          type,
          data: {
            json,
            user
          }
        };
      }
      if (emitData.type) {
        io.in(room.name).emit(emitData.type, emitData);
        allRoom[room.name].addHistory(emitData);
      }
    }
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
