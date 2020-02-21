<template>
  <div class="v-tools">
    <VIconBtn
      title="刷子(B)"
      :active="toolName === 'brush'"
      @click="setTool('brush')"
      >brush</VIconBtn
    >
    <VIconBtn
      title="画笔(P)"
      :active="toolName === 'pencil'"
      @click="setTool('pencil')"
      >edit</VIconBtn
    >
    <VIconBtn
      title="擦除(E)"
      :active="toolName === 'eraser'"
      @click="setTool('eraser')"
      >remove</VIconBtn
    >
    <VIconBtn
      title="选择(A)"
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
