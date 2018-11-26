<template>
    <!-- template标签相当于 render函数或者template属性 -->
    <div>
        <h5>index</h5>
        <p>
            <router-link to="/publish">/publish</router-link>
            <router-link to="/subscribe">/subscribe</router-link>
        </p>
        <p>
            <router-link to="/lifecycle">钩子函数</router-link>
        </p>
        <p>
            <router-link to="/vue-loader"> /vue-loader 研究 </router-link>
        </p>
    </div>
</template>
<script>
    export default {
        name: "index"
    };
</script>
<style scoped lang='less'>
    a {
        display: block;
    }
</style>
