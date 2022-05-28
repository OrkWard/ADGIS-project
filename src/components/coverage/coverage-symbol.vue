<template>
  <div class="coverage-symbol-style" v-drag>
    <div class="coverage-symbol-label">选择样式</div>
    <select class="coverage-symbol-form">
      <option>默认</option>
      <option>样式1</option>
      <option>样式2</option>
    </select>
    <div class="coverage-symbol-label">选择颜色</div>
    <input type="color" value="" class="coverage-symbol-color" />
    <div class="coverage-symbol-label">选择尺寸</div>
    <input
      type="number"
      value="1"
      id="num"
      max="10"
      min="0.1"
      class="coverage-symbol-size"
    />
    <input
      type="button"
      class="coverage-symbol-button"
      value="应用"
      @click="symbolIt"
    />
  </div>
</template>
<script>
window.onload = function () {
  document.onmouseup = function () {
    document.onmousemove = null;
  };
};
export default {
  // props: ["dataSource"],
  methods: {
    symbolIt() {
      alert("应用符号化");
    },
  },
  directives: {
    drag(el) {
      let oDiv = el; //当前元素
      oDiv.onmousemove = function (e) {
        if (
          Math.abs(e.clientX - oDiv.offsetLeft) < 20 ||
          Math.abs(e.clientX - (oDiv.offsetLeft + oDiv.offsetWidth)) < 20 ||
          Math.abs(e.clientY - oDiv.offsetTop) < 20 ||
          Math.abs(e.clientY - (oDiv.offsetTop + oDiv.offsetHeight)) < 20
        )
          this.style.cursor = "grab";
        else this.style.cursor = "default";
      };
      oDiv.onmousedown = function (e) {
        if (this.style.cursor == "default") return;
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
        };
        return false;
      };
    },
  },
};
</script>
<style scoped>
.coverage-symbol-style {
  position: absolute;
  height: 300px;
  width: 280px;
  background-color: #f3f5f7;
  z-index: 1;
  border-radius: 10px;
  left: 600px;
  top: 100px;
}

.coverage-symbol-label {
  text-align: center;
  width: 250px;
  padding: 5px;
  margin: 5px;
  text-transform: capitalize;
}

.coverage-symbol-run {
  width: 70px;
  padding: 5px;
  margin-left: 110px;
  margin-right: 110px;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
}

.coverage-symbol-run:hover {
  background-color: var(--default-light-gray);
}
.coverage-symbol-button {
  display: block;
  margin: 16px auto;
  font-size: 16px;
  border: 1px solid #666;
  border-radius: 8px;
  transition-duration: 0.3s;
  position: relative;
  left: -5px;
}

.coverage-symbol-button:active {
  background-color: white;
  transition-duration: 0s;
}

.coverage-symbol-button:hover {
  box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.24),
    3px 3px 10px 0px rgba(0, 0, 0, 0.19);
}
.coverage-symbol-form {
  width: 180px;
  border-radius: 0.4;
  position: relative;
  left: 50px;
}
.coverage-symbol-color {
  position: relative;
  left: 110px;
}
.coverage-symbol-size {
  position: relative;
  left: 100px;
  width: 60px;
}
</style>
