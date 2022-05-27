import Vue from "vue";
import MainPage from "./main-page.vue";
import router from "./router";
import store from "./store";
import "./style/root.css";
import "animate.css";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  components: { MainPage },
  template: "<main-page/>"
}).$mount("#app");
