<template>
  <div class="v-tools">
    <VIconBtn
      title="画笔"
      :active="toolName === 'pencil'"
      @click="setTool('pencil')"
      >edit</VIconBtn
    >
    <VIconBtn
      title="擦除"
      :active="toolName === 'eraser'"
      @click="setTool('eraser')"
      >remove</VIconBtn
    >
    <VIconBtn
      title="选择"
      :active="toolName === 'select'"
      @click="setTool('select')"
      >select_all</VIconBtn
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
