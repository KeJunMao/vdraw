import Vue from "vue";
import Vuex from "vuex";
import tools from "@/tools/index";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    toolName: null
  },
  mutations: {
    setTool(state, toolName) {
      state.toolName = toolName;
      if (tools[toolName]) {
        tools[toolName].activate();
      }
    }
  },
  actions: {},
  modules: {}
});
