<template>
  <div>
    <div class="analysis-tool-style" @click="callTool">
      {{ toolname }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["toolname"],
  methods: {
    callTool() {
      // 调取相应的工具
    }
  }
};
</script>

<style scoped>
.analysis-tool-style {
  display: flex;
  flex-flow: column nowrap;
  margin-left: 5px;
  margin-top: 2px;
  padding: 5px;
  width: 60%;
  background-color: var(--default-lightgray);
  color: black;
  border-radius: 5px;
  cursor: pointer;
}
</style>
