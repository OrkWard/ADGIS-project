<template>
  <!-- 空间分析详细处理面板 -->
  <div class="analysis-panel-style" v-drag>
    <div class="analysis-panel-label">{{ toolname }}</div>
    <div>选择文件1:</div>
    <div>选择文件2:</div>
    <div class="analysis-panel-run">运行分析</div>
  </div>
</template>

<script>


export default {
  props: ["toolname"],
  methods: {
  },
  directives: {
    drag(el) {
      let oDiv = el; //当前元素
      oDiv.onmousemove = function (e) {
        if ((Math.abs(e.clientX - oDiv.offsetLeft) < 20 || Math.abs(e.clientX - (oDiv.offsetLeft + oDiv.offsetWidth)) < 20) ||
          (Math.abs(e.clientY - oDiv.offsetTop) < 20 || Math.abs(e.clientY - (oDiv.offsetTop + oDiv.offsetHeight)) < 20))
          this.style.cursor = "grab";
        else
          this.style.cursor = "default";
      }
      oDiv.onmousedown = function (e) {
        if (this.style.cursor == "default")
          return;
        //鼠标按下，计算当前元素距离可视区的距离
        let disX = e.clientX - oDiv.offsetLeft;
        let disY = e.clientY - oDiv.offsetTop;
        document.onmousemove = function (e) {
          //计算移动的距离
          let l = e.clientX - disX;
          let t = e.clientY - disY;
          //移动当前元素
          oDiv.style.left = l + "px";
          oDiv.style.top = t + "px";
        }
        document.onmouseup = function () {
          document.onmousemove = null;
          document.onmouseup = null;
        };
        //return false不加的话可能导致黏连
        return false;
      };
    }
  }
};
</script>

<style scoped>
.analysis-panel-style {
  position: absolute;
  height: 300px;
  width: 300px;
  background-color: var(--default-background-gray);
  z-index: 1;
  border-radius: 10px;
}

.analysis-panel-label {
  text-align: center;
  width: 280px;
  padding: 5px;
  /* width: fit-content; */
  margin: 5px;
  /* display: flex; */
  /* flex-flow: row nowrap; */
  text-transform: capitalize;
}

.analysis-panel-run {
  /* display: flex;
  flex-flow: row nowrap; */
  width: 70px;
  padding: 5px;
  margin-left: 110px;
  margin-right: 110px;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;

}

.analysis-panel-run:hover {
  background-color: var(--default-light-gray);
}
</style>
