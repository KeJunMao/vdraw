<template>
  <div class="v-tools">
    <VIconBtn :active="toolName === 'pencil'" @click="setTool('pencil')"
      >edit</VIconBtn
    >
    <VIconBtn :active="toolName === 'eraser'" @click="setTool('eraser')"
      >remove</VIconBtn
    >
  </div>
</template>

<script>
import VIconBtn from "@/components/VIconBtn";

export default {
  components: {
    VIconBtn
  },
  computed: {
    toolName() {
      return this.$store.state.toolName;
    }
  },
  methods: {
    setTool(toolName) {
      this.$store.commit("setTool", toolName);
    }
  }
};
</script>

<style>
.v-tools {
  display: flex;
}
</style>
