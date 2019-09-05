<template>
    <div>
        <h4>computed & watch</h4>
        <p>computed是用到的时候才会触发computed计算函数，computed里面依赖的变量没改变，也不会再次出发computed计算函数</p>
        <p>watch是异步的，多次同步操作改变，只会触发一次 https://cn.vuejs.org/v2/guide/computed.html#%E4%BE%A6%E5%90%AC%E5%99%A8 https://cn.vuejs.org/v2/guide/reactivity.html#%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0%E9%98%9F%E5%88%97</p>
        <p>num {{num}}</p>
        <p>num_by_computed {{num_by_computed}}</p>
        <p>num_by_watch {{num_by_watch}}</p>
        <button @click="fn">num++</button>
        <button @click="fn_use">num++ 方法中有用到computed的变量</button>
        <button @click="fn_use_after">num++ 方法中有用到computed的变量，但是是在标记用变量用到</button>
        <button @click="fn_use_mul">num++ 多次</button>
    </div>
</template>
<script>
    let str = "1"; // 标记用变量 用来检测同步异步
    export default {
        data() {
            return {
                num: 0,
                num_by_watch: null // 通过watch改变
            };
        },
        computed: {
            num_by_computed(v) {
                console.log("computed", str);
                return this.num;
            }
        },
        watch: {
            num: {
                handler(val) {
                    console.log("watch", str);
                    this.num_by_watch = val;
                },
                immediate: true
            }
        },
        methods: {
            fn() {
                console.log("---");
                console.log("%cstr改变前" + str, "font-size:20px;color:blue");

                this.num++;
                str = Math.random() .toString() .slice(2, 8);

                console.log("%cstr改变后" + str, "font-size:20px;color:red"); // 由于num改变的时候，str还没有改变，如果watch和computed里面的函数输出的str是改变前的，那就证明绝对是同步计算。因为str接下来就改变了。如果是异步的话，觉得是等str改变后才执行的，所以读取的str值绝对是改变后的值。
            },
            fn_use() {
                console.log("---");
                console.log("%cstr改变前" + str, "font-size:20px;color:blue");

                this.num++;
                let a = this.num_by_computed;
                str = Math.random().toString().slice(2, 8);

                console.log("%cstr改变后" + str, "font-size:20px;color:red"); // 由于num改变的时候，str还没有改变，如果watch和computed里面的函数输出的str是改变前的，那就证明绝对是同步计算。因为str接下来就改变了。如果是异步的话，觉得是等str改变后才执行的，所以读取的str值绝对是改变后的值。
            },
            fn_use_after() {
                console.log("---");
                console.log("%cstr改变前" + str, "font-size:20px;color:blue");

                this.num++;
                str = Math.random().toString().slice(2, 8);

                console.log("%cstr改变后" + str, "font-size:20px;color:red"); // 由于num改变的时候，str还没有改变，如果watch和computed里面的函数输出的str是改变前的，那就证明绝对是同步计算。因为str接下来就改变了。如果是异步的话，觉得是等str改变后才执行的，所以读取的str值绝对是改变后的值。

                let a = this.num_by_computed;
            },
            fn_use_mul() {
                console.log("---");
                console.log("%cstr改变前" + str, "font-size:20px;color:blue");

                let a, b;
                this.num++;
                a = this.num_by_computed;
                b = this.num_by_watch;

                this.num++;
                a = this.num_by_computed;
                b = this.num_by_watch;

                str = Math.random().toString().slice(2, 8);
                console.log("%cstr改变后" + str, "font-size:20px;color:red");

                this.num++;
                a = this.num_by_computed;
                b = this.num_by_watch;
            }
        }
    };
</script>