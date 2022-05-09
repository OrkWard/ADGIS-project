<template>
  <div id="main-page">
    <nav id="nav-bar">
      <div>MapEver</div>
    </nav>
    <div id="main-container">
      <div id="tool-bar"></div>
      <div id="cesium-container"></div>
    </div>
  </div>
</template>

<script>
import "cesium/Build/Cesium/Widgets/widgets.css";
import * as Cesium from "cesium";

export default {
  name: "MainPage",
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let viewer = new Cesium.Viewer("cesium-container");

      let imageryLayers = viewer.imageryLayers;

      let googleMap = new Cesium.UrlTemplateImageryProvider({
        url: "http://www.google.com/maps/vt?lyrs=s@716&x={x}&y={y}&z={z}"
      });

      imageryLayers.addImageryProvider(googleMap);

      // fly
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
        duration: 10 // fly time 10s
      });
    }
  }
};
</script>

<style>
#main-page {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav-bar {
  background-color: green;
}
</style>
