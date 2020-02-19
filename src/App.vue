<template>
  <div>
    <div class="v-ui">
      <VHeader></VHeader>
    </div>
  </div>
</template>

<script>
import VHeader from "@/components/VHeader";
import paper from "paper";
export default {
  components: {
    VHeader
  },
  created() {
    paper.setup(document.getElementById("canvas"));
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
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
