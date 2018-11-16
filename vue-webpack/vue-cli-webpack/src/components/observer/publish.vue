<!-- 发布者 -->
<!-- 发布者 -->
<!-- 发布者 -->
<template>
    <div>
        <div>
            <button @click="pub">发布</button>
            <router-link to="/subscribe">/subscribe</router-link>
        </div>

        <div>
            <button @click="selfSub">组件内订阅</button>
            <button @click="selfPub">组件内发布</button>
            <button @click="selfDel">组件取消订阅</button>
            <button @click="selfAllDel">组件取消全部订阅</button>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            pub() {
                console.log("======================");
                this.bus.$emit("login", "登陆成功");
            },
            selfSub() {
                console.log("订阅");
                // 可以订阅多次
                this.$on("login", this.subHandle);
            },
            selfPub() {
                console.log("发布==============================================");
                this.$emit("login", 1, 2, 3, 4, "a");
            },
            subHandle(...arg) {
                console.log("啊啊，终于发布了", ...arg);
            },
            selfDel() {
                // 取消一次，就可以减少一次订阅
                this.$off("login", this.subHandle);
            },
            selfAllDel() {
                // 取消全部login的订阅
                this.$off("login");
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
