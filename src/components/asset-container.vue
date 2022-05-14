<template>
  <div style="display: flex; flex-flow:column">
    <single-asset :format="'geojson'" :name="'hangzhou'" :source="'file'" />
  </div>
</template>

<script>
const singleAsset = {
  props: ["name", "format", "source"],
  template: `<div style="display: flex; flex-flow:column">
    <div>{{ name }}</div>
    <div>{{ format }}</div>
    <div>{{ source }}</div>
  </div>`,
  data() {
    return {};
  }
};

export default {
  components: {
    singleAsset
  },
  props: ["type"]
};
</script>

<style></style>
