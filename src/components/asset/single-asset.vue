<template>
  <div>
    <div
      :class="{
        'asset-head-open': showSingleAsset,
        'asset-head-close': !showSingleAsset
      }"
      @click.stop="toggleSingleAsset"
    >
      <div class="asset-head">
        <div class="asset-name">{{ dataSource.Name }}</div>
        <div class="asset-description">
          <div class="asset-format">
            {{ "格式：" + dataSource.Format }}&nbsp;&nbsp;
          </div>
          <div class="asset-source">{{ "源：" + dataSource.Source }}</div>
        </div>
      </div>
      <img
        class="asset-toggle-icon"
        :src="require('../../assets/image/arrow.svg')"
        :class="{
          'asset-toggle-icon-up': showSingleAsset,
          'asset-toggle-icon-down': !showSingleAsset
        }"
      />
    </div>
    <transition name="single-asset-manipulation">
      <div v-if="showSingleAsset" class="asset-manipulation-container">
        <div class="asset-manipulate" @click="addToViewer">
          <img
            class="asset-manipulate-icon"
            :src="require('../../assets/image/add.svg')"
          />
          <div class="asset-manipulate-name">添加到图层</div>
        </div>
        <div class="asset-manipulate">
          <img
            class="asset-manipulate-icon"
            :src="require('../../assets/image/delete.svg')"
          />
          <div class="asset-manipulate-name">删除</div>
        </div>
        <div class="asset-manipulate">
          <img
            class="asset-manipulate-icon"
            :src="require('../../assets/image/download.svg')"
          />
          <div class="asset-manipulate-name">下载</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ["dataSource", "index"],
  methods: {
    toggleSingleAsset() {
      this.showSingleAsset = !this.showSingleAsset;
    },
    addToViewer() {}
  },
  data() {
    return {
      showSingleAsset: false
    };
  }
};
</script>

<style>
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

.asset-toggle-icon-up {
  filter: var(--black-filter);
  transform: rotate(90deg);
}
.asset-toggle-icon-down {
  filter: var(--black-filter);
  transform: rotate(180deg);
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
