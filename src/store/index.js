import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

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
