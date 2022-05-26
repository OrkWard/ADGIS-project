<script>
// eslint-disable-next-line no-unused-vars
import { metaProperty } from "@babel/types";

export default {
  name: "Coverage",
  props: ["type"],
  computed: {
    dataCollection() {
      return this.$store.state.dataCollection;
    }
  },
  data() {
    return {
      count: 0,
      show: true
    };
  },
  methods: {
    // remove用来删除图层
    remove(item) {
      const i = this.items.indexOf(item);
      if (i > -1) {
        this.items.splice(i, 1);
      }
    }
  }
};
</script>

<template>
  <div id="coverage-container">
    <TransitionGroup tag="ul" name="single-asset-container">
      <div class="single-asset-container" key="key1">
        <div v-for="type in ['image']" :key="type">
          <div>Image</div>
          <div
            v-for="(dataSource, index) in dataCollection[type]"
            :key="index"
            class="single-asset"
          >
            <div>
              <span @click="remove()" class="del">x</span>
              {{ dataSource.Name }}
            </div>
            <div>
              <span>{{ dataSource.Format }}</span>
              <span class="up">↑</span>
              <div></div>
              <span>{{ dataSource.Source }}</span>
              <span class="down">↓</span>
            </div>
          </div>
        </div>
        <div>————————————————</div>
        <div v-for="type in ['terrain']" :key="type">
          <div>Terrain</div>
          <div
            v-for="(dataSource, index) in dataCollection[type]"
            :key="index"
            class="single-asset"
          >
            <div>
              <span @click="remove()" class="but">x</span>
              {{ dataSource.Name }}
            </div>
            <span>{{ dataSource.Format }}</span>
            <span class="up">↑</span>
            <div></div>
            <span>{{ dataSource.Source }}</span>
            <span class="down">↓</span>
          </div>
        </div>
        <div>————————————————</div>
        <div v-for="type in ['vector']" :key="type">
          <div>Vector</div>
          <div
            v-for="(dataSource, index) in dataCollection[type]"
            :key="index"
            class="single-asset"
          >
            <div>
              <span @click="remove()" class="but">x</span>
              {{ dataSource.Name }}
            </div>
            <span>{{ dataSource.Format }}</span>
            <span class="up">↑</span>
            <div></div>
            <span>{{ dataSource.Source }}</span>
            <span class="down">↓</span>
          </div>
        </div>
        <div>————————————————</div>
        <div v-for="type in ['entity']" :key="type">
          <div>Entity</div>
          <div
            v-for="(dataSource, index) in dataCollection[type]"
            :key="index"
            class="single-asset"
          >
            <div>
              <span @click="remove()" class="but">x</span>
              {{ dataSource.Name }}
            </div>
            <span>{{ dataSource.Format }}</span>
            <span class="up">↑</span>
            <div></div>
            <span>{{ dataSource.Source }}</span>
            <span class="down">↓</span>
          </div>
        </div>
        <div>————————————————</div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
#coverage-container {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}
#del {
  height: 40px;
  width: 100px;
  align-content: center;
}
#del:hover {
  color: red;
}
.container {
  position: relative;
  padding: 0;
}
.down {
  padding: 60px;
  color: lightgreen;
}
.up {
  padding: 105px;
  color: lightcoral;
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
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}
.single-asset {
  padding: 5px;
  margin-top: 1px;
  margin-right: 5px;
  background-color: var(--main-lighter);
  color: white;
  border-radius: 5px;
}
.single-asset-container {
  margin-left: 5px;
  display: flex;
  flex-flow: column nowrap;
}

.single-asset-container-enter-active,
.single-asset-container-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.single-asset-container-enter,
.single-asset-container-leave-to {
  opacity: 0;
}
</style>
