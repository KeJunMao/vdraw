import io from "socket.io-client";
import paper from "paper";
import store from "@/store";
import { createLayer, clearProject } from "@/utils/shared";
import app from "@/main";
class VdrawSocket {
  constructor(url) {
    this.url = url;
    this.socket = io.connect(this.url);
    this.initRoom();
  }
  joinRoom(room) {
    const user = store.state.user;
    const json = paper.project.exportJSON();
    this.socket.emit("join", {
      ...room,
      user,
      data: {
        json
      }
    });
  }
  leaveRoom() {
    const user = store.state.user;
    const room = store.state.room;
    this.socket.emit("leave", {
      password: room.password,
      name: room.name,
      user
    });
  }
  sys() {
    this.socket.on("sys", sys => {
      if (sys.code === 201 || sys.code === 202 || sys.code === 204) {
        store.commit("setRoom", {
          name: sys.data.room.name,
          password: sys.data.room.password,
          users: sys.data.room.users
        });
        if (!store.state.user) {
          store.commit("setUser", sys.data.user);
        }
      }
      if (sys.code === 205 || sys.code === 502) {
        store.commit("setRoom", null);
      }
      let msgType = "open";
      if (sys.code >= 200 && sys.code < 300) {
        msgType = "info";
      }
      if (sys.code >= 400 && sys.code < 600) {
        msgType = "error";
      }
      app.$snakbar({
        msg: sys.msg,
        type: msgType
      });
      store.commit("unLockSocket");
    });
  }
  draw() {
    this.socket.on("draw", ({ layerName, pathName, action, data }) => {
      const user = data.user;
      // 本地不再绘制
      if (user.id !== store.state.user.id) {
        const json = data.json;
        let layer = paper.project.layers[layerName];
        if (!paper.project.layers[layerName]) {
          layer = createLayer(layerName);
        }
        if (action === "init") {
          layer.importJSON(json);
        } else if (action === "exec") {
          layer.children[pathName].importJSON(json);
        } else if (action === "unexec") {
          layer.children[pathName].removeSegments();
        }
      }
    });
  }
  layer() {
    this.socket.on("layer", ({ layerName, action, data }) => {
      const user = data.user;
      if (user.id !== store.state.user.id) {
        if (action === "init:add") {
          createLayer(layerName);
        } else if (action === "init:remove" || action === "exec:remove") {
          paper.project.layers[layerName] &&
            paper.project.layers[layerName].remove();
        } else if (action === "exec:add" || action === "unexec:add") {
          const layer = createLayer(layerName);
          layer.importJSON(data.json);
        }
      }
    });
  }
  clear() {
    this.socket.on("clear", ({ data }) => {
      const user = data.user;
      if (user.id !== store.state.user.id) {
        const project = clearProject();
        project.importJSON(data.json);
      }
    });
  }
  initRoom() {
    this.sys();
    this.draw();
    this.layer();
    this.clear();
    this.socket.on("init", ({ json }) => {
      clearProject();
      paper.project.importJSON(json);
    });
  }
  sendAction({ type, data }) {
    const room = store.state.room;
    if (!room) return;
    const user = store.state.user;
    this.socket.emit("action", {
      room,
      type,
      user,
      data
    });
  }
}

let url = "http://localhost:3000";
if (process.env.NODE_ENV === "production") {
  url = "https://vdraw.herokuapp.com/";
}
export default new VdrawSocket(url);
