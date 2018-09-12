<template>
  <div id="app">
    {{name}}
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  data: () => {
    return {
      name: "ccc"
    };
  }
};
</script>

<style  lang='less'>
  html{
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
