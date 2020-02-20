<template>
  <div class="v-header">
    <VPicker></VPicker>
    <div class="v-header-line">|</div>
    <VTools></VTools>
    <div class="v-header-line">|</div>
    <VIconBtn :disabled="!history.canUndo()" title="撤销(Ctrl+Z)" @click="undo"
      >undo</VIconBtn
    >
    <VIconBtn :disabled="!history.canRedo()" title="重做(Ctrl+Y)" @click="redo"
      >redo</VIconBtn
    >
    <div class="v-header-line">|</div>
    <VLayers></VLayers>
    <div class="v-header-line">|</div>
    <VIconBtn title="保存" @click="exportSvg">save</VIconBtn>
    <VIconBtn title="清空画布" @click="clear">clear</VIconBtn>
    <VIconBtn title="帮助" @click="help">help</VIconBtn>
  </div>
</template>

<script>
import VLayers from "@/components/VLayers";
import VTools from "@/components/VTools";
import VPicker from "@/components/VPicker";
import VIconBtn from "@/components/VIconBtn";
import paper from "paper";
import history from "@/utils/history";
export default {
  components: {
    VLayers,
    VTools,
    VIconBtn,
    VPicker
  },
  data() {
    return {
      history
    };
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
      paper.project.clear();
      history.clear();
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
