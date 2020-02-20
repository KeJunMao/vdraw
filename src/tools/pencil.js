import paper from "paper";
import history from "@/utils/history";
import { DrawAction } from "@/utils/actions";
import store from "@/store";
const local = {
  path: null
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
};
export const tool = new paper.Tool();
tool.onMouseDown = onMouseDown;
tool.onMouseDrag = onMouseDrag;
tool.onMouseUp = onMouseUp;
