<template>
  <div class="upload-style">
    <div class="upload-header">file upload</div>
    <div class="file-upload">
      <input
        id="file-to-upload"
        type="file"
        class="upload-file-selecter"
        ref="fileInput"
        @change="getFileName()"
        @click="
          e => {
            e.target.value = '';
          }
        "
      />
      <div
        id="file-upload-button"
        type="button"
        class="file-upload-button"
        @click="chooseFile"
      >
        {{ fileName }}
      </div>
      <div class="upload-button" @click="upload">upload</div>
      <div class="upload-hint">
        支持的文件类型<br />
        Vector geojson<br />
        &emsp;&emsp;&emsp;&thinsp;topojson<br />
        &emsp;&emsp;&emsp;&thinsp;kml<br />
        &emsp;&emsp;&emsp;&thinsp;czml<br />
        &emsp;&emsp;&emsp;&thinsp;shp zipped in zip<br />
        Raster tif<br />
        &emsp;&emsp;&emsp;&thinsp;tiff<br />
        Entity&thinsp;&thinsp; glb<br />
        &emsp;&emsp;&emsp;&thinsp;gltf
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import addData from "../utils/addData.js";

export default {
  name: "Upload",
  data() {
    return {
      fileName: "Choose Your File Here"
    };
  },
  methods: {
    getFileName() {
      this.fileName = document.querySelector("#file-to-upload").files[0].name;
    },
    chooseFile() {
      this.$refs.fileInput.dispatchEvent(new MouseEvent("click"));
    },
    upload() {
      let file = document.querySelector("#file-to-upload").files[0];
      // 判断是否已选择了文件
      if (file == null) {
        this.$message.warning("请选择文件！");
        return;
      } else {
        let formData = new FormData();
        formData.append("data", file);
        formData.append("name", file["name"]);
        let ext = file["name"].split(".").pop();
        // 文件类型判断和upload提示已经加上
        if (
          ext == "geojson" ||
          ext == "topojson" ||
          ext == "kml" ||
          ext == "czml" ||
          ext == "zip"
        ) {
          formData.append("form", "vector");
          this.$message.success("加载矢量数据文件成功！");
        } else if (ext == "tif" || ext == "tiff" || ext == "zip") {
          formData.append("form", "image");
          this.$message.success("加载栅格数据文件成功！");
        } else if (ext == "glb" || ext == "gltf") {
          formData.append("form", "entity");
          this.$message.success("加载实体成功！");
        } else {
          this.$message.warning("请选择正确类型的文件！");
          return;
        }
        axios
          .post("api/data/", formData)
          .then(response => addData(response.data, this))
          .catch(error => console.log(error));
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
  align-items: center;
  border-radius: 12px;
  cursor: pointer;
  background-color: var(--default-light-gray);
  border: 1px solid var(--default-gray);
  text-transform: capitalize;
  width: 70px;
  height: 28px;
}

.upload-button:hover {
  background-color: var(--default-gray);
}

.upload-file-selecter {
  display: none;
}

.file-upload-button {
  padding: 8px;
  margin: 10px;
  width: 220px;
  height: 100px;
  border-radius: 5px;
  border: 1px dashed var(--default-gray);
  cursor: pointer;
  font-size: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.file-upload-button:hover {
  border: 1px dashed var(--main-darker);
  background-color: var(--default-light-gray);
}

/* 这个说明文字的样式我真的想不好怎么设好看） */
.upload-hint {
  font-size: 90%;
  padding: 4px;
  margin: 10px;
  color: var(--default-gray);
  line-height: 130%;
  width: fit-content;
  /* border: 1px solid var(--default-gray);
  border-radius: 5px; */
}
</style>
