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
            <p>{{json}}</p>
            <p>{{arr}}</p>
            <p>{{obj}}</p>
        </div>
        <div>
            <!-- v-model 和 .sync 的区别就是 .sync 可以双向绑定多个值，v-model一个组件只能同步一个 -->
            <sv v-model="json" :obj.sync="obj" :arr.sync="arr"></sv>
        </div>
    </div>
</template>

<script>
    import sv from "./widget/sync&v-model-widget.vue";
    export default {
        components: {
            sv
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
                },
                json: {
                    list: [
                        {
                            name: "meme",
                            value: 17
                        },
                        {
                            name: "mumu",
                            value: 123
                        },
                        {
                            name: "ccc",
                            value: 18
                        }
                    ],
                    name:"json",
                }
            };
        }
    };
</script>