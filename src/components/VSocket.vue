<template>
  <div class="v-socket">
    <v-popover :disabled="!!room" offset="16">
      <VIconBtn @click="toggleOnline">{{
        room ? "cloud_queue" : "cloud_off"
      }}</VIconBtn>
      <template slot="popover">
        <div class="v-socket-room">
          <div>名称：<input v-model="inputRoom" type="text" /></div>
          <div>密码：<input v-model="inputPass" type="password" /></div>
          <div @click="toggleOnline">加入</div>
        </div>
      </template>
    </v-popover>
  </div>
</template>

<script>
import VIconBtn from "@/components/VIconBtn";
import { mapState } from "vuex";
export default {
  components: {
    VIconBtn
  },
  data() {
    return {
      inputRoom: "",
      inputPass: ""
    };
  },
  computed: {
    ...mapState(["room"])
  },
  methods: {
    toggleOnline() {
      if (this.room) {
        // leave
        this.$store.commit("setRoom", null);
        return;
      }
      if (this.verify()) {
        this.$socket.joinRoom({
          name: this.inputRoom,
          password: this.inputPass
        });
      }
    },
    verify() {
      const inputRe = /^[A-Za-z]{1,10}$/;
      const passRe = /^[A-Za-z0-9]{0,10}$/;
      return inputRe.test(this.inputRoom) && passRe.test(this.inputPass);
    }
  }
};
</script>

<style>
.v-socket-room {
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.3), 0 4px 8px rgba(0, 0, 0, 0.3);
  border-radius: 2px;
  background-color: #fff;
  padding: 12px;
  box-sizing: border-box;
}
</style>
