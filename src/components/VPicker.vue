<template>
  <div class="v-picker">
    <v-popover :disabled="disabledSize" offset="16">
      <VIconBtn :disabled="disabledSize" title="大小">lens</VIconBtn>
      <template slot="popover">
        <div class="v-size-picker">
          <VueSlider v-model="size" :min="1"></VueSlider>
          <div class="v-size-picker-preview">
            <div
              :style="previewDotStyle"
              class="v-size-picker-preview-dot"
            ></div>
          </div>
        </div>
      </template>
    </v-popover>
    <v-popover :disabled="disabledColor" offset="16">
      <VIconBtn :disabled="disabledColor" title="颜色" :color="color"
        >color_lens</VIconBtn
      >
      <template slot="popover">
        <ChromePicker v-model="color"></ChromePicker>
      </template>
    </v-popover>
  </div>
</template>

<script>
import { Chrome as ChromePicker } from "vue-color";
import VIconBtn from "@/components/VIconBtn";
import { mapState } from "vuex";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/material.css";
export default {
  components: {
    VIconBtn,
    ChromePicker,
    VueSlider
  },
  data() {
    return {
      color: "#000000",
      size: 1
    };
  },
  computed: {
    ...mapState(["toolName"]),
    toolArgs() {
      return this.$store.state[this.toolName + "Args"] || {};
    },
    previewDotStyle() {
      return `width: ${this.size}px;height: ${
        this.size
      }px;background-color: ${this.color.hex8 || this.color}`;
    },
    disabledColor() {
      return this.toolName === null;
    },
    disabledSize() {
      return this.toolName === null;
    }
  },
  watch: {
    toolName() {
      if (this.toolArgs.color) {
        this.color = this.toolArgs.color;
      }
      if (this.toolArgs.size) {
        this.size = this.toolArgs.size;
      }
    },
    color() {
      if (this.toolArgs.color) {
        this.$store.commit("setArgs", {
          toolName: this.toolName,
          color: this.color.hex8
        });
      }
    },
    size() {
      if (this.toolArgs.size) {
        this.$store.commit("setArgs", {
          toolName: this.toolName,
          size: this.size
        });
      }
    }
  }
};
</script>

<style>
.v-picker {
  display: flex;
}
.v-size-picker {
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.3), 0 4px 8px rgba(0, 0, 0, 0.3);
  border-radius: 2px;
  background-color: #fff;
  padding: 12px;
  box-sizing: border-box;
}
.v-size-picker-preview {
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
  border-radius: 2px;
  border: 1px #ccc solid;
  margin-top: 12px;
  display: flex;
}
.v-size-picker-preview-dot {
  margin: auto;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
</style>
