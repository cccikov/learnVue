<template>
    <!-- template标签相当于 render函数或者template属性 -->
    <div>
        <h5>index</h5>
        <p>
            <router-link to="/demo">demo</router-link>
        </p>
        <p>
            <router-link to="/publish">/publish</router-link>
            <router-link to="/subscribe">/subscribe</router-link>
        </p>
        <p>
            <router-link to="/lifecycle">钩子函数</router-link>
        </p>
        <p>
            <router-link to="/vue-loader">/vue-loader 研究</router-link>
        </p>
        <p>
            <router-link to="/componentInit">/组件再次初始化 研究</router-link>
        </p>
        <p>
            <router-link to="/nextTick">/nextTick 研究</router-link>
        </p>
        <p>
            <router-link to="/page1">/page1</router-link>
        </p>
        <p>
            <router-link to="/render-checkbox">/render-checkbox</router-link>
        </p>
        <p>
            <router-link to="/v-model">/v-model</router-link>
        </p>
        <p>
            <router-link to="/sync">/sync</router-link>
        </p>
        <p>
            <router-link to="/sync&v-model">/sync&v-model</router-link>
        </p>
        <p>
            <router-link to="/mixin_demo1">/mixin_demo1</router-link>
        </p>
        <p>
            <router-link to="/mixin_demo2">/mixin_demo2</router-link>
        </p>
        <p>
            <router-link to="/compile">Vue.compile</router-link>
        </p>
        <p>
            <router-link to="/warning">各种坑</router-link>
        </p>
        <p>
            <router-link to="/week-period">时间段 选择</router-link>
        </p>
        <p>
            <router-link :to="{name:'nesting'}">多层组件嵌套处理</router-link>
        </p>
        <p>
            <router-link :to="{name:'tableandflex'}">table and flex 布局</router-link>
        </p>
        <p>
            <router-link :to="{name:'slot'}">slot 插槽用法</router-link>
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
