<template>
  <div id="main-page">
    <nav id="nav-bar">
      <div id="tool-list-button" @click="clickBounce(), toggleTool()">
        <img
          id="tool-list-icon"
          class="animate__animated"
          src="./assets/image/list.svg"
          :class="{ animate__bounce: useBounce }"
          @webkitAnimationEnd="clickBounce"
        />
      </div>
      <div style="display: flex; align-items: center; padding: 0 10px">
        <div>MapEver</div>
      </div>
    </nav>
    <div id="main-container">
      <div id="tool-bar-container">
        <div id="tool-icon-container">
          <icon-button :imgSrc="require('./assets/image/coverage.svg')" />
          <icon-button :imgSrc="require('./assets/image/file.svg')" />
          <icon-button :imgSrc="require('./assets/image/upload.svg')" />
          <hr style="width: 60%;" />
        </div>
        <div id="tool-container">
          <Assets style="width: 100%" />
          <Coverage />
          <Upload />
          <Analysis style="width: 100%" />
        </div>
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
import * as jQuery from "jQuery";
import Assets from "./components/assets.vue";
import Coverage from "./components/coverage.vue";
import Upload from "./components/upload.vue";
import Analysis from "./components/upload.vue";
import iconButton from "./components/iconButton.vue";

export default {
  name: "MainPage",
  mounted() {
    this.init();
  },
  data() {
    return {
      toolWidth: "50px",
      useBounce: false
    };
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
    },
    clickBounce() {
      this.useBounce = !this.useBounce;
    },
    toggleTool() {
      jQuery("#tool-bar-container").animate({
        "flex-basis": (this.toolWidth =
          this.toolWidth == "50px" ? "300px" : "50px")
      });
    }
  },
  components: {
    Assets,
    Coverage,
    Upload,
    Analysis,
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
  padding: 15px;
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
  flex: 0 0 50px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  border-right: 1px solid var(--default-gray);
}

#tool-bar-container {
  flex: 0 0 50px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  overflow: hidden;
  background-color: var(--default-white);
}

#tool-container {
  flex: 0 0 200px;
  display: flex;
  flex-flow: column nowrap;
  transition: 0.5s, flex-basis, ease;
}

#tool-bar {
  display: flex;
  flex-flow: column nowrap;
  flex: 1 1 0;
}
</style>
