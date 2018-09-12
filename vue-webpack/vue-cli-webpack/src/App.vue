<template>
  <!-- template标签相当于 render函数或者template属性 -->
  <div id="app">
    {{name}}
    <template v-if="name">
        <p>haha</p>
        <p>haha</p>
    </template>
    <img src="./assets/logo.png">
    <router-view/>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, distinctio eligendi fugiat possimus vero perferendis ut fuga pariatur, obcaecati nesciunt totam dolores adipisci atque sint dicta velit. Veniam, error omnis?</p>
    <hi haha="这是哈哈属性"></hi>
    <hello></hello>
  </div>
</template>

<script>
// 以下就是除render和template的其他选项
import hello from "./components/HelloWorld";
import hi from "./components/hi";
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


<style lang='less'>
@import "./css/reset.less";
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
