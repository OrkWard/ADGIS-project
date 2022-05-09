<template>
  <div id="main-page">
    <nav id="nav-bar">
      <div>MapEver</div>
    </nav>
    <div id="main-container">
      <div id="tool-bar">
        <Assets/>
        <Coverage/>
        <Upload/>
        <Analysis/>
      </div>
      <!--右侧Cesium框架，背景图用于暂时填充-->
      <div id="cesium-container" 
        :style="{'background-image': 'url(' + require('./assets/logo.png') + ')'}"></div>
    </div>
  </div>
</template>

<script>
import "cesium/Build/Cesium/Widgets/widgets.css";
import * as Cesium from "cesium";
import Assets from './components/assets.vue'
import Coverage from './components/coverage.vue';
import Upload from './components/upload.vue';
import Analysis from './components/upload.vue'

export default {
  name: "MainPage",
  mounted() {
    // 先不去考虑地图
    // this.init();
  },
  methods: {
    init() {
      let viewer = new Cesium.Viewer("cesium-container");

      let imageryLayers = viewer.imageryLayers;

      let googleMap = new Cesium.UrlTemplateImageryProvider({
        url: "http://www.google.com/maps/vt?lyrs=s@716&x={x}&y={y}&z={z}"
      });

      imageryLayers.addImageryProvider(googleMap);

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
    }
  },
  components: {
    Assets,
    Coverage,
    Upload,
    Analysis
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
  background-color: var(--main-color);
  color: white;
  padding: 15px 20px;
  font-size: 20px;
}

#main-container {
  height: calc(100% - 50px);
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}

#cesium-container {
  width: 75%;
  background-repeat: repeat;
  background-position: center;
}

#tool-bar {
  width: 25%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
}
</style>
