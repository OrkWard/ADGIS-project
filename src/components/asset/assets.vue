<template>
  <!--资源管理模块-->
  <div id="assets-container">
    <asset-container id="image-asset-container" :type="'image'" />
    <asset-container id="terrain-asset-container" :type="'terrain'" />
    <asset-container id="vector-asset-container" :type="'vector'" />
    <asset-container id="entity-asset-container" :type="'entity'" />
  </div>
</template>

<script>
import AssetContainer from "./asset-container.vue";

export default {
  name: "Assets",
  components: {
    AssetContainer
  }
};
</script>

<style scoped>
asset-container {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
}
</style>
