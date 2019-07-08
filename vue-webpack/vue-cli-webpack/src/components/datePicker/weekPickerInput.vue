<template>
    <div>
        <input type="text" @focus="show=true" />
        <div v-show="show">
            <weekPicker></weekPicker>
        </div>
    </div>
</template>
<script>
    import weekPicker from "./weekPicker.vue";
    export default {
        components: {
            weekPicker
        },
        data() {
            return {
                show: false
            };
        }
    };
</script>
<style lang="less" scoped>
    div {
        position: relative;
    }
</style>

