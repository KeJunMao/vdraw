<template>
  <div>
    <div v-if="isInit" class="v-ui">
      <VHeader></VHeader>
    </div>
    <div v-if="isInit" class="pan-and-zoom">
      大小: {{ vdrawArgs.size.width | toFixed }} *
      {{ vdrawArgs.size.height | toFixed }} 位置:
      {{ vdrawArgs.center.x | toFixed }},{{
        vdrawArgs.center.y | toFixed
      }}
      缩放: {{ (vdrawArgs.zoom * 100) | toFixed }}%
    </div>
    <canvas @wheel="panAndZoom" :style="cursor" ref="canvas" resize></canvas>
  </div>
</template>

<script>
import VHeader from "@/components/VHeader";
import paper from "paper";
import PanAndZoom from "@/utils/panandzoom";
import hotkey from "@/utils/hotkey";
export default {
  components: {
    VHeader
  },
  data() {
    return {
      isInit: false,
      vdrawArgs: {
        size: {
          width: 0,
          height: 0
        },
        center: {
          x: 0,
          y: 0
        },
        zoom: 0
      }
    };
  },
  computed: {
    cursor() {
      const tool = this.$store.state.toolName;
      if (tool === null || tool === "brush") return `cursor: auto;`;
      if (tool !== "select") return `cursor: none;`;
      return `cursor: auto;`;
    },
    canvas() {
      return this.$refs.canvas;
    }
  },
  created() {
    paper.tool = null;
  },
  mounted() {
    paper.setup(this.canvas);
    this.vdrawArgs.size = paper.view.size;
    this.vdrawArgs.center = paper.view.center;
    this.vdrawArgs.zoom = paper.view.zoom;
    this.isInit = true;
    document.addEventListener("keyup", hotkey);
  },
  methods: {
    panAndZoom(event) {
      if (event.shiftKey) {
        let lowestDelta;
        const absDelta = Math.max(
          Math.abs(event.deltaY),
          Math.abs(event.deltaX)
        );

        if (!lowestDelta || absDelta < lowestDelta) {
          lowestDelta = absDelta;
        }
        const deltaFactor = lowestDelta;

        // do pan
        paper.view.center = new PanAndZoom().changeCenter(
          paper.view.center,
          event.deltaX,
          event.deltaY,
          deltaFactor
        );
      }
      if (event.altKey) {
        // do zoom
        const mousePosition = new paper.Point(event.offsetX, event.offsetY);
        const viewPosition = paper.view.viewToProject(mousePosition);
        const _ref = new PanAndZoom().stableZoom(
          paper.view.zoom,
          event.deltaY,
          paper.view.center,
          viewPosition
        );
        const newZoom = _ref[0];
        const offset = _ref[1];
        paper.view.zoom = newZoom;
        paper.view.center = paper.view.center.add(offset);
      }
      this.vdrawArgs.center = paper.view.center;
      this.vdrawArgs.zoom = paper.view.zoom;
    }
  },
  filters: {
    toFixed(value) {
      return value.toFixed(2);
    }
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
canvas {
  width: 100%;
  height: 100vh;
}
.v-ui {
  background-color: white;
  position: absolute;
  width: 100%;
}
.pan-and-zoom {
  position: absolute;
  right: 0;
  bottom: 0;
  background: #ccc;
  color: white;
  padding: 0 6px;
  border-radius: 2px;
  opacity: 0.5;
}
</style>
