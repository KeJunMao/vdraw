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
