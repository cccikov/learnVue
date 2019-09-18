<style lang="less" scoped>
    .wrap {
        padding: 20px;
        box-shadow: 0px 0px 3px rgba(255, 0, 0, 0.3);
    }
</style>
<template>
    <div class="wrap">
        <third></third>
    </div>
</template>
<script>
    import third from "./third.vue";
    export default {
        data() {
            return {};
        },
        components: {
            third
        }
    };
</script>