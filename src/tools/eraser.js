import paper from "paper";
import history from "@/utils/history";
import { DrawAction } from "@/utils/actions";
import store from "@/store";
const local = {
  path: null,
  show: null
};
const args = {
  lastSize: 0
};

const onMouseMove = event => {
  if (
    !local.show ||
    local.show.layer !== paper.project.activeLayer ||
    args.layer !== store.state.eraserArgs.size
  ) {
    if (local.show) {
      local.show.remove();
    }
    local.show = null;
    local.show = new paper.Path.Circle({
      center: [0, 0],
      radius: store.state.eraserArgs.size / 2,
      strokeColor: "black",
      fillColor: "white"
    });
    args.lastSize = store.state.eraserArgs.size;
  }
  local.show.position = event.point;
};

const onMouseDown = event => {
  local.path = new paper.Path();
  local.path.strokeColor = "white";
  local.path.strokeWidth = store.state.eraserArgs.size;
  local.path.blendMode = "destination-out";
  local.path.strokeCap = "round";
  local.path.strokeJoin = "round";
  local.path.add(event.point);
};

const onMouseDrag = event => {
  if (local.show) {
    local.show.position = event.point;
    local.show.bringToFront();
  }
  if (!local.path) return;
  local.path.add(event.point);
};

const onMouseUp = event => {
  local.path.add(event.point);
  history.add(
    new DrawAction({
      path: local.path
    })
  );
  local.path = null;
};

const onToggleIn = () => {};
const onToggleOut = () => {
  if (local.show) {
    local.show.remove();
  }
  local.show = null;
};
export const tool = new paper.Tool();
tool.onMouseDown = onMouseDown;
tool.onMouseDrag = onMouseDrag;
tool.onMouseUp = onMouseUp;
tool.onMouseMove = onMouseMove;
tool.onToggleIn = onToggleIn;
tool.onToggleOut = onToggleOut;
