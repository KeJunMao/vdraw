<template>
  <div class="v-header">
    <VTools></VTools>
    |
    <VLayers></VLayers>
  </div>
</template>

<script>
import VLayers from "@/components/VLayers";
import VTools from "@/components/VTools";
export default {
  components: {
    VLayers,
    VTools
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
