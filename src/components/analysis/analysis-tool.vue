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
import vue from "vue"

function createPanel(props) {
  // console.log()
  const panelNode = new (vue.extend(AnalysisPanel))({ propsData: props }).$mount();
  panelNode.toolname = props;
  document.querySelector('#' + props).appendChild(panelNode.$el);
  // panelNode.remove =()=> {
  //   document.removeChild(panelNode.$el);
  //   panelNode.$destroy();//将vue 的实例对象销毁
  // }
}

export default {
  props: ["toolname"],
  methods: {
    callTool() {
      createPanel(this.toolname)
      switch (this.toolname) {
        case "叠加分析":
          alert("调用叠加分析工具");
          break;
        case "相交分析":
          // 调用相应的后端python工具
          break;
        case "裁剪分析":
          alert(11);
          break;
        case "融合分析":
          alert(11);
          break;
        case "联合分析":
          alert(11);
          break;
        case "交集取反":
          alert(11);
          break;
        case "几何分析":
          alert(11);
          break;
        case "顶点提取":
          alert(11);
          break;
        case "中心点提取":
          alert(11);
          break;
        case "点线面转化":
          alert(11);
          break;
        case "重投影":
          alert(11);
          break;
      }
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
