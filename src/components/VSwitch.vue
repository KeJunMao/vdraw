<template>
  <div class="v-switch">
    <div class="v-switch--text"><slot></slot></div>
    <label class="v-switch-warp">
      <input
        :disabled="disabled"
        :checked="value"
        @change="toggle"
        type="checkbox"
      />
      <i class="v-switch-icon"></i>
    </label>
  </div>
</template>

<script>
export default {
  model: {
    prop: "value",
    event: "toggle"
  },
  props: {
    value: Boolean,
    disabled: Boolean
  },
  methods: {
    toggle: function(e) {
      this.$emit("toggle", e.target.checked);
    }
  }
};
</script>

<style>
.v-switch {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.v-switch-warp {
  display: inline-block;
  height: 36px;
  line-height: 36px;
  cursor: pointer;
  user-select: none;
}
.v-switch-warp input {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
  opacity: 0;
}
.v-switch-icon {
  position: relative;
  display: inline-block;
  width: 36px;
  height: 14px;
  vertical-align: middle;
  border-radius: 14px;
  transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: #bda1f3;
}

.v-switch-warp input:checked + .v-switch-icon:before {
  left: 20px;
  background-color: #6200ee;
}
.v-switch-icon:before {
  position: absolute;
  top: -3px;
  left: -3px;
  display: inline-block;
  width: 20px;
  height: 20px;
  content: " ";
  background-color: #fafafa;
  border-radius: 20px;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
  transition: box-shadow 0.14s cubic-bezier(0.4, 0, 0.2, 1),
    background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.v-switch-warp input[type="checkbox"]:disabled + .v-switch-icon {
  background-color: #0000001a !important;
}
.v-switch-warp input[type="checkbox"]:disabled + .v-switch-icon:before {
  background-color: #bdbdbd !important;
}
.v-switch--text {
  font-size: 14px;
}
</style>
