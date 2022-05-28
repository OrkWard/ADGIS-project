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
        <div class="asset-manipulate" @click="deleteAsset">
          <img
            class="asset-manipulate-icon"
            :src="require('../../assets/image/delete.svg')"
          />
          <div class="asset-manipulate-name">删除</div>
        </div>
        <div class="asset-manipulate" @click="download">
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
import axios from "axios";

export default {
  props: ["dataSource", "type"],
  methods: {
    toggleSingleAsset() {
      this.showSingleAsset = !this.showSingleAsset;
    },
    addToViewer() {
      this.$store.commit("OnView", {
        dataSource: this.dataSource,
        type: this.type
      });
    },
    deleteAsset() {
      this.$store.commit("removeData", {
        dataSource: this.dataSource,
        type: this.type
      });
      if (["用户上传", "处理生成"].includes(this.dataSource.Source)) {
        console.log("here");
        axios
          .delete(`api/data/${this.dataSource.id}/`)
          .then(response => {
            console.log(response);
            alert("删除成功！");
          })
          .catch(error => console.log(error));
      }
    },
    download() {
      window.open(`api/data/${this.dataSource.id}/download/`);
    }
  },
  data() {
    return {
      showSingleAsset: false
    };
  },
  computed: {
    dataCollection() {
      return this.$store.state.dataCollection;
    }
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
  pointer-events: none;
}

.asset-manipulate-icon {
  width: 15px;
  pointer-events: none;
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
