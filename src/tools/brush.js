import paper from "paper";
import history from "@/utils/history";
import { DrawAction } from "@/utils/actions";
import store from "@/store";
const local = {
  path: null,
  carryLength: 0
};

const onMouseDown = () => {
  local.path = new paper.Path();
  local.path.fillColor = store.state.brushArgs.color;
};

const onMouseDrag = event => {
  if (!local.path) return;
  if (event.delta.length > 1) {
    var step = event.delta;
    step.angle = step.angle + 90;
    const stepReci = step
      .normalize()
      .multiply(store.state.brushArgs.size)
      .multiply(1 / step.length);
    var top = event.middlePoint.add(stepReci);
    var bottom = event.middlePoint.subtract(stepReci);

    local.carryLength = local.carryLength + step.length;
    if (local.carryLength > stepReci.length) {
      local.path.add(top);
      local.path.insert(0, bottom);
      local.path.smooth();
      local.carryLength = 0;
    }
  }
};

const onMouseUp = () => {
  if (store.state.brushArgs.shake) {
    local.path.simplify();
  }
  history.add(
    new DrawAction({
      path: local.path
    })
  );
  local.path = null;
};

const onToggleIn = () => {};
const onToggleOut = () => {};
export const tool = new paper.Tool();
tool.onMouseDown = onMouseDown;
tool.onMouseDrag = onMouseDrag;
tool.onMouseUp = onMouseUp;
tool.onToggleIn = onToggleIn;
tool.onToggleOut = onToggleOut;
