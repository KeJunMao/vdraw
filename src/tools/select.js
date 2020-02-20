import paper from "paper";

const local = {
  prevSelection: null
};

function deselect() {
  if (local.prevSelection) {
    var item = local.prevSelection.path || local.prevSelection;
    item.bounds.selected = false;
    item.selected = false;
    local.prevSelection.selected = false;
    local.prevSelection = null;
  }
}

const onMouseDown = event => {
  deselect();
  var result = paper.project.hitTest(event.point, {
    tolerance: 4,
    fill: true,
    stroke: true,
    segments: true
  });
  let selection = result && result.item;
  if (selection) {
    const handle = result.type === "segment";
    selection.bounds.selected = !handle;
    if (handle) selection = result.segment;
    selection.selected = true;
  }
  local.prevSelection = selection;
};

const onToggleOut = () => {
  deselect();
};

export const tool = new paper.Tool();
tool.onMouseDown = onMouseDown;
tool.onToggleOut = onToggleOut;
