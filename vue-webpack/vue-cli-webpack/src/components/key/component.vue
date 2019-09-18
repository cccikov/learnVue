<style lang="less" scoped>
    div {
        padding: 12px;
        p {
            margin: 0;
        }
    }
</style>
<template>
    <div class="item" :data-init="init_num" :data-watch="watch_num">
        <p>
            <strong>id : {{id}}</strong>
        </p>
        <p>init_num : {{init_num}}</p>
        <p>watch_num : {{watch_num}}</p>
    </div>
</template>
<script>
    export default {
        props: ["id", "index", "data"],
        data() {
            return {
                init_num: null,
                watch_num: null
            };
        },
        created() {
            this.init_num = Math.random()
                .toString()
                .slice(-3);
            this.watch_num = this.init_num;
        },
        watch: {
            data(val, old) {
                console.log(old, " ==> ", val);
                this.watch_num = Math.random()
                    .toString()
                    .slice(-2);
            },
            index: {
                handler(val, old) {
                    console.log("原来组件接收的是第" + old + "个的数据 ==> 接受第" + val + "个的数据");
                },
                immediate: true
            }
        }
    };
</script>