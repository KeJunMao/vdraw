import Vue from "vue";
import paper from "paper";
import App from "./App.vue";
import store from "./store";
import "./registerServiceWorker";

paper.install(window);
Vue.prototype.$paper = paper;
Vue.prototype.$store = store;

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
