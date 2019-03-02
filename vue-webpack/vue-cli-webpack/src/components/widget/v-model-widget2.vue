<!-- 使用 v-model 实现双向绑定是，采用定制 prop 和 event -->
<template>
    <div>
        <p>{{syncData}}</p>
        <ul>
            <li v-for="val in syncData.arr">{{val}}</li>
        </ul>
        <button @click="change">按钮改变值</button>
        <button @click="change2">按钮对象</button>
    </div>
</template>
<script>
    export default {
        props: ["syncData", "name"],
        model: {
            prop: "syncData", // 在 props 里面选择其中一个作为双向绑定的用的 prop
            event: "sync" // 自定义一个作为双向绑定的用的 event
        },
        methods: {
            toSync(value) {
                this.$emit("sync", value); // 实现v-model子组件向父组件传播值
            },
            change() {
                this.toSync("定制 prop 和 event");
            },
            change2() {
                this.toSync({
                    text:
                        "v-model除了可以绑定基本类型值以外，同样可以绑定引用类型值",
                    arr: [1, 2, 3]
                });
            }
        }
    };
</script>

<style scoped>
    div {
        padding: 12px;
        box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.3);
    }
</style>
