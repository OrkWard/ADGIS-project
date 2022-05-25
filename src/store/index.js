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
      state.dataCollection.image.push(imageDataSource);
    },
    addTerrain(state, Provider, Name) {
      let terrainDataSource = {
        Provider,
        Name
      };
      state.dataCollection.terrain.push(terrainDataSource);
    },
    addVector(state, dataSource, Name, Format, id) {
      let vectorDataSource = {
        dataSource,
        Name,
        Format,
        id
      };
      state.dataCollection.vector.push(vectorDataSource);
    },
    addEntity(state, Entity, Name, Format, id) {
      let entityDataSource = {
        Entity,
        Name,
        Format,
        id
      };
      state.dataCollection.entity.push(entityDataSource);
    },
    initializeViewer(state, newViewer) {
      state.viewer = newViewer;
    }
  },
  actions: {},
  modules: {}
});
