<!--<template>
    <div>
        <p>compile</p>
        <p>将模板字符串编译render</p>
        <ul>
            <li v-for="val in arr" :key="val">{{val}}</li>
        </ul>
    </div>
</template>-->
<script>
    /**
     * 如果模板十分复杂，render会十分难写，可以采用
     */
    import Vue from "vue";
    let str =
        Math.random() > 0.5
            ? `
            <div>
                <p>compile</p>
                <p>将模板字符串编译render</p>
                <ul>
                    <li v-for="val in arr" :key="val">{{val}}</li>
                </ul>
            </div>` // 有 {{}} 等vue语法的动态类型
            : `
            <div>
                <p>compile</p>
                <p>将模板字符串编译render</p>
            </div>`; // 纯静态内容，静态渲染
    export default {
        render: Vue.compile(str).render, // render和staticRenderFns 都要
        staticRenderFns: Vue.compile(str).staticRenderFns, // render和staticRenderFns 都要。静态渲染功能可用于通过本质上缓存DOM树的静态部分（因此无法更改）来优化渲染过程。当您调用render与其一起生成的函数时，它将调用这些函数以获取那些静态部分。
        created() {
            console.log(Vue.compile(str).render);
            console.log(Vue.compile(str).staticRenderFns);
        },
        data() {
            return {
                arr: new Array(10).fill("").map((val, index) => {
                    return (
                        Math.random()
                            .toString()
                            .slice(-6) + index
                    );
                })
            };
        }
    };
</script>