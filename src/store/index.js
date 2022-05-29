import Vue from "vue";
import Vuex from "vuex";
import * as Cesium from "cesium";

Vue.use(Vuex);
Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxNmZmODFjMS0yMTA5LTQ4ZGQtODY1MS0wZDMzNGUxODk5NWEiLCJpZCI6ODY0NDYsImlhdCI6MTY0NzgzMzEzNn0.Z6RZYH594BXEBh2a5LwKCF7fw5NhlSCRxnibcOz9O8k";

// 全局管理各类资源和添加、删除方法
export default new Vuex.Store({
  state() {
    return {
      dataCollection: {
        image: [],
        terrain: [],
        vector: [],
        entity: []
      },
      viewer: undefined
    };
  },
  mutations: {
    addImage(state, imageDataSource) {
      /* imageDataSource: {
        Layer: Cesium.imageryLayer,
        Name: String,
        Source: String,
        OnView: Boolean,
        Format: String,
        (optional)id: int
      }*/
      state.dataCollection.image.push(imageDataSource);
    },
    addTerrain(state, terrainDataSource) {
      /* terrainDataSource: {
        Provider: Cesium.terrainProvider,
        Name: String,
        Source: String,
        OnView: Boolean,
        Format: String
      }*/
      state.dataCollection.terrain.push(terrainDataSource);
    },
    addVector(state, vectorDataSource) {
      /* vectorDataSource: {
        DataSource: Cesium.dataSource,
        Name: String,
        Source: String,
        OnView: Boolean,
        Format: String,
        id: int
      }*/
      state.dataCollection.vector.push(vectorDataSource);
    },
    addEntity(state, entityDataSource) {
      /* entityDataSource: {
        DataSource: Cesium.dataSource,
        Name: String,
        Source: String,
        OnView: Boolean,
        Format: String,
        id: int
      }*/
      state.dataCollection.entity.push(entityDataSource);
    },
    initializeViewer(state, newViewer) {
      state.viewer = newViewer;
    },
    removeData(state, targetData) {
      let index = state.dataCollection[targetData.type].indexOf(
        targetData.dataSource
      );
      state.dataCollection[targetData.type].splice(index, 1);
    },
    OnView(state, targetData) {
      let index = state.dataCollection[targetData.type].indexOf(
        targetData.dataSource
      );
      state.dataCollection[targetData.type][index].OnView = true;
    },
    OffView(state, targetData) {
      let index = state.dataCollection[targetData.type].indexOf(
        targetData.dataSource
      );
      state.dataCollection[targetData.type][index].OnView = false;
    }
  },
  actions: {},
  modules: {}
});
