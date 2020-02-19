<template>
  <div class="v-header">
    <VLayers></VLayers>
  </div>
</template>

<script>
import VLayers from "@/components/VLayers";

export default {
  components: {
    VLayers
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
</style>
