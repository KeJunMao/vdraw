import history from "@/utils/history";
import store from "@/store";
import paper from "paper";
import hotkeys from "hotkeys-js";

export default function(app) {
  hotkeys("b", () => store.commit("setTool", "brush")); // 刷子
  hotkeys("p", () => store.commit("setTool", "pencil")); // 笔
  hotkeys("e", () => store.commit("setTool", "eraser")); // 擦除
  hotkeys("a", () => store.commit("setTool", "select")); // 选择
  hotkeys("ctrl+z", () => history.undo()); // 撤销
  hotkeys("ctrl+shift+z", () => history.redo()); // 重做
  hotkeys("ctrl+0", () => {
    paper.project.view.zoom = 1;
    paper.project.view.center = paper.project.view.size.divide(2);
  }); // 恢复画布缩放、平移
  hotkeys("ctrl+=,ctrl+shift+=,ctrl+-,ctrl+shift+-", (event, handler) => {
    const view = paper.project.view;
    const size = 0.05;
    const shiftSize = 0.5;
    switch (handler.key) {
      case "ctrl+=":
        if (view.zoom + size <= 100) {
          view.zoom += size;
        } else {
          view.zoom = 100;
        }
        break;
      case "ctrl+shift+=":
        if (view.zoom + shiftSize <= 100) {
          view.zoom += shiftSize;
        } else {
          view.zoom = 100;
        }
        break;
      case "ctrl+-":
        if (view.zoom - size >= 0.05) {
          view.zoom -= size;
        } else {
          view.zoom = 0.05;
        }
        break;
      case "ctrl+shift+-":
        if (view.zoom - shiftSize >= 0.05) {
          view.zoom -= shiftSize;
        } else {
          view.zoom = 0.05;
        }
        break;
    }
    app.vdrawArgs.zoom = paper.view.zoom;
  });
  // 下面快捷键在这 src/components/VHeader.vue
  // hotkeys("ctrl+s", this.exportSvg); 保存
  // hotkeys("f1", this.help); 帮助
  // 下面快捷键在这 src/App.vue
  // hotkeys("ctrl+t", this.toggleUi); 切换显示工具
  // 下面快捷键在这 src/components/VLayers.vue
  // hotkeys("ctrl+shift+n", this.addLayer); 新建图层
}
