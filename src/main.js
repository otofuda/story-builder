import Vue from "vue";
import App from "./App.vue";
import "./plugins/element.js";
import "kitstrap/d/kitstrap.css";
import "kitstrap/d/kitstrap-font.css";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
