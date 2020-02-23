<template>
  <div
    @click.stop="$emit('click')"
    class="v-layer-item"
    :class="active ? 'v-layer-item--active' : ''"
  >
    <div class="v-layer-item-buttons">
      <VIconBtn
        title="顺序调整"
        class="handle"
        disabled
        :class="!active ? 'v-layer-item-button--hidden' : ''"
        >vertical_align_center</VIconBtn
      >
      <VIconBtn title="隐藏/显示" @click.stop="toggleVisible">
        {{ layer.visible ? "visibility" : "visibility_off" }}
      </VIconBtn>
      <VIconBtn
        @click="remove()"
        :disabled="paper.project.layers.length <= 1"
        title="删除"
        :class="!active ? 'v-layer-item-button--hidden' : ''"
        >delete</VIconBtn
      >
    </div>
    <div class="v-layer-item-bg">
      <svg
        ref="view"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="112"
        height="112"
        viewBox="0 0 1920 1080"
      ></svg>
    </div>
  </div>
</template>

<script>
import VIconBtn from "@/components/VIconBtn";
import paper from "paper";
export default {
  props: {
    active: Boolean,
    layer: paper.Layer
  },
  data() {
    return {
      paper
    };
  },
  components: {
    VIconBtn
  },
  mounted() {},
  computed: {
    svg() {
      return this.layer.exportSVG();
    }
  },
  watch: {
    svg() {
      this.$refs.view.innerHTML = "";
      this.$refs.view.appendChild(this.svg);
    }
  },
  methods: {
    toggleVisible() {
      this.$emit("toggleVisible");
      this.$forceUpdate();
    },
    remove() {
      this.$emit("remove");
    }
  }
};
</script>

<style>
.v-layer-item {
  display: flex;
  padding: 6px 0;
  box-sizing: border-box;
}
.v-layer-item--active {
  background-color: #f1f3f4;
}

.v-layer-item-buttons {
  display: flex;
  flex-direction: column;
}
.v-layer-item-button--hidden {
  visibility: hidden;
}
.v-layer-item-bg {
  --square-color: #ccc;
  background-color: #fff;
  background-image: linear-gradient(
      45deg,
      var(--square-color) 26%,
      #0000 25%,
      #0000 75%,
      var(--square-color) 75%,
      var(--square-color)
    ),
    linear-gradient(
      45deg,
      var(--square-color) 26%,
      #0000 25%,
      #0000 75%,
      var(--square-color) 75%,
      var(--square-color)
    );
  background-position: -2px -2px, 4px 4px;
  background-size: 12px 12px;
  width: 110px;
  height: 110px;
  margin: 11px 22px 11px 0;
  border-radius: 2px;
  border: 1px #ccc solid;
}
.v-layer-item--active .v-layer-item-bg {
  border-color: blue;
}
</style>
