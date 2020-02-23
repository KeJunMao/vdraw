import io from "socket.io-client";
import paper from "paper";
import store from "@/store";
import { createLayer, clearProject } from "@/utils/shared";
class VdrawSocket {
  constructor(url) {
    this.url = url;
    this.socket = io.connect(this.url);
    this.sys();
    this.draw();
    this.layer();
    this.clear();
  }
  joinRoom(room) {
    this.socket.emit("join", room);
  }
  sys() {
    this.socket.on("sys", sys => {
      if (sys.code === 201 || sys.code === 202) {
        store.commit("setRoom", sys.data.room);
        if (!store.state.user) {
          store.commit("setUser", sys.data.user);
        }
      }
      console.log(sys.msg);
    });
  }
  draw() {
    this.socket.on("draw", ({ layerName, pathName, action, data }) => {
      const user = data.user;
      // 本地不再绘制
      if (user.id !== store.state.user.id) {
        console.log("draw");
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
  sendAction({ type, data }) {
    const room = store.state.room;
    if (!room) return;
    console.log("send");
    const user = store.state.user;
    this.socket.emit("action", {
      room,
      type,
      user,
      data
    });
  }
}
export default new VdrawSocket("http://localhost:3000");
