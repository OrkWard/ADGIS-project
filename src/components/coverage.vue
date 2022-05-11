<template>
  <div id="coverage-container">
    <icon-button :imgSrc="require('../assets/image/coverage.svg')" />
  </div>
</template>

<script>
import iconButton from "./iconButton.vue";

export default {
  name: "Coverage",
  setup() {},
  components: {
    iconButton
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
