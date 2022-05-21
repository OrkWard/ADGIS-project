import Vue from "vue";
import VueRouter from "vue-router";
import Coverage from "../components/coverage.vue";
import Assets from "../components/assets.vue";
import Upload from "../components/upload.vue";
import Analysis from "../components/analysis.vue";

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
