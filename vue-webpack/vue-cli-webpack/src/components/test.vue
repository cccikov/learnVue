<template>
  <!-- template标签相当于 render函数或者template属性 -->
  <div id="app">
    {{name}}
    <template v-if="name">
      <p>haha</p>
      <p>haha</p>
    </template>
    <img src="../assets/logo.png">
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, distinctio eligendi fugiat possimus vero perferendis ut fuga pariatur, obcaecati nesciunt totam dolores adipisci atque sint dicta velit. Veniam, error omnis?</p>
    <hi haha="这是哈哈属性"></hi>
    <hello></hello>
  </div>
</template>

<script>
// 以下就是除render和template的其他选项
import hello from "./HelloWorld";
import hi from "./hi";
import { a } from "../../static/test.js";
import { b } from "../../static/test2.js";
import { c } from "../../static/test3.js";
import storage from "../../static/storage.js";
console.log(a);
console.log(b);
console.log(c);
console.log(storage);
window.storage = storage;

// 当前模块
import $ from "jquery";
console.log($);

console.log(import("../../static/test.js"));
console.log(() => import("../../static/test.js"));
console.log(
  import("../../static/test.js").then(value => {
    console.log("promise里面", value.a);
  })
);

console.log(1);
console.log(() => 1);

export default {
  name: "App",
  components: { hello, hi },
  data: () => {
    return {
      name: "ccc"
    };
  }
};
</script>


<style scoped lang='less'>
@import "../css/reset.less";
.clearfix {
  .clearfix();
}
html {
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
}
</style>
