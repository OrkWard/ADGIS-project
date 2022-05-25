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
          <hr style="width: 60%;" />
        </div>
        <!--模块内容容器-->
        <router-view id="tool-container"></router-view>
      </div>
      <!--右侧Cesium框架，背景图用于暂时填充-->
      <div
        id="cesium-container"
        :style="{
          'background-image': 'url(' + require('./assets/image/logo.png') + ')'
        }">
      </div>
    </div>
  </div>
</template>

<script>
import "cesium/Build/Cesium/Widgets/widgets.css";
import * as Cesium from "cesium";
import iconButton from "./components/icon-button.vue";

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
      let viewer = this.$store.state.viewer;
      console.log(this.$store.state.viewer);
      let imageryLayers = viewer.imageryLayers;

      let googleMap = new Cesium.UrlTemplateImageryProvider({
        url: "http://www.google.com/maps/vt?lyrs=s@716&x={x}&y={y}&z={z}"
      });
      let osm = new Cesium.OpenStreetMapImageryProvider({
        url: "https://a.tile.openstreetmap.org/",
        minimumLevel: 0,
        maximumLevel: 18,
        fileExtension: "png"
      });

      this.$store.commit("addImage", {
        Provider: googleMap,
        Name: "google map",
        Format: "URL",
        Source: "Provided"
      });
      this.$store.commit("addImage", {
        Provider: osm,
        Name: "OpenStreetMap",
        Format: "URL",
        Source: "Provided"
      });

      imageryLayers.addImageryProvider(googleMap);

      let vector = new Cesium.GeoJsonDataSource();
      vector.load("api/data/2/download", {
        stroke: Cesium.Color.HOTPINK,
        fill: Cesium.Color.PINK,
        strokeWidth: 3
      });
      viewer.dataSources.add(vector);

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
      if (this.toolWidth != "calc(var(--tool-bar-width) + var(--tool-icon-bar-width)")
        this.toolWidth = "calc(var(--tool-bar-width) + var(--tool-icon-bar-width)";
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
}

#tool-bar {
  display: flex;
  flex-flow: column nowrap;
  flex: 1 1 0;
}
</style>
