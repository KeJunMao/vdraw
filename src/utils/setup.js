import hotkey from "@/utils/hotkey";
import { panAndZoom } from "@/utils/panandzoom";
import paper from "paper";
export default function(app) {
  paper.setup(app.canvas);
  paper.tool = null;
  window.addEventListener("keyup", hotkey);
  document.getElementById("canvas").addEventListener("wheel", event => {
    panAndZoom(event);
    app.vdrawArgs.zoom = paper.view.zoom;
  });
  paper.project.importJSON(window.localStorage.vdarw || []);
  app.vdrawArgs.size = paper.view.size;
  app.vdrawArgs.zoom = paper.view.zoom;
  app.isInit = true;
}
