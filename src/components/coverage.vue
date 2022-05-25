<script>
// eslint-disable-next-line no-unused-vars
import { metaProperty } from "@babel/types";

export default {
  name: "Coverage",
  props: ["type"],
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
      showSingleAsset: false,
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
      this.showVector != this.showVector;
      this.rotateVector = this.rotateVector == 0 ? 90 : 0;
    },
    processTerrain() {
      this.showTerrain != this.showTerrain;
      this.rotateTerrain = this.rotateTerrain == 0 ? 90 : 0;
    },
    processEntity() {
      this.showEntity != this.showEntity;
      this.rotateEntity = this.rotateEntity == 0 ? 90 : 0;
    },
    toggleSingleAsset() {
      this.showSingleAsset = !this.showSingleAsset;
    },
  },
};
</script>

<template>
  <div id="coverage-container">
    <div class="data-process">
      <div class="asset-type-container" @click="processImage">
        <img
          src="../assets/image/arrow.svg"
          :style="{ transform: 'rotate(' + rotateImage + 'deg)' }"
        />
        <div class="asset-type">Image Data Coverage</div>
      </div>
      <transition name="coverage-tool-container">
        <div v-if="showImage">
          <div v-for="type in ['image']" :key="type">
            <div
              v-for="(dataSource, index) in dataCollection[type]"
              :key="index"
            >
              <div class="asset-between" />
              <div
                :class="{
                  'asset-head-open': showSingleAsset,
                  'asset-head-close': !showSingleAsset,
                }"
                @click.stop="toggleSingleAsset"
              >
                <div class="asset-head">
                  <div>{{ dataSource.Name }}</div>
                  <div class="asset-description">
                    <div class="asset-format">
                      {{ "格式：" + dataSource.Format }}&nbsp;&nbsp;
                    </div>
                    <div class="asset-source">
                      {{ "源：" + dataSource.Source }}
                    </div>
                  </div>
                </div>
                <img
                  class="asset-toggle-icon"
                  :src="require('../assets/image/arrow.svg')"
                  :class="{
                    'asset-toggle-icon-up': showSingleAsset,
                    'asset-toggle-icon-down': !showSingleAsset,
                  }"
                />
              </div>
              <transition name="single-asset-manipulation">
                <div
                  v-if="showSingleAsset"
                  class="asset-manipulation-container"
                >
                  <div class="asset-manipulate">
                    <img
                      class="asset-manipulate-icon"
                      :src="require('../assets/image/add.svg')"
                    />
                    <div class="asset-manipulate-name">显示到图层</div>
                  </div>
                  <div class="asset-manipulate">
                    <img
                      class="asset-manipulate-icon"
                      :src="require('../assets/image/delete.svg')"
                    />
                    <div class="asset-manipulate-name">删除</div>
                  </div>
                  <div class="asset-manipulate">
                    <img
                      class="asset-manipulate-icon"
                      :src="require('../assets/image/download.svg')"
                    />
                    <div class="asset-manipulate-name">下载</div>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="asset-split" />
    <div class="data-process">
      <div class="asset-type-container" @click="processTerrain">
        <img
          src="../assets/image/arrow.svg"
          :style="{ transform: 'rotate(' + rotateTerrain + 'deg)' }"
        />
        <div class="asset-type">Terrain Data Coverage</div>
      </div>
      <transition name="coverage-tool-container">
        <div v-if="showTerrain">
          <div v-for="type in ['terrain']" :key="type">
            <div
              v-for="(dataSource, index) in dataCollection[type]"
              :key="index"
            >
              <div class="asset-head">
                <div>{{ dataSource.Name }}</div>
                <div class="asset-description">
                  <div class="asset-format">
                    {{ "格式：" + dataSource.Format }}&nbsp;&nbsp;
                  </div>
                  <div class="asset-source">
                    {{ "源：" + dataSource.Source }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="asset-split" />
    <div class="data-process">
      <div class="asset-type-container" @click="processVector">
        <img
          src="../assets/image/arrow.svg"
          :style="{ transform: 'rotate(' + rotateVector + 'deg)' }"
        />
        <div class="asset-type">Vector Data Coverage</div>
      </div>
      <transition name="coverage-tool-container">
        <div v-if="showVector">
          <div v-for="type in ['vector']" :key="type">
            <div
              v-for="(dataSource, index) in dataCollection[type]"
              :key="index"
            >
              <div class="asset-head">
                <div>{{ dataSource.Name }}</div>
                <div class="asset-description">
                  <div class="asset-format">
                    {{ "格式：" + dataSource.Format }}&nbsp;&nbsp;
                  </div>
                  <div class="asset-source">
                    {{ "源：" + dataSource.Source }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="asset-split" />
    <div class="data-process">
      <div class="asset-type-container" @click="processEntity">
        <img
          src="../assets/image/arrow.svg"
          :style="{ transform: 'rotate(' + rotateEntity + 'deg)' }"
        />
        <div class="asset-type">Vector Data Coverage</div>
      </div>
      <transition name="coverage-tool-container">
        <div v-if="showEntity">
          <div v-for="type in ['entity']" :key="type">
            <div
              v-for="(dataSource, index) in dataCollection[type]"
              :key="index"
            >
              <div class="asset-head">
                <div>{{ dataSource.Name }}</div>
                <div class="asset-description">
                  <div class="asset-format">
                    {{ "格式：" + dataSource.Format }}&nbsp;&nbsp;
                  </div>
                  <div class="asset-source">
                    {{ "源：" + dataSource.Source }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="asset-split" />
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

.item {
  width: 100%;
  height: 30px;
  background-color: gray;
  border: 1px solid black;
  box-sizing: border-box;
}

.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s cubic-bezier(0.5, 0, 0.1, 1);
}

.single-asset {
  margin-top: 1px;
  margin-right: 5px;
  display: flex;
  flex-flow: column nowrap;
}

.single-asset-container {
  margin-left: 10px;
  display: flex;
  flex-flow: column nowrap;
}
.asset-between {
  border-top: 1px solid;
  margin: 0 5px;
}

.single-asset-container-enter-active,
.single-asset-container-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.single-asset-container-enter,
.single-asset-container-leave-to {
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

.asset-split {
  width: calc(100% - 10px);
  margin: 10px 5px 0;
  border-top: 1px solid var(--default-gray);
}

.asset-type-container {
  padding: 5px;
  width: fit-content;
  margin: 5px;
  display: flex;
  flex-flow: row nowrap;
  text-transform: capitalize;
  border-radius: 5px;
  cursor: pointer;
}

.asset-type-container:hover {
  background-color: var(--default-light-gray);
}

.asset-type {
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
.asset-head-open {
  display: flex;
  padding: 5px;
  flex-flow: row nowrap;
  justify-content: space-between;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  cursor: pointer;
}
.asset-head-close {
  display: flex;
  padding: 5px;
  flex-flow: row nowrap;
  justify-content: space-between;
  border-radius: 5px;
  cursor: pointer;
}
.asset-description {
  display: flex;
  flex-flow: row nowrap;
  font-size: small;
  font-size: 10px;
  color: var(--default-gray);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
.asset-toggle-icon-up {
  filter: var(--black-filter);
  transform: rotate(90deg);
}
.asset-toggle-icon-down {
  filter: var(--black-filter);
  transform: rotate(180deg);
}

.asset-toggle-icon {
  width: 12px;
  margin-right: 5px;
  pointer-events: none;
  transition: 0.3s;
}

.asset-manipulation-container {
  display: flex;
  flex-flow: row nowrap;
  padding: 5px;
  justify-content: space-between;
  cursor: pointer;
}

.asset-manipulate {
  display: flex;
  flex-flow: row nowrap;
  padding: 1px;
  border-radius: 1px;
}
.asset-manipulate:hover {
  background-color: var(--default-light-gray);
}

.asset-manipulate-name {
  margin-left: 2px;
  font-size: 12px;
}

.asset-manipulate-icon {
  width: 15px;
}

.single-asset-manipulation-enter-active,
.single-asset-manipulation-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.single-asset-manipulation-enter,
.single-asset-manipulation-leave-to {
  opacity: 0;
}
</style>
