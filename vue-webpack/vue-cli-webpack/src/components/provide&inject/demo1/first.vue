<style lang="less" scoped>
    .wrap {
        padding: 20px;
        margin: 0 0 20px;
        box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
    }
</style>
<template>
    <div class="wrap">
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
                obj: {
                    name: "tomato",
                    age: 17
                }
            };
        },

        /* 非函数结构，this不是指向 vue 实例，所以获取不到当前组件的属性方法 */
        provide: {
            str: "xxx",
            arr: [1, 2, 3, 4],
            obj: {
                name: "ccc",
                age: 18
            },
            $str: this.str, // undefined
            $arr: this.arr, // undefined
            $obj: this.obj // undefined
        },
        components: {
            second
        }
    };
</script>