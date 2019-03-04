<style lang="less" scoped>
    div {
        /deep/ p {
            margin: 0 0 12px;
        }
    }
</style>


<template>
    <div>
        <div>
            <p>{{str}}</p>
            <p>{{num}}</p>
            <p>{{bool}}</p>
            <p>{{arr}}</p>
            <p>{{obj}}</p>
            <sync v-bind:text.sync="str"></sync>

            <!-- v-model 和 .sync 的区别就是 .sync 可以双向绑定多个值 -->
            <syncMultiple :string.sync="str" :number.sync="num" :array.sync="arr" :object.sync="obj" :boolean.sync="bool"></syncMultiple>
        </div>
    </div>
</template>

<script>
    import sync from "./widget/.sync-widget.vue";
    import syncMultiple from "./widget/.sync-widget2.vue";
    export default {
        components: {
            sync,
            syncMultiple
        },
        data() {
            return {
                str: "这是父组件的字符串",
                num: 2934723894,
                bool: true,
                arr: [2, 3, 52, 34, 25, 234, 23, 5234, 156, 363],
                obj: {
                    name: "ccc",
                    age: "18",
                    id: "123123"
                }
            };
        }
    };
</script>