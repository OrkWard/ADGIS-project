<template>
  <div>
    <img :src="imgSrc" />
  </div>
</template>

<script>
export default {
  props: ["imgSrc"]
};
</script>

<style scoped>
div {
  margin: 5px;
  padding: 5px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  transition: 300ms;
}
div:hover {
  background-color: var(--default-background-gray);
  transition: 300ms;
  border-radius: 5px;
  box-shadow: 0px 0px 5px gray;
}

img {
  width: 20px;
  filter: var(--main-filter);
}
</style>
