import paper from "paper";
import history from "@/utils/history";
import { DrawAction } from "@/utils/actions";
import store from "@/store";
const local = {
  path: null,
  show: null
};
const args = {
  lastSize: 0,
  lastColor: "#00000FF"
};

const onMouseMove = event => {
  if (
    !local.show ||
    local.show.layer !== paper.project.activeLayer ||
    args.lastSize !== store.state.pencilArgs.size ||
    args.lastColor !== store.state.pencilArgs.color
  ) {
    if (local.show) {
      local.show.remove();
    }
    local.show = null;
    local.show = new paper.Path.Circle({
      center: [0, 0],
      radius: store.state.pencilArgs.size / 2,
      fillColor: store.state.pencilArgs.color
    });
    args.lastSize = store.state.pencilArgs.size;
    args.lastColor = store.state.pencilArgs.color;
  }
  local.show.position = event.point;
};

const onMouseDown = event => {
  local.path = new paper.Path();
  local.path.strokeColor = store.state.pencilArgs.color;
  local.path.strokeWidth = store.state.pencilArgs.size;
  local.path.strokeCap = "round";
  local.path.strokeJoin = "round";
  local.path.add(event.point);
};

const onMouseDrag = event => {
  if (!local.path) return;
  local.path.add(event.point);
};

const onMouseUp = event => {
  local.path.add(event.point);
  local.path.simplify();
  history.add(
    new DrawAction({
      path: local.path
    })
  );
  local.path = null;
  if (local.show) local.show.remove();
  local.show = null;
};

const onToggleIn = () => {};
const onToggleOut = () => {
  if (local.show) local.show.remove();
  local.show = null;
};
export const tool = new paper.Tool();
tool.onMouseDown = onMouseDown;
tool.onMouseDrag = onMouseDrag;
tool.onMouseUp = onMouseUp;
tool.onMouseMove = onMouseMove;
tool.onToggleIn = onToggleIn;
tool.onToggleOut = onToggleOut;
