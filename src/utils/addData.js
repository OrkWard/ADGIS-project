import axios from "axios";
import * as Cesium from "cesium";

export default function addData(data, vue_this) {
  // data: response from api/data/<id>/download/
  let layer;
  let dataSource;
  // 分类别处理，先考虑矢量数据和3D数据
  switch (data["form"]) {
    case "image":
      axios.put("api/image/publish/", { id: data.id }).then(response => {
        layer = new Cesium.ImageryLayer(
          new Cesium.WebMapServiceImageryProvider({
            url: response.data.url,
            layers: response.data.layer,
            parameters: {
              service: "WMS",
              format: "image/png",
              transparent: true
            }
          })
        );
        vue_this.$store.commit("addImage", {
          Layer: layer,
          Name: data.name,
          Source: "用户上传",
          OnView: false,
          Format: data.name.split(".").pop(),
          id: data.id
        });
      });
      break;
    case "vector":
      // 数据格式
      switch (data["name"].split(".").pop()) {
        case "geojson":
          dataSource = new Cesium.GeoJsonDataSource();
          break;
        case "kml":
          dataSource = new Cesium.KmlDataSource();
          break;
        case "topojson":
          dataSource = new Cesium.GeoJsonDataSource();
          break;
      }
      // 加载数据
      dataSource.load(`api/data/${data["id"]}/download/`, {
        stroke: Cesium.Color.HOTPINK,
        fill: Cesium.Color.PINK,
        strokeWidth: 3
      });
      // 填入store
      vue_this.$store.commit("addVector", {
        DataSource: dataSource,
        Name: data.name,
        id: data.id,
        OnView: false,
        Source: "用户上传",
        Format: data.name.split(".").pop()
      });
      break;
    case "entity":
      switch (data["name"].split(".").pop()) {
        case "glb":
          // 加载数据
          dataSource = new Cesium.Entity({
            name: `${data["name"].split(".")[0]}`,
            model: {
              show: true,
              uri: `api/data/${data["id"]}/download`,
              scale: 5.0,
              maximumScale: 10000,
              minimumPixelSize: 128
            }
          });
          break;
      }
      // 填入store
      vue_this.$store.commit("addEntity", {
        DataSource: dataSource,
        Name: data["name"],
        id: data["id"],
        OnView: false
      });
      break;
  }
}
