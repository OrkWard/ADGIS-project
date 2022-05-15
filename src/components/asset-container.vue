<template>
  <!--资源类别容器-->
  <div>
    <!--类别名容器-->
    <div class="asset-type-container" @click="toggleAsset">
      <img
        src="../assets/image/arrow.svg"
        :style="{ transform: 'rotate(' + rotate + 'deg)' }"
      />
      <div class="asset-type">{{ type + " data" }}</div>
    </div>
    <!--资源容器-->
    <transition name="single-asset-container">
      <!--使用迭代生成标签，资源存储在全局store中-->
      <div v-if="showAsset" class="single-asset-container">
        <div
          v-for="(dataSource, index) in dataCollection[type]"
          :key="index"
          class="single-asset"
        >
          <div class="asset-name">{{ dataSource.Name }}</div>
          <div class="asset-description">
            <div class="asset-format">{{ dataSource.Format }}&nbsp;&nbsp;</div>
            <div class="asset-source">{{ dataSource.Source }}</div>
          </div>
        </div>
      </div>
    </transition>
    <div class="asset-split" />
  </div>
</template>

<script>
export default {
  props: ["type"],
  computed: {
    dataCollection() {
      return this.$store.state.dataCollection;
    }
  },
  data() {
    return {
      showAsset: false,
      rotate: 0
    };
  },
  methods: {
    toggleAsset() {
      this.showAsset = !this.showAsset;
      this.rotate = this.rotate == 0 ? 90 : 0;
    }
  }
};
</script>

<style scoped>
img {
  width: 12px;
  margin-right: 5px;
  filter: var(--white-filter);
  pointer-events: none;
  transition: 0.3s;
}

.asset-type-container {
  padding: 5px;
  width: fit-content;
  margin: 5px;
  display: flex;
  flex-flow: row nowrap;
  text-transform: capitalize;
  border-radius: 5px;
  background-color: var(--main-color);
  color: white;
  cursor: pointer;
}

.asset-type {
  margin-right: 5px;
  pointer-events: none;
}

.asset-split {
  width: calc(100% - 10px);
  margin: 5px 5px 0;
  border-top: 1px solid var(--default-gray);
}

.single-asset-container {
  margin-left: 5px;
  display: flex;
  flex-flow: column nowrap;
}

.single-asset {
  padding: 5px;
  margin-top: 1px;
  margin-right: 5px;
  background-color: var(--main-lighter);
  color: white;
  border-radius: 5px;
}

.asset-description {
  display: flex;
  flex-flow: row nowrap;
  font-size: small;
}

.single-asset-container-enter-active,
.single-asset-container-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.single-asset-container-enter,
.single-asset-container-leave-to {
  opacity: 0;
}
</style>
