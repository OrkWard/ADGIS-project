<template>
  <!-- 空间分析详细处理面板 -->
  <div class="analysis-panel-style" v-drag>
    <div class="analysis-panel-label">{{ toolname }}</div>
    <div class="analysis-panel-delete" @click="closePanel">×</div>
    <div class="analysis-panel-input">
      <div id="analysis-source">
        选择源文件:
        <select class="analysis-panel-inputselect" v-model="source">
          <option
            v-for="(dataSource, index) in dataCollection['vector']"
            :key="index"
            :label="dataSource.Name"
            :value="dataSource.id"
          >
          </option>
        </select>
      </div>
      <div id="analysis-object">
        选择目标文件:
        <select class="analysis-panel-inputselect" v-model="object">
          <option
            v-for="(dataSource, index) in dataCollection['vector']"
            :key="index"
            :label="dataSource.Name"
            :value="dataSource.id"
          >
          </option>
        </select>
      </div>
      <div id="analysis-method">
        指定方法:
        <select
          class="analysis-panel-inputselect"
          v-model="method"
          id="analysis-panel-inputselect"
        >
        </select>
      </div>
      <div id="analysis-result">
        生成文件名:
        <input type="text" class="analysis-panel-inputtext" v-model="result" />
      </div>
    </div>
    <div class="analysis-panel-run" @click="analysis">运行分析</div>
  </div>
</template>

<script>
import axios from "axios";
import * as Cesium from "cesium";
import store from "../../store/index.js";

export default {
  props: ["toolname"],
  computed: {
    dataCollection() {
      return store.state.dataCollection;
    }
  },
  data() {
    return {
      source: null,
      object: null,
      method: null,
      result: null
    };
  },
  watch: {
    toolname() {
      switch (this.toolname) {
        case "叠加分析":
          {
            let inputSelect = document.getElementById(
              "analysis-panel-inputselect"
            );
            let opt;
            opt = new Option("intersection", "intersection");
            inputSelect.options.add(opt);
            opt = new Option("union", "union");
            inputSelect.options.add(opt);
            opt = new Option("identity", "identity");
            inputSelect.options.add(opt);
            opt = new Option("symmetric_difference", "symmetric_difference");
            inputSelect.options.add(opt);
            opt = new Option("difference", "difference");
            inputSelect.options.add(opt);
          }
          break;
        case "裁剪分析":
          {
            let inputSelect = document.getElementById("analysis-method");
            inputSelect.remove();
          }
          break;
        case "联合分析":
          {
            let inputSelect = document.getElementById(
              "analysis-panel-inputselect"
            );
            let opt;
            opt = new Option("left", "left");
            inputSelect.options.add(opt);
            opt = new Option("right", "right");
            inputSelect.options.add(opt);
            opt = new Option("inner", "inner");
            inputSelect.options.add(opt);
          }
          break;
        case "中心点提取":
          {
            let inputSelect = document.getElementById("analysis-method");
            inputSelect.remove();
            let inputObject = document.getElementById("analysis-object");
            inputObject.remove();
          }
          break;
        case "重投影":
          {
            let inputSelect = document.getElementById(
              "analysis-panel-inputselect"
            );
            let opt;
            opt = new Option("EPSG:32651", "EPSG:32651");
            inputSelect.options.add(opt);
            opt = new Option("EPSG:4326", "EPSG:4326");
            inputSelect.options.add(opt);
            let inputObject = document.getElementById("analysis-object");
            inputObject.remove();
          }
          break;
      }
    }
  },
  methods: {
    closePanel() {
      document.querySelector("#" + this.toolname).removeChild(this.$el);
      this.$destroy();
    },
    judgeVectorIteration: function(newFileName) {
      let judeg = 0;
      this.dataCollection["vector"].forEach(dataSource => {
        if (dataSource.Name == newFileName) judeg = 1;
      });
      return judeg;
    },
    judgeVectorStandard: function(newFileName) {
      let judeg = 1;
      const suffix = newFileName.split(".").pop();
      if (suffix == "geojson" || suffix == "kml" || suffix == "topojson")
        judeg = 0;
      return judeg;
    },
    judgeRasterIteration: function(newFileName) {
      let judeg = 0;
      this.dataCollection["raster"].forEach(dataSource => {
        if (dataSource.Name == newFileName) judeg = 1;
      });
      return judeg;
    },
    judgeRasterStandard: function(newFileName) {
      let judeg = 1;
      const suffix = newFileName.split(".").pop();
      if (suffix == "tif" || suffix == "tiff") judeg = 0;
      return judeg;
    },
    analysis() {
      let request = {};
      switch (this.toolname) {
        case "叠加分析":
          if (this.source == null) this.$message.warning("未选择源文件！");
          else if (this.object == null)
            this.$message.warning("未选择目标文件！");
          else if (this.method == null) this.$message.warning("未指定方法！");
          else if (this.result == null)
            this.$message.warning("未输入生成文件名！");
          else if (this.judgeVectorStandard(this.result))
            this.$message.warning("文件名不符合规范，请重新输入！");
          else if (this.judgeVectorIteration(this.result))
            this.$message.warning("文件名已存在，请重新输入！");
          else {
            request["source"] = this.source;
            request["object"] = this.object;
            request["how"] = this.method;
            // 后缀名由用户输入
            request["output"] = this.result;
            // 发送请求
            axios
              .put("api/vector/overlay/", request)
              // 添加到store
              .then(response => {
                let dataSource = new Cesium.GeoJsonDataSource();
                dataSource.load(`api/data/${response.data.id}/download/`, {
                  stroke: Cesium.Color.HOTPINK,
                  fill: Cesium.Color.PINK,
                  strokeWidth: 3
                });
                this.$store.commit("addVector", {
                  dataSource: dataSource,
                  id: response.data.id,
                  Name: response.data.name,
                  OnView: false,
                  Format: response.data.id.split(".").pop(),
                  Source: "处理生成"
                });
              })
              .catch(error => console.log(error));
            this.$message.success("操作成功！");
          }
          break;
        case "裁剪分析":
          if (this.source == null) this.$message.warning("未选择源文件！");
          else if (this.object == null)
            this.$message.warning("未选择目标文件！");
          else if (this.result == null)
            this.$message.warning("未输入生成文件名！");
          else if (this.judgeVectorStandard(this.result))
            this.$message.warning("文件名不符合规范，请重新输入！");
          else if (this.judgeVectorIteration(this.result))
            this.$message.warning("文件名已存在，请重新输入！");
          else {
            request["source"] = this.source;
            request["object"] = this.object;
            request["how"] = null;
            // 后缀名由用户输入
            request["output"] = this.result;
            // 发送请求
            axios
              .put("api/vector/clip/", request)
              // 添加到store
              .then(response => {
                let dataSource = new Cesium.GeoJsonDataSource();
                dataSource.load(`api/data/${response.data.id}/download/`, {
                  stroke: Cesium.Color.HOTPINK,
                  fill: Cesium.Color.PINK,
                  strokeWidth: 3
                });
                this.$store.commit("addVector", {
                  dataSource: dataSource,
                  id: response.data.id,
                  Name: response.data.name,
                  OnView: false,
                  Format: response.data.id.split(".").pop(),
                  Source: "处理生成"
                });
              })
              .catch(error => console.log(error));
            this.$message.success("操作成功！");
          }
          break;
        case "联合分析":
          if (this.source == null) this.$message.warning("未选择源文件！");
          else if (this.object == null)
            this.$message.warning("未选择目标文件！");
          else if (this.method == null) this.$message.warning("未指定方法！");
          else if (this.result == null)
            this.$message.warning("未输入生成文件名！");
          else if (this.judgeVectorStandard(this.result))
            this.$message.warning("文件名不符合规范，请重新输入！");
          else if (this.judgeVectorIteration(this.result))
            this.$message.warning("文件名已存在，请重新输入！");
          else {
            request["source"] = this.source;
            request["object"] = this.object;
            request["how"] = this.method;
            // 后缀名由用户输入
            request["output"] = this.result;
            // 发送请求
            axios
              .put("api/vector/sjoin/", request)
              // 添加到store
              .then(response => {
                let dataSource = new Cesium.GeoJsonDataSource();
                dataSource.load(`api/data/${response.data.id}/download/`, {
                  stroke: Cesium.Color.HOTPINK,
                  fill: Cesium.Color.PINK,
                  strokeWidth: 3
                });
                this.$store.commit("addVector", {
                  dataSource: dataSource,
                  id: response.data.id,
                  Name: response.data.name,
                  OnView: false,
                  Format: response.data.id.split(".").pop(),
                  Source: "处理生成"
                });
              })
              .catch(error => console.log(error));
            this.$message.success("操作成功！");
          }
          break;
        case "中心点提取":
          if (this.source == null) this.$message.warning("未选择源文件！");
          else if (this.result == null)
            this.$message.warning("未输入生成文件名！");
          else if (this.judgeVectorStandard(this.result))
            this.$message.warning("文件名不符合规范，请重新输入！");
          else if (this.judgeVectorIteration(this.result))
            this.$message.warning("文件名已存在，请重新输入！");
          else {
            request["source"] = this.source;
            request["object"] = null;
            request["how"] = null;
            // 后缀名由用户输入
            request["output"] = this.result;
            // 发送请求
            axios
              .put("api/vector/centroid/", request)
              // 添加到store
              .then(response => {
                let dataSource = new Cesium.GeoJsonDataSource();
                dataSource.load(`api/data/${response.data.id}/download/`, {
                  stroke: Cesium.Color.HOTPINK,
                  fill: Cesium.Color.PINK,
                  strokeWidth: 3
                });
                this.$store.commit("addVector", {
                  dataSource: dataSource,
                  id: response.data.id,
                  Name: response.data.name,
                  OnView: false,
                  Format: response.data.id.split(".").pop(),
                  Source: "处理生成"
                });
              })
              .catch(error => console.log(error));
            this.$message.success("操作成功！");
          }
          break;
        case "重投影":
          if (this.source == null) this.$message.warning("未选择源文件！");
          else if (this.method == null) this.$message.warning("未指定方法！");
          else if (this.result == null)
            this.$message.warning("未输入生成文件名！");
          else if (this.judgeVectorStandard(this.result))
            this.$message.warning("文件名不符合规范，请重新输入！");
          else if (this.judgeVectorIteration(this.result))
            this.$message.warning("文件名已存在，请重新输入！");
          else {
            request["source"] = this.source;
            request["object"] = null;
            request["how"] = this.method;
            // 后缀名由用户输入
            request["output"] = this.result;
            // 发送请求
            axios
              .put("api/vector/to_src/", request)
              // 添加到store
              .then(response => {
                let dataSource = new Cesium.GeoJsonDataSource();
                dataSource.load(`api/data/${response.data.id}/download/`, {
                  stroke: Cesium.Color.HOTPINK,
                  fill: Cesium.Color.PINK,
                  strokeWidth: 3
                });
                this.$store.commit("addVector", {
                  dataSource: dataSource,
                  id: response.data.id,
                  Name: response.data.name,
                  OnView: false,
                  Format: response.data.id.split(".").pop(),
                  Source: "处理生成"
                });
              })
              .catch(error => console.log(error));
            this.$message.success("操作成功！");
          }
          break;
      }
    }
  },
  directives: {
    drag(el) {
      let oDiv = el; //当前元素
      oDiv.onmousemove = function(e) {
        if (
          Math.abs(e.clientX - oDiv.offsetLeft) < 20 ||
          Math.abs(e.clientX - (oDiv.offsetLeft + oDiv.offsetWidth)) < 20 ||
          Math.abs(e.clientY - oDiv.offsetTop) < 20 ||
          Math.abs(e.clientY - (oDiv.offsetTop + oDiv.offsetHeight)) < 20
        )
          this.style.cursor = "grab";
        else this.style.cursor = "default";
      };
      oDiv.onmousedown = function(e) {
        if (this.style.cursor == "default") return;
        //鼠标按下，计算当前元素距离可视区的距离
        let disX = e.clientX - oDiv.offsetLeft;
        let disY = e.clientY - oDiv.offsetTop;
        document.onmousemove = function(e) {
          //计算移动的距离
          let l = e.clientX - disX;
          let t = e.clientY - disY;
          //移动当前元素
          oDiv.style.left = l + "px";
          oDiv.style.top = t + "px";
        };
        document.onmouseup = function() {
          document.onmousemove = null;
          document.onmouseup = null;
        };
        //return false不加的话可能导致黏连
        return false;
      };
    }
  }
};
</script>

<style scoped>
.analysis-panel-style {
  position: absolute;
  height: 300px;
  width: 300px;
  background-color: var(--default-background-gray);
  z-index: 1;
  border-radius: 10px;
}

.analysis-panel-label {
  text-align: center;
  width: 280px;
  padding: 5px;
  margin: 5px;
  margin-top: 20px;
  font-size: 120%;
  text-transform: capitalize;
}

.analysis-panel-delete {
  position: relative;
  top: -33px;
  left: 255px;
  font-size: 140%;
  border: 1px solid var(--default-gray);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.analysis-panel-delete:hover {
  transform: rotate(90deg);
  transition-duration: 0.5s;
}

.analysis-panel-run {
  width: 70px;
  padding: 5px;
  margin-left: 110px;
  margin-right: 110px;
  text-align: center;
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid var(--default-gray);
}

.analysis-panel-run:hover {
  background-color: var(--default-light-gray);
  /* border: 1px solid var(--main-darker); */
}

.analysis-panel-input {
  margin: 20px;
  line-height: 30px;
  font-size: 90%;
  /* display: flex;
  justify-content: center; */
}

.analysis-panel-inputtext {
  float: right;
  width: 150px;
  margin-top: 4px;
}

.analysis-panel-inputselect {
  float: right;
  width: 158px;
  margin-top: 5px;
}
</style>
