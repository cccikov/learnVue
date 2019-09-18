<style lang="less" scoped>
    .wrap {
        padding: 20px;
        margin: 0 0 20px;
        box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
    }
</style>
<template>
    <div class="wrap">
        <button @click="change">change</button>
        <second></second>
    </div>
</template>
<script>
    import second from "./second.vue";
    export default {
        data() {
            return {
                str: "vue data str",
                arr: ["a", "b", "c"],
                arr2: ["a", "b", "c"],
                obj: {
                    name: "tomato",
                    age: 17
                },
                obj2: {
                    name: "tomato",
                    age: 17
                }
            };
        },
        methods: {
            fn() {
                console.log("%c执行fn", "font-size:20px;color:red");
                return {
                    str: this.str,
                    arr: this.arr,
                    arr2: this.arr2,
                    data: this.obj,
                    data2: this.obj2
                };
            },
            change() {
                this.str = Math.random()
                    .toString()
                    .slice(2);

                ////////
                // 数组 //
                ////////

                // 赋予一个新值
                this.arr = new Array(5).fill("").map(v =>
                    Math.random()
                        .toString()
                        .slice(2)
                );
                // 改变原数组
                this.arr2.splice(
                    0,
                    5,
                    ...new Array(5).fill("").map(v =>
                        Math.random()
                            .toString()
                            .slice(2)
                    )
                );



                ////////
                // 对象 //
                ////////

                // 给变量赋予新值
                this.obj = {
                    name: this.str,
                    age: this.arr[0]
                };
                // 修改属性，改变原对象
                this.obj2.name = this.str;
                this.obj2.age = this.arr[0];
            }
        },
        provide() {
            return {
                str: "xxx",
                arr: [1, 2, 3, 4],
                obj: {
                    name: "ccc",
                    age: 18
                },
                $str: this.str,
                $arr: this.arr,
                $arr2: this.arr2,
                $obj: this.obj,
                $obj2: this.obj2,
                $fn: this.fn
            };
        },
        components: {
            second
        }
    };
</script>