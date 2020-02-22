import socket from "@/utils/socket";
import uuid4 from "uuid4";
export class DrawAction {
  constructor({ path }) {
    this._args = { path };
    path.name = uuid4();
    this.send();
  }
  exec() {
    if (this.removed) {
      this._args.path.add(...this.removed);
      this.send("exec");
    }
  }
  unexec() {
    this.removed = this._args.path.removeSegments();
    this.send("unexec");
  }
  send(action = "init") {
    const json = this._args.path.exportJSON();
    const pathName = this._args.path.name;
    const layerName = this._args.path.layer.name;
    socket.sendAction({
      type: "draw",
      data: {
        layerName,
        pathName,
        action,
        json
      }
    });
  }
}

export class LayerAction {
  constructor({ project, layer, type }) {
    this._args = { project, layer, type };
  }
  exec() {
    if (this._args.type === "add") {
      if (this.removed) {
        return this._args.project.addLayer(this.removed);
      }
    }
    if (this._args.type === "remove") {
      this._args.layer.remove();
    }
  }
  unexec() {
    if (this._args.type === "add") {
      this.removed = this._args.layer;
      this._args.layer.remove();
    }
    if (this._args.type === "remove") {
      this._args.project.addLayer(this._args.layer);
    }
  }
}
