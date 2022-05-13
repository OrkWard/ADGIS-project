<template>
  <div id="assets-container">
    <single-asset
      :format="'geojson'"
      :name="'hangzhou'"
      :source="'file'"
      :type="'vector'"
    />
  </div>
</template>

<script>
import singleAsset from "./single-asset.vue";

export default {
  name: "Assets",
  components: {
    singleAsset
  }
};
</script>

<style scoped>
#coverage-container {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}
</style>
