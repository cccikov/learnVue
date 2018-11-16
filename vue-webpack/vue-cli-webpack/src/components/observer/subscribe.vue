<!-- 订阅者 -->
<!-- 订阅者 -->
<!-- 订阅者 -->
<template>
    <div>
        <button @click="delLoginHandle">取消订阅</button>
        <router-link to="/publish">/publish</router-link>
    </div>
</template>

<script>
    export default {
        created() {
            // 每次进来都会订阅一次
            this.bus.$on("login", function() {
                console.log("login 操作1");
            });
            // 每次进来都会订阅一次
            this.bus.$once("login", function() {
                console.log("login 只是触发一次的操作");
            });
            // 每次进来都会订阅一次(由于每次进来的this都和之前的this不一样了)
            this.bus.$on("login", this.loginHandle);


            // 每次进来只会订阅一次
            console.log(this.$root.loginHandle);
            let loginHandle = this.$root.loginHandle || (this.$root.loginHandle = function(){
                console.log("全局定义的")
            })
            this.bus.$on("login", loginHandle);

        },
        methods: {
            loginHandle(data) {
                console.log("login 操作2 可独立删除 " + data);
            },
            delLoginHandle() {
                this.bus.$off("login", this.loginHandle);
                this.bus.$off("login", this.$root.loginHandle);
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
