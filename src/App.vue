<template>
  <div>
    <div v-if="isInit" class="v-ui">
      <VHeader></VHeader>
    </div>
    <div v-if="isInit" class="pan-and-zoom">
      大小: {{ vdrawArgs.size.width | toFixed }} *
      {{ vdrawArgs.size.height | toFixed }} 缩放:
      {{ (vdrawArgs.zoom * 100) | toFixed }}%
    </div>
    <canvas
      @wheel="panAndZoom"
      :style="cursor + canvasBg"
      ref="canvas"
      resize
    ></canvas>
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
    canvasBg() {
      return `background-color: ${this.$store.state.canvasArgs.bgColor}fa;`;
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
    this.vdrawArgs.zoom = paper.view.zoom;
    this.isInit = true;
    document.addEventListener("keyup", hotkey);
    paper.project.importJSON(window.localStorage.vdarw || []);
  },
  methods: {
    panAndZoom(event) {
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
        view.zoom = newZoom;
        view.center = paper.view.center.add(offset);
      } else if (event.shiftKey) {
        const delta = new paper.Point(-event.deltaX, -event.deltaY)
          .divide(view.scaling)
          .rotate(-view.rotation, new paper.Point());
        view.translate(delta);
      }
      this.vdrawArgs.zoom = view.zoom;
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
  background: rgba(238, 238, 238, 0.5);
  color: white;
  padding: 0 6px;
  border-radius: 2px;
  font-size: 10px;
}
.snack-bar-wrap .snack-bar {
  font-size: 13px;
  padding: 6px 8px !important;
}
</style>
