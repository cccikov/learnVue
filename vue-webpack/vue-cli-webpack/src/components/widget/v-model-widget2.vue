<!-- 使用 v-model 实现双向绑定是，采用定制 prop 和 event -->
<template>
    <div>
        <p>{{text}}</p>
        <button @click="change">按钮改变值</button>
    </div>
</template>
<script>
    export default {
        props: ["text", "name"],
        model: {
            prop: "text", // 在 props 里面选择其中一个作为双向绑定的用的 prop
            event: "syncData" // 自定义一个作为双向绑定的用的 event
        },
        methods: {
            syncData(value) {
                this.$emit("syncData", value); // 实现v-model子组件向父组件传播值
            },
            change() {
                this.syncData("定制 prop 和 event");
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
