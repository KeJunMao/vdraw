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

      /* 2do could be nicer */
      // if (stepReci.length > 5) {
      //   //needs to be there that fast strokes do not get spikes

      //   local.frontDrip = new paper.Path({
      //     fillColor: store.state.brushArgs.color
      //   });

      //   local.frontDrip.add(top);
      //   local.frontDrip.add(bottom);
      //   local.frontDrip.add(event.middlePoint.add(event.delta)); //times 2 to bring it a bit more in front of the mouse

      //   local.frontDrip.closed = true;
      //   local.frontDrip.smooth();

      //   //delete all the handles that we dont need, 2do just normalize in direction of the
      //   local.frontDrip.firstCurve.segment2.handleOut = new paper.Point(
      //     0,
      //     0
      //   ).add(event.delta);
      //   local.frontDrip.firstCurve.segment2.handleIn = new paper.Point(0, 0);
      //   local.frontDrip.lastCurve.segment2.handleOut = new paper.Point(0, 0);
      //   local.frontDrip.lastCurve.segment2.handleIn = new paper.Point(0, 0).add(
      //     event.delta
      //   );

      //   //frontDrip.firstCurve.selected = true;
      //   //frontDrip.lastCurve.selected = true;
      // }

      local.carryLength = 0;
    }
  }
};

const onMouseUp = () => {
  local.path.simplify();
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
