import paper from "paper";
import history from "@/utils/history";
import { DrawAction } from "@/utils/actions";

const local = {
  path: null
};

const onMouseDown = event => {
  local.path = new paper.Path();
  local.path.strokeColor = "black";
  local.path.strokeWidth = "5";
  local.path.add(event.point);
};

const onMouseDrag = event => {
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
export const tool = new paper.Tool();
tool.onMouseDown = onMouseDown;
tool.onMouseDrag = onMouseDrag;
tool.onMouseUp = onMouseUp;
