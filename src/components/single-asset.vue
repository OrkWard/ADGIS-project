<template>
  <div style="display: flex; flex-flow:column">
    <div>{{ name }}</div>
    <div>{{ format }}</div>
    <div>{{ source }}</div>
  </div>
</template>

<script>
export default {
  props: ["type", "name", "format", "source"]
};
</script>

<style></style>
