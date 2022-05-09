import Vue from "vue";
import MainPage from "./MainPage.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  components: { MainPage },
  template: "<MainPage/>"
}).$mount("#app");
