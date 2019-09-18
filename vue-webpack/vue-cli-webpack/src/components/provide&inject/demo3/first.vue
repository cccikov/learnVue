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
        provide: {
            str: "xxx",
            arr: [1, 2, 3, 4],
            obj: {
                name: "ccc",
                age: 18
            }
        },
        components: {
            second
        }
    };
</script>