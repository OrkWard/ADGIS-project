import Vue from "vue";
import VueRouter from "vue-router";
import Coverage from "../components/coverage/coverage.vue";
import Assets from "../components/asset/assets.vue";
import Upload from "../components/upload/upload.vue";
import Analysis from "../components/analysis/analysis.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/assets", component: Assets },
  { path: "/coverage", component: Coverage },
  { path: "/upload", component: Upload },
  { path: "/analysis", component: Analysis }
];

const router = new VueRouter({
  routes
});

export default router;
