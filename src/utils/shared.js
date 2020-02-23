import uuid4 from "uuid4";
import paper from "paper";
import history from "@/utils/history";
export const createLayer = id => {
  if (!id) id = uuid4();
  let layer = new paper.Layer({
    name: id
  });
  paper.project.addLayer(layer);
  return layer;
};

export const clearProject = () => {
  paper.project.clear();
  history.clear();
  return paper.project;
};
