<template>
    <!-- template标签相当于 render函数或者template属性 -->
    <div>
        内部组件
    </div>
</template>

<script>
    export default {
        data(){
            return{
                show:false
            }
        },
        created(){
            console.log("组件初始化\n\n");
        },
    };
</script>


<style lang='less'>
</style>
