<!-- v-model 实现双向绑定最简单方式，利用默认设定， value 作为 prop ， input 作为 event -->
<template>
    <div>
        <p>{{value}}</p>
        <button @click="change">按钮改变值</button>
        <button @click="change2">按钮对象</button>
    </div>
</template>
<script>
    export default {
        // 默认情况下，一个组件上的 v-model 会把 value 用作 prop 且把 input 用作 event
        props: ["value"],
        methods: {
            syncData(value) {
                this.$emit("input", value); // 实现v-model子组件向父组件传播值
            },
            change() {
                this.syncData(
                    "默认情况下，一个组件上的 v-model 会把 value 用作 prop 且把 input 用作 event"
                );
            },
            change2() {
                this.syncData({
                    text:
                        "v-model除了可以绑定基本类型值以外，同样可以绑定引用类型值",
                    arr: [1, 2, 3]
                });
            }
        }
    };
</script>

<style scoped>
    div {
        padding: 12px;
        box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.3);
    }
</style>