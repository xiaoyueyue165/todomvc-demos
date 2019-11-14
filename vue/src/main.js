import Vue from "vue";
import App from "./App.vue";
import "./static/base.css";
import "./static/index.css";
import "./App.css";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
