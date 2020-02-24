import history from "@/utils/history";
import store from "@/store";
import paper from "paper";
export default function({ key, ctrlKey, shiftKey, altKey }) {
  if (!ctrlKey && !shiftKey && !altKey) {
    if (key === "b") {
      store.commit("setTool", "brush");
    }
    if (key === "p") {
      store.commit("setTool", "pencil");
    }
    if (key === "e") {
      store.commit("setTool", "eraser");
    }
    if (key === "a") {
      store.commit("setTool", "select");
    }
    return;
  }
  if (ctrlKey) {
    if (key === "z") {
      history.undo();
    }
    if (key === "y") {
      history.redo();
    }
    if (key === "0") {
      paper.project.view.zoom = 1;
      paper.project.view.center = paper.project.view.size.divide(2);
    }
    return;
  }
  if (shiftKey) {
    // do
    return;
  }
  if (altKey) {
    // do
    return;
  }
}
