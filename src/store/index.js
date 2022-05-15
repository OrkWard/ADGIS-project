import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// 全局管理各类资源和添加、删除方法
export default new Vuex.Store({
  state() {
    return {
      dataCollection: {
        image: [],
        terrain: [],
        vector: [],
        entity: []
      }
    };
  },
  mutations: {
    addImage(state, imageDataSource) {
      state.dataCollection.image.push(imageDataSource);
    },
    addTerrain(state, terrainDataSource) {
      state.dataCollection.terrain.push(terrainDataSource);
    }
  },
  actions: {},
  modules: {}
});
