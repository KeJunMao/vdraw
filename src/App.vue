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
    <canvas :style="cursor + canvasBg" ref="canvas" id="canvas" resize></canvas>
  </div>
</template>

<script>
import VHeader from "@/components/VHeader";
import setup from "@/utils/setup";
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
  mounted() {
    setup(this);
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
