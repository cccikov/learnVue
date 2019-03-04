<template>
    <div>
        <p>{{text}}</p>
        <button @click="updateText('子组件传的值')">按钮</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        props: ["text"],
        methods: {
            updateText(str) {
                console.log(str);
                this.$emit("update:text", str);
            }
        }
    };
</script>

<style lang="less" scoped>
    div {
        padding: 12px;
        margin: 0 0 12px;
        box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
    }
</style>
