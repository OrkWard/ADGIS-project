<template>
  <div>
    <!-- 沿用了asset文件里的部分函数 -->
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
        <div class="asset-manipulate" @click="show">
          <!-- 对于四种类型的数据来说，沿用showCoverage这一个图标 -->
          <img
            class="asset-manipulate-icon"
            :src="require('../../assets/image/showCoverage.svg')"
          />
          <div class="asset-manipulate-name" v-if="showIt">显示</div>
          <div class="asset-manipulate-name" v-else>隐藏</div>
        </div>
        <div class="asset-manipulate" @click="symbolization">
          <img
            class="asset-manipulate-icon"
            :src="require('../../assets/image/vector.svg')"
          />
          <div class="asset-manipulate-name" v-if="symbol">取消</div>
          <div class="asset-manipulate-name" v-else>符号化设置</div>
        </div>
      </div>
    </transition>
    <div v-if="symbol">
      <coverage-symbol></coverage-symbol>
    </div>
  </div>
</template>

<script>
// import vue from "vue";
import coverageSymbol from "./coverage-symbol.vue";
// function creater(props) {
//   const symbolNode = new (vue.extend(coverageSymbol))({
//     propsData: props,
//   }).$mount();
//   symbolNode.dataSource = props;
//   document.querySelector("#" + props).appendChild(symbolNode.$el);
// }
export default {
  props: ["dataSource", "index"],
  components: {
    coverageSymbol
  },
  methods: {
    toggleSingleAsset() {
      this.showSingleAsset = !this.showSingleAsset;
    },
    show() {
      this.showIt = !this.showIt;
    },
    symbolization() {
      this.symbol = !this.symbol;
      // creater(this.dataSource);
    }
  },
  data() {
    return {
      showSingleAsset: false,
      showIt: true,
      symbol: false
    };
  }
};
</script>

<style>
.box {
  width: 250px;
  height: 300px;
  top: 180px;
  left: 460px;
  margin: auto auto;
  border-radius: 3.5%;
  background: #f3f5f7;
  box-shadow: 5px 4px 5px 2px #ddd;
  color: white;
  background-position: center center;
  position: absolute;
  opacity: 0.8;
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
