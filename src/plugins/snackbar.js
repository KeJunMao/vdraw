import SnackbarComponent from "vuejs-snackbar";

const Snackbar = {};

Snackbar.install = function(Vue) {
  const SnakbarConstructor = Vue.extend(SnackbarComponent);
  const instance = new SnakbarConstructor();
  instance.position = "bottom-center";
  instance.$mount(document.createElement("div"));
  document.body.appendChild(instance.$el);
  Vue.prototype.$snakbar = (msg, opts = {}) => {
    if (typeof msg !== "string") {
      opts = msg;
      msg = opts.msg;
    }
    opts.type = opts.type || "open";
    if (instance[opts.type]) instance[opts.type](msg);
  };
};

export default Snackbar;
