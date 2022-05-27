<script>
import coverageImage from "./coverage-image.vue";

export default {
  name: "Coverage",
  props: ["type"],
  components: {
    coverageImage,
  },
  computed: {
    dataCollection() {
      return this.$store.state.dataCollection;
    },
  },
  data() {
    return {
      showVector: false,
      showTerrain: false,
      showImage: false,
      showEntity: false,
      rotateVector: 0,
      rotateTerrain: 0,
      rotateImage: 0,
      rotateEntity: 0,
    };
  },
  methods: {
    // remove用来删除图层
    remove() {
      console.log("这里删掉图层");
    },
    processImage() {
      this.showImage = !this.showImage;
      this.rotateImage = this.rotateImage == 0 ? 90 : 0;
    },
    processVector() {
      this.showVector = !this.showVector;
      this.rotateVector = this.rotateVector == 0 ? 90 : 0;
    },
    processTerrain() {
      this.showTerrain = !this.showTerrain;
      this.rotateTerrain = this.rotateTerrain == 0 ? 90 : 0;
    },
    processEntity() {
      this.showEntity = !this.showEntity;
      this.rotateEntity = this.rotateEntity == 0 ? 90 : 0;
    },
  },
};
</script>

<template>
  <div id="coverage-container">
    <div class="data-process">
      <div class="coverage-type-container" @click="processImage">
        <img
          src="../../assets/image/arrow.svg"
          :style="{ transform: 'rotate(' + rotateImage + 'deg)' }"
        />
        <div class="coverage-type">Image Data Coverage</div>
      </div>
      <transition name="coverage-tool-container">
        <div v-if="showImage">
          <div v-for="type in ['image']" :key="type">
            <div
              v-for="(dataSource, index) in dataCollection[type]"
              :key="index"
            >
              <div class="coverage-between" />
              <coverage-image
                :dataSource="dataSource"
                :index="index"
                class="coverage-single"
              />
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="coverage-split" />
    <div class="data-process">
      <div class="coverage-type-container" @click="processTerrain">
        <img
          src="../../assets/image/arrow.svg"
          :style="{ transform: 'rotate(' + rotateTerrain + 'deg)' }"
        />
        <div class="coverage-type">Terrain Data Coverage</div>
      </div>
      <transition name="coverage-tool-container">
        <div v-if="showTerrain">
          <div v-for="type in ['terrain']" :key="type">
            <div
              v-for="(dataSource, index) in dataCollection[type]"
              :key="index"
            >
              <div class="coverage-between" />
              <coverage-image
                :dataSource="dataSource"
                :index="index"
                class="coverage-single"
              />
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="coverage-split" />
    <div class="data-process">
      <div class="coverage-type-container" @click="processVector">
        <img
          src="../../assets/image/arrow.svg"
          :style="{ transform: 'rotate(' + rotateVector + 'deg)' }"
        />
        <div class="coverage-type">Vector Data Coverage</div>
      </div>
      <transition name="coverage-tool-container">
        <div v-if="showVector">
          <div v-for="type in ['vector']" :key="type">
            <div
              v-for="(dataSource, index) in dataCollection[type]"
              :key="index"
            >
              <div class="coverage-between" />
              <coverage-image
                :dataSource="dataSource"
                :index="index"
                class="coverage-single"
              />
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="coverage-split" />
    <div class="data-process">
      <div class="coverage-type-container" @click="processEntity">
        <img
          src="../../assets/image/arrow.svg"
          :style="{ transform: 'rotate(' + rotateEntity + 'deg)' }"
        />
        <div class="coverage-type">Entity Data Coverage</div>
      </div>
      <transition name="coverage-tool-container">
        <div v-if="showEntity">
          <div v-for="type in ['entity']" :key="type">
            <div
              v-for="(dataSource, index) in dataCollection[type]"
              :key="index"
            >
              <div class="coverage-between" />
              <coverage-image
                :dataSource="dataSource"
                :index="index"
                class="coverage-single"
              />
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="coverage-split" />
  </div>
</template>

<style scoped>
#coverage-container {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}

.data-process {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  padding-top: 5px;
  text-transform: capitalize;
}

.container {
  position: relative;
  padding: 0;
}

.coverage-single {
  margin-top: 1px;
  margin-right: 5px;
  display: flex;
  flex-flow: column nowrap;
}

.single-coverage-container {
  margin-left: 10px;
  display: flex;
  flex-flow: column nowrap;
}
.coverage-between {
  border-top: 1px solid;
  margin: 0 5px;
}

.single-coverage-container-enter-active,
.single-coverage-container-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.single-coverage-container-enter,
.single-coverage-container-leave-to {
  opacity: 0;
}

img {
  width: 12px;
  margin-right: 5px;
  pointer-events: none;
  transition: 0.3s;
  filter: var(--black-filter);
}

.data-process {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  padding-top: 5px;
  text-transform: capitalize;
}

.coverage-split {
  width: calc(100% - 10px);
  margin: 10px 5px 0;
  border-top: 1px solid var(--default-gray);
}

.coverage-type-container {
  padding: 5px;
  width: fit-content;
  margin: 5px;
  display: flex;
  flex-flow: row nowrap;
  text-transform: capitalize;
  border-radius: 5px;
  cursor: pointer;
}

.coverage-type-container:hover {
  background-color: var(--default-light-gray);
}

.coverage-type {
  margin-right: 5px;
  pointer-events: none;
}

.coverage-tool-container {
  margin-left: 10px;
  display: flex;
  flex-flow: column nowrap;
}

.coverage-tool-container-enter-active,
.coverage-tool-container-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.coverage-tool-container-enter,
.coverage-tool-container-leave-to {
  opacity: 0;
}
</style>
