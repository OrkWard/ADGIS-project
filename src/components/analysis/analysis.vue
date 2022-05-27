<template>
  <!-- 空间分析模块 -->
  <div id="space-analysis">
    <!-- 矢量数据处理 -->
    <div class="data-process">
      <!-- 矢量数据处理标题 -->
      <div class="analysis-type-container" @click="processVector">
        <img
          src="../../assets/image/arrow.svg"
          :style="{ transform: 'rotate(' + rotateVector + 'deg)' }"
        />
        <div class="analysis-type">vector data process</div>
      </div>
      <!-- 矢量数据处理具体工具 -->
      <transition name="analysis-tool-container">
        <div v-if="showVector" class="analysis-tool-container">
          <analysis-tool id="analysis-vector-overlay" :toolname="'叠加分析'" />
          <analysis-tool
            id="analysis-vector-intersect"
            :toolname="'相交分析'"
          />
          <analysis-tool id="analysis-vector-crop" :toolname="'裁剪分析'" />
          <analysis-tool id="analysis-vector-fusion" :toolname="'融合分析'" />
          <analysis-tool id="analysis-vector-joint" :toolname="'联合分析'" />
          <analysis-tool id="analysis-vector-negate" :toolname="'交集取反'" />
          <analysis-tool
            id="analysis-vector-geometric"
            :toolname="'几何分析'"
          />
          <analysis-tool id="analysis-vector-vertex" :toolname="'顶点提取'" />
          <analysis-tool
            id="analysis-vector-centerpoint"
            :toolname="'中心点提取'"
          />
          <analysis-tool
            id="analysis-vector-convert"
            :toolname="'点线面转化'"
          />
          <analysis-tool
            id="analysis-vector-reprojection"
            :toolname="'重投影'"
          />
        </div>
      </transition>
    </div>
    <div class="analysis-split" />
    <!-- 栅格数据处理 -->
    <div class="data-process">
      <!-- 栅格数据处理标题 -->
      <div class="analysis-type-container" @click="processRaster">
        <img
          src="../../assets/image/arrow.svg"
          :style="{ transform: 'rotate(' + rotateRaster + 'deg)' }"
        />
        <div class="analysis-type">raster data process</div>
      </div>
      <!-- 栅格数据处理具体工具 -->
      <transition name="analysis-tool-container">
        <div v-if="showRaster" class="analysis-tool-container">
          <analysis-tool id="analysis-raster-registration" :toolname="'配准'" />
          <analysis-tool id="analysis-raster-crop" :toolname="'裁剪'" />
          <analysis-tool
            id="analysis-raster-reprojection"
            :toolname="'重投影'"
          />
          <analysis-tool id="analysis-raster-resampling" :toolname="'重采样'" />
          <analysis-tool
            id="analysis-raster-calculator"
            :toolname="'栅格计算器'"
          />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import AnalysisTool from "./analysis-tool.vue";

export default {
  name: "Analysis",
  components: {
    AnalysisTool
  },
  data() {
    return {
      showVector: false,
      showRaster: false,
      rotateVector: 0,
      rotateRaster: 0
    };
  },
  methods: {
    processVector() {
      this.showVector = !this.showVector;
      this.rotateVector = this.rotateVector == 0 ? 90 : 0;
    },
    processRaster() {
      this.showRaster = !this.showRaster;
      this.rotateRaster = this.rotateRaster == 0 ? 90 : 0;
    }
  }
};
</script>

<style scoped>
img {
  width: 12px;
  margin-right: 5px;
  pointer-events: none;
  transition: 0.3s;
  filter: var(--black-filter);
}

.data-process {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  padding-top: 5px;
  text-transform: capitalize;
}

.analysis-split {
  width: calc(100% - 10px);
  margin: 10px 5px 0;
  border-top: 1px solid var(--default-gray);
}

.analysis-type-container {
  padding: 5px;
  width: fit-content;
  margin: 5px;
  display: flex;
  flex-flow: row nowrap;
  text-transform: capitalize;
  border-radius: 5px;
  cursor: pointer;
}

.analysis-type-container:hover {
  background-color: var(--default-light-gray);
}

.analysis-type {
  margin-right: 5px;
  pointer-events: none;
}

.analysis-tool-container {
  margin-left: 10px;
  display: flex;
  flex-flow: column nowrap;
}

.analysis-tool-container-enter-active,
.analysis-tool-container-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.analysis-tool-container-enter,
.analysis-tool-container-leave-to {
  opacity: 0;
}
</style>
