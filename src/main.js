import Vue from "vue";
import paper from "paper";
import App from "./App.vue";
import store from "./store";
import "./registerServiceWorker";
import VTooltip from "v-tooltip";

paper.install(window);
Vue.prototype.$store = store;

Vue.config.productionTip = false;

Vue.use(VTooltip);

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
