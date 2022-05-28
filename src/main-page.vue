<template>
  <div id="main-page">
    <!--导航栏-->
    <nav id="nav-bar">
      <!--侧栏按钮-->
      <div id="tool-list-button" @click="clickBounce(), toggleTool()">
        <img
          id="tool-list-icon"
          class="animate__animated"
          src="./assets/image/list.svg"
          :class="{ animate__bounce: useBounce }"
          @AnimationEnd="clickBounce"
        />
      </div>
      <!--Logo-->
      <div style="display: flex; align-items: center; padding: 0 10px">
        <div>MapEver</div>
      </div>
    </nav>
    <!--页面容器-->
    <div id="main-container">
      <!--模块容器-->
      <div id="tool-bar-container" :style="{ 'flex-basis': toolWidth }">
        <!--模块按钮容器-->
        <div id="tool-icon-container">
          <!--路由链接按钮-->
          <router-link to="/coverage" @click.native="showTool()">
            <icon-button :img-src="require('./assets/image/coverage.svg')" />
          </router-link>
          <router-link to="/assets" @click.native="showTool()">
            <icon-button :img-src="require('./assets/image/file.svg')" />
          </router-link>
          <router-link to="/upload" @click.native="showTool()">
            <icon-button :img-src="require('./assets/image/upload.svg')" />
          </router-link>
          <router-link to="/analysis" @click.native="showTool()">
            <icon-button :img-src="require('./assets/image/analysis.svg')" />
          </router-link>
          <div
            style="border-bottom: 1px solid gray; 
              box-sizing: border-box; 
              width: calc(var(--tool-icon-bar-width) - 10px); 
              padding: 0 5px;"
          />
        </div>
        <!--模块内容容器-->
        <router-view id="tool-container"></router-view>
      </div>
      <!--右侧Cesium框架，背景图用于暂时填充-->
      <div
        id="cesium-container"
        :style="{
          'background-image': 'url(' + require('./assets/image/logo.png') + ')'
        }"
      ></div>
    </div>
  </div>
</template>

<script>
import "cesium/Build/Cesium/Widgets/widgets.css";
import * as Cesium from "cesium";
import iconButton from "./components/icon-button.vue";
import axios from "axios";
import * as Provided from "./utils/providedAsset.js";
import addData from "./utils/addData.js";

export default {
  name: "MainPage",
  mounted() {
    this.init();
  },
  data() {
    return {
      // 控制动画
      toolWidth: "var(--tool-icon-bar-width)",
      useBounce: false
    };
  },
  methods: {
    // 初始化函数，测试用
    init() {
      // viewer变量在store里，store的初始化早于所有模块，因此需要先初始化
      this.$store.commit(
        "initializeViewer",
        new Cesium.Viewer("cesium-container", {
          fullscreenButton: false,
          homeButton: false,
          animation: false,
          timeline: false,
          vrButton: false
        })
      );
      // 取出已初始化的变量
      let viewer = this.$store.state.viewer;
      // viewer.terrainProvider = Provided.terrainDatas[1]['Provider'];

      Provided.imageDatas.forEach(function(image) {
        this.$store.commit("addImage", image);
      }, this);
      // Provided.terrainDatas.forEach(function(terrain) {
      //   this.$store.commit("addTerrain", terrain);
      // }, this);

      // 预加载全部数据源，前缀经config中代理后转发请求到后端
      // api/data/ 地址接受post和put请求用于上传和更新数据，get请求获取数据列表
      // api/data/{id}/download 地址用于直接获取数据文件
      axios
        // 获取列表
        .get("api/data/")
        .then(response => {
          response.data.forEach(data => addData(data, this), this);
        })
        .catch(error => {
          console.log(error);
        });

      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
          114.296063,
          30.55245,
          20000000
        ),
        orientation: {
          heading: Cesium.Math.toRadians(0),
          pitch: Cesium.Math.toRadians(-90),
          roll: 0.0
        },
        duration: 10
      });
    },
    // 侧栏按钮动画
    clickBounce() {
      this.useBounce = !this.useBounce;
    },
    // 侧栏开关动画
    toggleTool() {
      this.toolWidth =
        this.toolWidth == "var(--tool-icon-bar-width)"
          ? "calc(var(--tool-bar-width) + var(--tool-icon-bar-width)"
          : "var(--tool-icon-bar-width)";
    },
    // 点击左侧模块按钮时自动打开侧栏
    showTool() {
      if (
        this.toolWidth !=
        "calc(var(--tool-bar-width) + var(--tool-icon-bar-width)"
      )
        this.toolWidth =
          "calc(var(--tool-bar-width) + var(--tool-icon-bar-width)";
    }
  },
  components: {
    iconButton
  }
};
</script>

<style scoped>
#main-page {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  width: 100%;
}

#nav-bar {
  display: flex;
  flex-flow: row nowrap;
  background-color: var(--main-color);
  color: white;
  font-size: 20px;
}

#tool-list-button {
  padding: 13px;
  height: 20px;
  width: 25px;
  display: flex;
  cursor: pointer;
  transition: 300ms;
}

#tool-list-button:hover {
  background-color: var(--main-darker);
  transition: 300ms;
}

#tool-list-button:active {
  outline: #ffffff 1px solid;
  outline-offset: -1px;
}

#tool-list-icon {
  filter: var(--white-filter);
  width: 20px;
  transition: 300ms;
  padding: 0;
}

#main-container {
  height: calc(100% - 50px);
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}

#cesium-container {
  flex: 1 1 0;
  background-repeat: repeat;
  background-position: center;
}

#tool-icon-container {
  flex: 0 0 var(--tool-icon-bar-width);
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  border-right: 1px solid var(--default-gray);
}

#tool-bar-container {
  flex: 0 0 var(--tool-bar-icon-width);
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  overflow: hidden;
  background-color: var(--default-white);
  transition: 0.5s;
}

#tool-container {
  flex: 0 0 var(--tool-bar-width);
  display: flex;
  flex-flow: column nowrap;
  transition: 0.5s, ease;
  overflow-y: auto;
}

#tool-bar {
  display: flex;
  flex-flow: column nowrap;
  flex: 1 1 0;
}
</style>
