<template>
  <div @click.stop="$emit('click')" class="v-layer-bg">
    <div class="v-layer-bg-warp">
      <div class="v-layer-bg-buttons">
        <VIconBtn class="v-layer-item-button--hidden" title="隐藏/显示">
          visibility
        </VIconBtn>
      </div>
      <div @click="toggleColorPicker" :style="bgStyle" class="v-layer-bg-bg">
        <VIconBtn
          style="background: #484848;border: 1px #fff solid;"
          color="white"
          :active="showColorPicker"
          >format_color_fill</VIconBtn
        >
      </div>
    </div>
    <CompactPicker v-show="showColorPicker" v-model="color"></CompactPicker>
  </div>
</template>

<script>
import VIconBtn from "@/components/VIconBtn";
import { Compact as CompactPicker } from "vue-color";

export default {
  components: {
    VIconBtn,
    CompactPicker
  },
  data() {
    return {
      color: this.$store.state.canvasArgs.bgColor,
      showColorPicker: false
    };
  },
  computed: {
    canvasColor() {
      if (this.color.hex) {
        return this.color.hex;
      }
      return this.color;
    },
    bgStyle() {
      return `background-color: ${this.canvasColor}fa;`;
    }
  },
  methods: {
    toggleColorPicker() {
      this.showColorPicker = !this.showColorPicker;
    }
  },
  watch: {
    color() {
      this.$store.commit("setCanvasArgs", {
        bgColor: this.canvasColor
      });
    }
  }
};
</script>

<style>
.v-layer-bg-warp {
  display: flex;
  box-sizing: border-box;
}
.v-layer-bg .vc-compact {
  box-shadow: none;
  padding: 0;
  margin: 0 auto;
  width: 160px;
}
.v-layer-bg-buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.v-layer-bg-bg {
  cursor: pointer;
  width: 110px;
  height: 60px;
  margin: 11px 22px 11px 0;
  border-radius: 2px;
  border: 1px #ccc solid;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
