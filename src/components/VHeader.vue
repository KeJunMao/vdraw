<template>
  <div class="v-header">
    <VPicker></VPicker>
    <div class="v-header-line">|</div>
    <VTools></VTools>
    <div class="v-header-line">|</div>
    <VIconBtn :disabled="!history.canUndo()" title="撤销(Ctrl+Z)" @click="undo"
      >undo</VIconBtn
    >
    <VIconBtn
      :disabled="!history.canRedo()"
      title="重做(Ctrl+Shift+Z)"
      @click="redo"
      >redo</VIconBtn
    >
    <div class="v-header-line">|</div>
    <VLayers></VLayers>
    <div class="v-header-line">|</div>
    <VIconBtn title="保存(Ctrl+S)" @click="exportSvg">save</VIconBtn>
    <VIconBtn title="清空画布" @click="clear">clear</VIconBtn>
    <VIconBtn title="帮助(F1)" @click="help">help</VIconBtn>
    <div class="v-header-line">|</div>
    <VSocket></VSocket>
  </div>
</template>

<script>
import VLayers from "@/components/VLayers";
import VTools from "@/components/VTools";
import VPicker from "@/components/VPicker";
import VIconBtn from "@/components/VIconBtn";
import VSocket from "@/components/VSocket";
import paper from "paper";
import history from "@/utils/history";
import { clearProject, createLayer } from "@/utils/shared";
import socket from "@/utils/socket";
import hotkeys from "hotkeys-js";
export default {
  components: {
    VLayers,
    VTools,
    VIconBtn,
    VPicker,
    VSocket
  },
  data() {
    return {
      history
    };
  },
  mounted() {
    hotkeys("ctrl+s", this.exportSvg);
    hotkeys("f1", this.help);
  },
  methods: {
    exportSvg(fileName) {
      if (!fileName || typeof fileName !== "string") {
        fileName = "vdraw_example.svg";
      }

      var url =
        "data:image/svg+xml;utf8," +
        encodeURIComponent(paper.project.exportSVG({ asString: true }));

      var link = document.createElement("a");
      link.download = fileName;
      link.href = url;
      link.click();
    },
    clear() {
      clearProject();
      createLayer();
      socket.sendAction({
        type: "clear",
        data: {
          json: paper.project.exportJSON()
        }
      });
    },
    help() {
      window.open(
        `${window.location.protocol}//${window.location.host}/help.html`,
        "_blank"
      );
    },
    undo() {
      history.undo();
    },
    redo() {
      history.redo();
    }
  }
};
</script>

<style>
.v-header {
  display: flex;
  align-items: center;
  padding: 20px;
  justify-content: center;
  flex-wrap: wrap;
}
.v-header-line {
  margin: 0 6px;
}
</style>
