<template>
  <div>
    <div v-if="isInit" class="v-ui">
      <VHeader></VHeader>
    </div>
    <canvas :style="cursor" id="canvas" resize></canvas>
  </div>
</template>

<script>
import VHeader from "@/components/VHeader";
import paper from "paper";
export default {
  components: {
    VHeader
  },
  data() {
    return {
      isInit: false
    };
  },
  computed: {
    cursor() {
      if (this.$store.state.toolName) return `cursor: none;`;
      return `cursor: auto;`;
    }
  },
  created() {
    paper.tool = null;
  },
  mounted() {
    paper.setup("canvas");
    this.isInit = true;
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
</style>
