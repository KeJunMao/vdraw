<template>
  <div class="v-socket">
    <v-popover offset="16">
      <VIconBtn>{{ room ? "cloud_queue" : "cloud_off" }}</VIconBtn>
      <template slot="popover">
        <div class="v-socket-room">
          <template v-if="!room">
            <div>
              <input
                required
                placeholder="*房间名称"
                v-model="inputRoom"
                type="text"
              />
            </div>
            <div>
              <input placeholder="昵称" v-model="inputName" type="text" />
            </div>
            <div>
              <input placeholder="密码" v-model="inputPass" type="password" />
            </div>
          </template>
          <div :disabled="socketLock" class="v-btn" @click="toggleOnline">
            <i class="material-icons">{{ room ? "directions_run" : "send" }}</i
            >{{ room ? "离开" : "加入/创建" }}
          </div>
          <div v-if="room" @click="copyRoomUrl" class="v-btn">
            <i class="material-icons">content_copy</i>分享
          </div>
          <div v-if="room">
            <ul class="v-socket-users">
              <li v-for="user in room.users" :key="user.id">{{ user.name }}</li>
            </ul>
          </div>
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
      inputPass: "",
      inputName: ""
    };
  },
  computed: {
    ...mapState(["room", "socketLock"])
  },
  mounted() {
    const room = this.decodedRoom();
    if (room) {
      this.inputRoom = room.name;
      this.inputPass = room.password;
      this.toggleOnline();
    }
  },
  methods: {
    toggleOnline() {
      if (this.socketLock) return;
      if (this.room) {
        // leave
        this.$store.commit("lockSocket");
        this.$socket.leaveRoom();
        return;
      }
      if (this.verify()) {
        this.$store.commit("setUser", {
          name: this.inputName
        });
        this.$store.commit("lockSocket");
        this.$socket.joinRoom({
          name: this.inputRoom,
          password: this.inputPass
        });
      }
    },
    copyRoomUrl() {
      this.$copyText(this.encodedRoom()).then(() => {
        this.$snakbar("复制成功！发送给好友打开链接即可～");
      });
    },
    encodedRoom() {
      const room = { name: this.inputRoom, password: this.inputPass };
      const base64 = window.btoa(JSON.stringify(room));
      return window.location.origin + "/?" + encodeURIComponent(base64);
    },
    decodedRoom() {
      const roomString = window.location.search.substring(1);
      if (roomString.length < 35) return null;
      try {
        const decodeurl = decodeURIComponent(roomString);
        const roomData = JSON.parse(window.atob(decodeurl));
        if (roomData.name) {
          return roomData;
        }
      } catch {
        this.$snakbar({
          msg: "无效的分享房间！",
          type: "error"
        });
        return null;
      }
    },
    verify() {
      const roomRe = /^[A-Za-z]{1,10}$/;
      if (!roomRe.test(this.inputRoom)) {
        this.$snakbar({
          msg: "请输入合法房间名！" + roomRe,
          type: "warn"
        });
        return false;
      }
      const passRe = /^[A-Za-z0-9]{0,10}$/;
      if (!passRe.test(this.inputPass)) {
        this.$snakbar({
          msg: "请输入合法密码！" + passRe,
          type: "warn"
        });
        return false;
      }
      return roomRe.test(this.inputRoom) && passRe.test(this.inputPass);
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
  text-align: center;
}
.v-socket-room input {
  border-radius: 2px;
  border: 1px solid #abab;
  padding: 6px 8px;
  margin-bottom: 6px;
}
.v-socket-room input[required] {
  border: 1px solid rgba(255, 8, 0, 0.733);
}
.v-btn {
  cursor: pointer;
  display: inline-block;
  min-width: 88px;
  height: 36px;
  box-sizing: border-box;
  padding: 0 16px;
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  line-height: 36px;
  text-align: center;
  border: none;
  border-radius: 2px;
}
.v-btn:hover {
  background-color: #0000001a;
}
.v-btn .material-icons {
  font-size: inherit;
  margin-right: 5px;
  line-height: inherit;
}
.v-btn[disabled="disabled"] {
  background: none;
  cursor: not-allowed;
  color: #ccc;
}
.v-socket-users {
  list-style: none;
  text-align: center;
  padding: 0;
  border-top: 1px solid #ccc;
  padding-top: 10px;
  margin: 6px 8px;
}
</style>
