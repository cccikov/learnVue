<template>
    <!-- template标签相当于 render函数或者template属性 -->
    <div class='son'>
        <div>
            <p> 子组件 </p>
            <div>
                <p> 子组件 </p>
                <div>
                    <p> 子组件 </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {};
</script>
<style scoped lang='less'>
    .son {
        background: #fefefe;
    }
    .son div {
        padding: 10px;
        box-shadow: 0px 0px 12px rgba(0, 125, 0, 0.3);
        color: #0f0;
    }
</style>