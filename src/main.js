import Vue from "vue";
import MainPage from "./main-page.vue";
import router from "./router";
import store from "./store";
import "./style/root.css";
import "animate.css";

Vue.config.productionTip = false;
Vue.prototype.$hostname = "http://10.185.22.111:8000/";

new Vue({
  router,
  store,
  components: { MainPage },
  template: "<main-page/>"
}).$mount("#app");
