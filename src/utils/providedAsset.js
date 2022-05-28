import * as Cesium from "cesium";

// 内置影像数据
export let imageDatas = [];
// 添加两条影像数据
imageDatas.push({
  Provider: new Cesium.UrlTemplateImageryProvider({
    url: "http://www.google.com/maps/vt?lyrs=s@716&x={x}&y={y}&z={z}",
    minimumLevel: 0,
    maximumLevel: 18,
    fileExtension: "png"
  }),
  Name: "google map",
  Source: "预置",
  OnView: true,
  Format: "CesiumAsset"
});

imageDatas.push({
  Provider: new Cesium.OpenStreetMapImageryProvider({
    url: "https://a.tile.openstreetmap.org/",
    minimumLevel: 0,
    maximumLevel: 18,
    fileExtension: "png"
  }),
  Name: "OpenStreetMap",
  Source: "预置",
  OnView: true,
  Format: "CesiumAsset"
});

export let terrainDatas = [];

// terrainDatas.push({
//   Provider: new Cesium.ArcGISTiledElevationTerrainProvider({
//     url:
//       "https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer"
//   }),
//   Name: "ArcGISTiledTerrain",
//   OnView: false
// });
// terrainDatas.push({
//   Provider: new Cesium.CesiumTerrainProvider({
//     url: Cesium.IonResource.fromAssetId(3956),
//     requestWaterMask: true,
//     requestVertexNormals: true
//   }),
//   Name: "CesiumTerrain",
//   OnView: true
// });
