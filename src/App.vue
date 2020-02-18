<template>
  <canvas resize ref="canvas"></canvas>
</template>

<script>
export default {
  mounted() {
    this.$paper.setup(this.canvas);
  },
  computed: {
    canvas() {
      return this.$refs.canvas;
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
</style>
