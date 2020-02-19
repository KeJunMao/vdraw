<template>
  <div @click="handleClick" class="v-icon-btn" :class="iconClass">
    <i :style="fontSize" class="material-icons">
      <slot></slot>
    </i>
  </div>
</template>

<script>
export default {
  props: {
    active: Boolean,
    disabled: Boolean,
    size: {
      default: 20,
      type: Number
    }
  },
  computed: {
    iconClass() {
      if (this.disabled) {
        return `v-icon-btn--disabled`;
      } else if (this.active) {
        return `v-icon-btn--active`;
      }
      return "";
    },
    fontSize() {
      return `font-size:${this.size}px;`;
    }
  },
  methods: {
    handleClick(e) {
      if (this.disabled) return;
      this.$emit("click", e);
    }
  }
};
</script>

<style>
.v-icon-btn {
  cursor: pointer;
  border-radius: 50%;
  box-sizing: border-box;
  padding: 6px;
  margin: 6px;
  display: flex;
  justify-content: center;
}
.v-icon-btn:hover {
  background-color: #0000000a;
}
.v-icon-btn--active {
  background-color: #00000020;
}
.v-icon-btn--disabled {
  color: #00000080;
}
.v-icon-btn--disabled:hover {
  background: none;
  cursor: not-allowed;
}
</style>
