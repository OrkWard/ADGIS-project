<template>
  <!-- 空间分析模块 -->
  <div id="space-analysis">
    <div class="data-process">
      vector data process
    </div>
    <analysis-tool id="analysis-vector-overlay" :toolname="'叠加分析'" />
    <analysis-tool id="analysis-vector-intersect" :toolname="'相交分析'" />
    <analysis-tool id="analysis-vector-crop" :toolname="'裁剪分析'" />
    <analysis-tool id="analysis-vector-fusion" :toolname="'融合分析'" />
    <analysis-tool id="analysis-vector-joint" :toolname="'联合分析'" />
    <analysis-tool id="analysis-vector-negate" :toolname="'交集取反'" />
    <analysis-tool id="analysis-vector-geometric" :toolname="'几何分析'" />
    <analysis-tool id="analysis-vector-vertex" :toolname="'顶点提取'" />
    <analysis-tool id="analysis-vector-centerpoint" :toolname="'中心点提取'" />
    <analysis-tool id="analysis-vector-convert" :toolname="'点线面转化'" />
    <analysis-tool id="analysis-vector-reprojection" :toolname="'重投影'" />
    <div class="data-process">
      raster data process
    </div>
    <analysis-tool id="analysis-raster-registration" :toolname="'配准'" />
    <analysis-tool id="analysis-raster-crop" :toolname="'裁剪'" />
    <analysis-tool id="analysis-raster-reprojection" :toolname="'重投影'" />
    <analysis-tool id="analysis-raster-resampling" :toolname="'重采样'" />
    <analysis-tool id="analysis-raster-calculator" :toolname="'栅格计算器'" />
  </div>
</template>

<script>
import AnalysisTool from "./analysis-tool.vue";

export default {
  name: "Analysis",
  components: {
    AnalysisTool
  }
};
</script>

<style scoped>
.data-process {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  padding: 10px;
  width: fill-available;
  margin-top: 5px;
  text-transform: capitalize;
  background-color: var(--main-color);
  color: white;
  font-size: 130%;
}
</style>
