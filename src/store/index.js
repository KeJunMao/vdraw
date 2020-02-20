import Vue from "vue";
import Vuex from "vuex";
import tools from "@/tools/index";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    toolName: null,
    pencilArgs: {
      color: "#000000",
      size: 10
    },
    eraserArgs: {
      size: 20
    }
  },
  mutations: {
    setTool(state, toolName) {
      if (state.toolName && tools[state.toolName].onToggleOut) {
        tools[state.toolName].onToggleOut();
      }
      state.toolName = toolName;
      if (tools[toolName]) {
        tools[toolName].activate();
        if (tools[toolName].onToggleIn) {
          tools[toolName].onToggleIn();
        }
      }
    },
    setArgs(state, { toolName, color, size }) {
      const tool = state[toolName + "Args"];
      tool.color = color || tool.color;
      tool.size = size || tool.size;
    }
  },
  actions: {},
  modules: {}
});
