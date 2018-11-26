<template>
    <!-- template标签相当于 render函数或者template属性 -->
    <div class='parent'>
        <div class="part1">
            <p> part1 </p>
            <div>
                <p> 父组件 </p>
                <div>
                    <p> 父组件 </p>
                    <p> 选择器解释为 <code>.part1 div[data-v-514abebf]</code> </p>
                    <son></son>
                </div>
            </div>
        </div>

        <div class="part2">
            <p> part2 </p>
            <div>
                <p> 父组件 </p>
                <div>
                    <p> 父组件 </p>
                    <p> 加了 <code>/deep/</code> 选择器解释为 <code>.part2[data-v-514abebf] div</code> </p>
                    <son></son>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import son from "./son.vue";
    export default {
        components: { son }
    };
</script>
<style scoped lang='less'>
    .part1 div {
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0px 0px 12px rgba(125, 0, 0, 0.3);
        color: #f00;
    }

    .part2 /deep/ div {
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0px 0px 12px rgba(125, 0, 0, 0.3);
        color: #f00;
    }
</style>