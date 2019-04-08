<style lang="less" scoped>
    .wrap {
        button {
            margin: 10px;
            padding: 8px 20px;
        }
    }
    ul > li {
        padding: 0 12px;
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
</style>

<template>
    <div class="wrap">
        <h2 v-show="from == 'index'">从首页过来</h2>
        <p>有时候，有部分逻辑可以共用，比如beforeRouteEnter，某些mothods、data可以共用，但是还不足以做成组件（比如只是方法一样，数据一样，但是样式十分不一样；又或者公用部分只是methods，如果共同请求相同的几个接口），我们就可以将这部分内容做成mixin，分别引用混入到需要使用的实例中</p>
        <p>有些时候script部分十分多内容，不便于管理，我们就可以抽离部分内容做成mixin，然后混入实例对象中</p>
        <button @click="fn01">01</button>
        <button @click="fn02">02</button>
        <button @click="fn03">03</button>
        <button @click="fn04">04</button>
        <button @click="fn05">05</button>
        <button @click="fn06">06</button>
        <ul>
            <li v-for="(val,key) in arr" :class="{active:index == key}" @click="choseIndex(key)">{{val}}</li>
        </ul>
        <p>
            企业销售数据：
            <br>
            今日数据：￥ {{day1|formatNum}}
            <br>
            7日数据：￥ {{day7|formatNum}}
            <br>
            30日数据：￥{{day30|formatNum}}
        </p>
        <button @click="insert">插入</button>
        <button @click="remove">移除</button>
        <button @click="exchageUp">向上</button>
        <button @click="exchageDown">向下</button>
        <p>
            <a href="javascript:void(0)" @click="$router.push({name:'mixin_demo2'})">去demo2</a>
        </p>
        <button @click="foo_1">1</button>
        <button @click="foo_2">2</button>
        <button @click="foo_3">3</button>
        <button @click="foo_4">4</button>
        <button @click="foo_5">5</button>
        <button @click="foo_6">{{6|addZero}}</button>
        <button @click="foo_7">7</button>
        <button @click="foo_8">{{8|addZero}}</button>
        <button @click="foo_9">9</button>
        <button @click="foo_10">10</button>
        <button @click="foo_11">{{11|addZero}}</button>
        <button @click="foo_12">{{12|addZero}}</button>
    </div>
</template>
<script>
    // 将部分方法抽离，以免script太多，难以管理
    import mixin1 from "./mixin1";
    // 与其他页面共用逻辑
    import mixin2 from "./mixin2";
    export default {
        data() {
            return {
                str: "我是字符串"
            };
        },
        mixins: [mixin1, mixin2],
        created() {
            this.init();
        },
        methods: {
            init() {
                console.log("init");
            },
            // 这里已经写了好多方法，方法太多，难以管理
            fn01() {
                console.log("01");
            },
            fn02() {
                console.log("02");
            },
            fn03() {
                console.log("03");
            },
            fn04() {
                console.log("04");
            },
            fn05() {
                console.log("05");
            },
            fn06() {
                console.log("06");
            }
        }
    };
</script>