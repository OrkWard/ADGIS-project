import Vue from "vue";
import MainPage from "./main-page.vue";
import router from "./router";
import store from "./store";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./style/root.css";
import "animate.css";

Vue.config.productionTip = false;
Vue.use(Element);

new Vue({
  router,
  store,
  components: { MainPage },
  template: "<main-page/>"
}).$mount("#app");
