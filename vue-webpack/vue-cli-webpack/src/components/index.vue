<template>
    <!-- template标签相当于 render函数或者template属性 -->
    <div class="wrap">
        <h5>index</h5>
        <div class="list">
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
                <router-link to="/week-period">周时间段选择（臭茄需求）</router-link>
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
            <p>
                <router-link :to="{name:'computedandwatch'}">computed & watch 同步异步对比</router-link>
            </p>
            <p>
                <router-link :to="{name:'provide&inject'}">provide & inject 依赖注入</router-link>
            </p>
            <p>
                <router-link :to="{name:'keyincomponent'}">遍历组件中使用key</router-link>
            </p>
            <p>
                <router-link :to="{name:'render'}">渲染函数 render 单文件组件版</router-link>
                <router-link :to="{name:'render_sfc'}">渲染函数 render 单文件组件对比版</router-link>
                <router-link :to="{name:'render-v-if'}">渲染函数 render v-if</router-link>
                <router-link :to="{name:'getRender'}">查看渲染函数</router-link>
            </p>
            <p>
                <router-link :to="{name:'axiosGetData'}">axios获取mock数据</router-link>
            </p>
            <p>
                <router-link :to="{name:'eightcorner1'}">8角拖拽</router-link>
                <router-link :to="{name:'eightcorner2'}">8角拖拽 demo2</router-link>
                <router-link :to="{name:'eightcorner3'}">8角拖拽 demo3</router-link>
            </p>
            <p>
                <router-link :to="{name:'30-global-methods'}">30. 大批量全局都可以使用的方法</router-link>
            </p>
            <p>
                <router-link :to="{name:'31-global-components'}">31. 全局组件</router-link>
            </p>
            <p>
                <router-link :to="{name:'32-provide-plugin'}">32. 全局模块变量</router-link>
            </p>
            <p>
                <router-link :to="{name:'33-table'}">33. 列行可变table</router-link>
            </p>
            <p>
                <router-link :to="{name:'34-slot'}">34. slot</router-link>
            </p>
            <p>
                <router-link :to="{name:'35-global-timer'}">35. 全局混合定时器</router-link>
            </p>
            <p>
                <router-link :to="{name:'36-table-simple'}">36. 自定义表格再研究</router-link>
            </p>
            <p>
                <router-link :to="{name:'37-index'}">37. 同一个js，不同template</router-link>
            </p>
        </div>
    </div>
</template>
<script>
    export default {
        name: "index",
        created() {
            // this.$axios({
            //     url: "../main.js"
            // })
            //     .then(res => {
            //         console.log(res);
            //     })
            //     .catch(function(err) {
            //         console.log(this);
            //         console.error(err);
            //     });
        }
    };
</script>
<style scoped lang='less'>
    .wrap {
        padding: 5px 20px 50px;
        font-size: 15px;
        text-align: center;
        h5 {
            font-size: 18px;
            margin: 15px 0;
        }
        .list {
            display: inline-flex;
            flex-direction: column;
            text-align: left;
            padding: 0 12px;
            box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
            p {
                margin: 15px 0;
                a {
                    display: block;
                }
            }
        }
    }
</style>
