<template>
    <div>
        <p @click="toSyncString">{{string}}</p>
        <p @click="toSyncArray">{{array}}</p>
        <p @click="toSyncObject">{{object}}</p>
        <p @click="toSyncNumber">{{number}}</p>
        <p @click="toSyncBoolean">{{boolean}}</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        props: ["string", "array", "object", "number", "boolean"],
        methods: {
            update(propName, value) {
                this.$emit("update:" + propName, value);
            },
            toSyncString() {
                this.update("string", "子组件的字符串");
            },
            toSyncArray() {
                this.update("array", [1, 2, 3, 4, 5, 6]);
            },
            toSyncObject() {
                this.update("object", {
                    name: "tomato",
                    age: 17,
                    features: "lover"
                });
            },
            toSyncNumber() {
                this.update("number", 123456);
            },
            toSyncBoolean() {
                this.update("boolean", false);
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
