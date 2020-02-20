<template>
  <div class="v-header">
    <VPicker></VPicker>
    <div class="v-header-line">|</div>
    <VTools></VTools>
    <div class="v-header-line">|</div>
    <VLayers></VLayers>
    <div class="v-header-line">|</div>
    <VIconBtn title="保存" @click="exportSvg">save</VIconBtn>
    <VIconBtn title="清空画布" @click="clear">clear</VIconBtn>
  </div>
</template>

<script>
import VLayers from "@/components/VLayers";
import VTools from "@/components/VTools";
import VPicker from "@/components/VPicker";
import VIconBtn from "@/components/VIconBtn";
import paper from "paper";
export default {
  components: {
    VLayers,
    VTools,
    VIconBtn,
    VPicker
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
}
.v-header-line {
  margin: 0 6px;
}
</style>
