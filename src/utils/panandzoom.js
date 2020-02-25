import paper from "paper";
export default class PanAndZoom {
  changeZoom(oldZoom, delta) {
    const factor = 1.05;
    if (delta < 0) {
      return oldZoom * factor;
    }
    if (delta > 0) {
      return oldZoom / factor;
    }
    return oldZoom;
  }
  changeCenter(oldCenter, deltaX, deltaY, factor) {
    let offset = new paper.Point(deltaX, -deltaY);
    offset = offset.multiply(factor);
    return oldCenter.add(offset);
  }
  stableZoom(oldZoom, delta, c, p) {
    const newZoom = this.changeZoom(oldZoom, delta);
    const beta = oldZoom / newZoom;
    const pc = p.subtract(c);
    const a = p.subtract(pc.multiply(beta)).subtract(c);
    return [newZoom, a];
  }
}

export function panAndZoom(event) {
  const view = paper.project.view;
  if (event.altKey) {
    const mousePosition = new paper.Point(event.offsetX, event.offsetY);
    const viewPosition = view.viewToProject(mousePosition);
    const _ref = new PanAndZoom().stableZoom(
      view.zoom,
      event.deltaY,
      view.center,
      viewPosition
    );
    const newZoom = _ref[0];
    const offset = _ref[1];
    if (newZoom <= 0.05 || newZoom >= 100) return;
    view.zoom = newZoom;
    view.center = paper.view.center.add(offset);
  } else if (event.shiftKey) {
    const delta = new paper.Point(-event.deltaX, -event.deltaY)
      .divide(view.scaling)
      .rotate(-view.rotation, new paper.Point());
    view.translate(delta);
  }
}
