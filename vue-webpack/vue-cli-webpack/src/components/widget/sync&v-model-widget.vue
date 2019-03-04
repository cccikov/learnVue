<template>
    <div>
        <p @click="changeValue">{{value}}</p>
        <p @click="changeArr">{{arr}}</p>
        <p @click="changeObj">{{obj}}</p>
    </div>
</template>

<script>
    export default {
        props: ["value", "arr", "obj"],
        methods: {
            changeValue() {
                // this.value.list.pop();
                this.$emit("input", "v-model 同步");
            },
            changeArr() {
                this.$emit("update:arr", "sync 同步");
            },
            changeObj() {
                this.$emit("update:obj", "sync 同步");
            }
        }
    };
</script>

<style lang="less" scoped>
    div {
        padding: 20px;
        margin: 0 0 12px;
        box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
    }
</style>