import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "./static/base.css";
import "./static/index.css";
import "./App.css";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store
}).$mount("#app");
