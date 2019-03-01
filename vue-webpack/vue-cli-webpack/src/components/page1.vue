<template>
    <div class="wrap">
        <div class="top">顶部</div>
        <p>page1</p>
        <p v-for="val in ranInt(100,20)">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor repellat inventore error porro earum enim. Delectus, provident eum ab necessitatibus id mollitia eos? Ea dolorum repudiandae minus! Voluptatum, officia nemo!</p>
        <p>
            <a href="javascript:void(0)" @click="$router.push({'name':'page2'})">to page2</a>
        </p>
        <p>
            <a href="javascript:void(0)" @click="$router.push({'name':'page3'})">to page3</a>
        </p>
    </div>
</template>
<script>
    export default {
        methods: {
            ranInt(max, min) {
                if (min > max) {
                    var mid = max;
                    max = min;
                    min = mid;
                }
                return parseInt(Math.random() * (max - min + 1) + min);
            }
        }
    };
</script>
<style lang="less" scoped>
    .wrap {
        padding: 40-24px 0 0;
    }
    .top {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        text-align: center;
        background: #f00;
        color: #fff;
        line-height: 40px;
    }
</style>
