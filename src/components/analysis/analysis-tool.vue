<template>
  <div>
    <div class="analysis-tool-style" @click="callTool">
      {{ toolname }}
    </div>
    <div :id="toolname"></div>
  </div>
</template>

<script>
import AnalysisPanel from "./analysis-panel.vue";
import vue from "vue";

export default {
  props: ["toolname"],
  methods: {
    callTool() {
      const panelNode = new (vue.extend(AnalysisPanel))({
        propsData: this.toolname
      }).$mount();
      panelNode.toolname = this.toolname;
      document.querySelector("#" + this.toolname).appendChild(panelNode.$el);
    }
  }
};
</script>

<style scoped>
.analysis-tool-style {
  display: flex;
  flex-flow: column nowrap;
  margin-left: 12px;
  margin-top: 2px;
  padding: 5px;
  width: 80%;
  border-radius: 5px;
  cursor: pointer;
}

.analysis-tool-style:hover {
  background-color: var(--default-light-gray);
}
</style>
