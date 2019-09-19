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
    let str = `
        <div>
            <p>compile</p>
            <p>将模板字符串编译render</p>
            <ul>
                <li v-for="val in arr" :key="val">{{val}}</li>
            </ul>
        </div>`;
    export default {
        render: Vue.compile(str).render,
        created() {
            console.log(Vue.compile(str).render);
        },
        data() {
            return {
                arr: new Array(10).fill("").map((val, index) => {
                    return (
                        Math.random().toString().slice(-6) + index
                    );
                })
            };
        }
    };
</script>