<template>
    <!-- template标签相当于 render函数或者template属性 -->
    <div id="app">
        <h5>index</h5>
        <router-link to="/publish">/publish</router-link>
        <router-link to="/subscribe">/subscribe</router-link>
    </div>
</template>

<script>
    export default {
        name: "index"
    };
</script>


<style lang='less'>
</style>
