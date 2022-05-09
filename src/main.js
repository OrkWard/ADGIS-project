import Vue from "vue";
import MainPage from "./MainPage.vue";
import router from "./router";
import store from "./store";
import './style/root.css'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  components: { MainPage },
  template: "<MainPage/>"
}).$mount("#app");
