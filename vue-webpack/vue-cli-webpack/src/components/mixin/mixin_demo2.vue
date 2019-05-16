<style lang="less" scoped>
    ul {
        display: flex;
        padding: 0;
        list-style: none;
        li {
            margin: 0 15px;
            padding: 5px 12px;
            border-radius: 5px;
            cursor: pointer;
            &:hover {
                background: #00bcd438;
                color: #fff;
            }
            &.active {
                background: #ff5722;
                color: #fff;
            }
        }
    }
</style>

<template>
    <div class="wrap">
        <h2 v-show="from == 'index'">从首页过来</h2>
        <p>
            将逻辑混入，使页面具有
            <span>移除</span>
            <span>向上</span>
            <span>向下</span>
            功能，
            以及格式化数字,
            获取数据
        </p>
        <ul>
            <li v-for="(val,key) in arr" :class="{active:index == key}" @click="choseIndex(key)">{{val}}</li>
        </ul>
        <p>
            <button @click="remove">移除</button>
            <button @click="exchangeUp">向上</button>
            <button @click="exchangeDown">向下</button>
        </p>

        <p>
            企业销售数据：
            <br>
            今日数据：￥ {{day1|formatNum}}
            <br>
            7日数据：￥ {{day7|formatNum}}
            <br>
            30日数据：￥{{day30|formatNum}}
        </p>
        <a href="javascript:void(0)" @click="$router.push({name:'mixin_demo1'})">去demo1</a>
    </div>
</template>
<script>
    import mixin2 from "./mixin2";
    export default {
        data() {
            return {
                arr: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n"]
            };
        },
        mixins: [mixin2],
        created() {
            this.init();
        },
        methods: {
            init() {
                console.log("init");
            }
        }
    };
</script>