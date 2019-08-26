<!-- 多层嵌套 外层 -->
<template>
    <div>
        <button @click="midShow.show = true">显示</button>
        <mid v-show="midShow.show" v-model="midShow"></mid>
    </div>
</template>
<script>
    import mid from "./mid";
    export default {
        components: {
            mid
        },
        data() {
            return {
                midShow: {
                    show: false
                },
                test: {
                    a: "a",
                    b: "b"
                }
            };
        },
        watch: {
            midShow: {
                handler(val) {
                    console.log("midShow", JSON.stringify(val));
                },
                deep: true
            },
            test: {
                handler(val) {
                    console.log("test", JSON.stringify(val));
                },
                deep: true
            }
        },
        created() {
            window.fuck = this;
            window.obj = this.test;
            this.test = {
            };
            window.obj.c = "c";

            this.test = window.obj // test 等于一个新对象，会触发响应式更新，会触发视图变化，watch监听
            setTimeout(() => {
                this.test.a = "aa" // 由于原本的obj对象就是一个vue的响应式对象，属性a也是响应式属性，所以a变化的时候，会触发test响应式变化的
            });
            setTimeout(() => {
                this.test.c = "cc" // 由于属性c不是响应式属性，所以c变化时，是不会触发test响应式变化的。
            });

            // 个人根据vue使用猜测
            // 如果将一个对象赋值给一个响应式属性，如果这个对象不是响应式数据（没有__ob__）,那么vue会自动将这个对象转化为响应式数据，以及全部属性（不仅仅是包括每一级的属性）
            // 一个对象是否响应式数据，根据有无__ob__属性
            // 一个属性是否响应式属性，根据有无对应的setter，getter

            /*
            var obj = {"a":"aa","b":"b","c":"c"}
            fuck.test = obj
            fuck.test === obj  // true
            */
        }
    };
</script>