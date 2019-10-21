<style lang="less" scoped>
</style>
<template>
    <div>
        <eight v-model="eightData">保持比例</eight>
    </div>
</template>
<script type="text/javascript">
    import eight from "./eightCorner";
    export default {
        data() {
            return {
                eightData: {
                    width: 200,
                    height: 150,
                    top: 80,
                    left: 300,
                    rate:200/150
                },

            };
        },
        components: {
            eight
        }
    };
</script>
