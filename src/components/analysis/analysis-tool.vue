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
import axios from "axios";
import * as Cesium from "cesium";

function createPanel(props) {
  // console.log()
  const panelNode = new (vue.extend(AnalysisPanel))({
    propsData: props
  }).$mount();
  panelNode.toolname = props;
  document.querySelector("#" + props).appendChild(panelNode.$el);
  // panelNode.remove =()=> {
  //   document.removeChild(panelNode.$el);
  //   panelNode.$destroy();//将vue 的实例对象销毁
  // }
}

export default {
  props: ["toolname"],
  methods: {
    callTool() {
      createPanel(this.toolname);
      let request = {};
      switch (this.toolname) {
        case "叠加分析":
          // 源文件和目标文件实际发送的请求是每条数据记录的id，在store里有，用生成列表的形式让用户选择文件即可
          request["source"] = prompt("指定源文件：");
          request["object"] = prompt("指定目标文件：");
          request["how"] = prompt(
            "指定方法（联合：union/裁剪：difference/相交：交集取反：symmetric_difference/标识：identity"
          );
          // 这里在前端判断是否有文件名重复，在后端判断还需要返回请求判断过于麻烦
          // 后缀名由用户输入
          request["output"] = prompt("输入文件名：");
          // 发送请求
          axios
            .put("api/vector/overlay/", request)
            // 添加到store
            .then(response => {
              let dataSource = new Cesium.GeoJsonDataSource();
              dataSource.load(`api/data/${response.data["id"]}/download/`, {
                stroke: Cesium.Color.HOTPINK,
                fill: Cesium.Color.PINK,
                strokeWidth: 3
              });
              this.$store.commit("addVector", {
                dataSource: dataSource,
                id: response.data["id"],
                Name: response.data["name"],
                OnView: false
              });
            })
            .catch(error => console.log(error));
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
