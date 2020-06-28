<template>
    <div>
        <p>
            <button @click="$router.push({
                name:'37-index-a'
            })">跳去a</button>
            <button @click="$router.push({
                name:'37-index-b'
            })">跳去b</button>
        </p>

        <!-- 每个 .vue 文件最多包含一个 <template> 块。
        内容将被提取并传递给 vue-template-compiler 为字符串，预处理为 JavaScript 渲染函数，并最终注入到从 <script> 导出的组件中。 -->

        <p>每个 .vue 文件最多包含一个 &lt;template&gt; 块。</p>
        <p>内容将被提取并传递给 vue-template-compiler 为字符串，预处理为 JavaScript 渲染函数，并最终注入到从 &lt;script&gt;（组件选项） 导出的组件中。</p>
        <p>所以.vue的真正的内容还是在 &lt;script&gt;（组件选项） 里面</p>
        <p>所以a.vue，b.vue共用同一个js文件作为 &lt;script&gt;（组件选项） ，本质上就是同一个组件；</p>
        <p>所以哪个组件先被渲染，那么组件的渲染函数就采用了哪个，所以无论后面怎么切换路由，模板部分都是相同的内容</p>

        <p>如果 真的想用同一个js作为组件的逻辑部分 ， 那么可以使用mixins（混合），这样每个组件还是有自己的 &lt;script&gt;（组件选项） ，但是都是共用同一个js作为脚本</p>
         <p>
            <button @click="$router.push({
                name:'37-index-a-fix'
            })">跳去修复后的a</button>
            <button @click="$router.push({
                name:'37-index-b-fix'
            })">跳去修复后的b</button>
        </p>


        <router-view />
    </div>
</template>
<style lang="less" scoped>
    p{
        font-size: 16px;
        line-height: 2;
    }
</style>