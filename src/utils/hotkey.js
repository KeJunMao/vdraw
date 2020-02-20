import history from "@/utils/history";
import store from "@/store";
export default function({ key, ctrlKey, shiftKey, altKey }) {
  if (!ctrlKey && !shiftKey && !altKey) {
    if (key === "b") {
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
