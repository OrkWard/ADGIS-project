<template>
  <div>
    <div>演示</div>
    <input id="file-to-upload" type="file" />
    <div style="cursor: pointer;" @click="upload">点我</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Upload",
  methods: {
    upload() {
      // 我靠，怎么还要写qS的
      let file = document.querySelector("#file-to-upload").files[0];
      let formData = new FormData();
      formData.append("data", file);
      formData.append("name", file["name"]);
      let ext = file["name"].split(".").pop();
      // 这里要写判断，包括矢量、三维实体和栅格
      // 矢量暂时只有geojson|topojson|kml|czml
      // 栅格tif吧，我明天再研究
      // 三维实体就用glb和gltf
      let form = ext == "geojson" ? "vector" : "other";
      formData.append("form", form);
      axios({
        method: "post",
        url: "api/data/",
        data: formData
      });
    }
  }
};
</script>

<style scoped></style>
