import Vue from "vue";
import paper from "paper";
import App from "./App.vue";
import store from "./store";
import "./registerServiceWorker";
import VTooltip from "v-tooltip";
import socket from "@/utils/socket";
import Snackbar from "@/plugins/snackbar";
import VueClipboard from "vue-clipboard2";

paper.install(window);
Vue.prototype.$store = store;
Vue.prototype.$socket = socket;
Vue.config.productionTip = false;

Vue.use(VTooltip);
Vue.use(Snackbar);
Vue.use(VueClipboard);

export default new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
