<template>
  <div class="upload-style">
    <div class="upload-header">upload your file here</div>
    <input id="file-to-upload" type="file" class="upload-file-selecter" @click="e => { e.target.value = ''; }" />
    <div class="upload-button" @click="upload">upload</div>
    <div style="padding-left: 10px">{{ hint }}</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Upload",
  data() {
    return {
      hint: null
    };
  },
  methods: {
    upload() {
      let file = document.querySelector("#file-to-upload").files[0];
      // 判断是否已选择了文件
      if (file == null) {
        this.hint = "请选择文件！";
        return;
      }
      else {
        let formData = new FormData();
        formData.append("data", file);
        formData.append("name", file["name"]);
        let ext = file["name"].split(".").pop();
        // 文件类型判断和upload提示已经加上
        if (ext == "geojson" || ext == "topojson" || ext == "kml" || ext == "czml") {
          formData.append("form", "vector");
          this.hint = "加载矢量数据文件成功！";
        }
        else if (ext == "tif" || ext == "tiff") {
          formData.append("form", "raster");
          this.hint = "加载栅格数据文件成功！";
        }
        else if (ext == "glb" || ext == "gltf") {
          formData.append("form", "entity");
          this.hint = "加载实体成功！";
        }
        else {
          this.hint = "请选择正确类型的文件！"
          return;
        }
        axios({
          method: "post",
          url: "api/data/",
          data: formData
        });
      }
    }
  }
};
</script>

<style scoped>
.upload-style {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  padding: 5px;
  text-transform: capitalize;
}

.upload-header {
  padding: 5px;
  width: fit-content;
  margin: 5px;
  display: flex;
  text-transform: capitalize;
}

.upload-button {
  padding: 8px;
  width: fit-content;
  margin: 10px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  border-radius: 5px;
  cursor: pointer;
  background-color: var(--default-light-gray);
}

.upload-button:hover {
  background-color: var(--default-gray);
}

.upload-file-selecter {
  padding: 5px;
  margin: 5px;
}
</style>
