<style lang="less" scoped>
</style>
<template>
    <div>
        <p>el1:{{el1}}</p>
        <p>el2:{{el2}}</p>
        <p>el3:{{el3}}</p>
        <eight>第一个</eight>
        <eight v-model="el1">第二个</eight>
        <eight v-model="el2">第三个</eight>
        <eight v-model="el3">第四个</eight>
    </div>
</template>
<script type="text/javascript">
    import eight from "./eightCorner";
    export default {
        data() {
            return {
                el1: {
                    width: 200,
                    height: 150,
                    top: 80,
                    left: 300
                },
                el2: {
                    top: 400,
                    left: 300
                },
                el3:{}
            };
        },
        components: {
            eight
        }
    };
</script>
