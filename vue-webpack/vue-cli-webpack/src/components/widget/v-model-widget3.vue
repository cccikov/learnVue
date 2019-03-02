<template>
    <div>
        <button @click="change">按钮改变值</button>
    </div>
</template>
<script>
    export default {
        // 默认情况下，一个组件上的 v-model 会把 value 用作 prop 且把 input 用作 even
        methods: {
            change() {
                this.$emit("input", "其实在子组件内部不定义用来接收v-model值的prop也无所谓，只要子组件触发相应的event，父组件一样可以十分简单的获取子组件的值并进行绑定")
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