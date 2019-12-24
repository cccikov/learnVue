<template>
    <div>
        <p>假如，我将某些常用的方法封装起来，一些工具类的方法也封装起来，全部请求的方法也写在一个js里面供全局使用。</p>
        <a href="javascript:void(0)" @click="formatDate">../../common/Util.js 工具类 里面的 formatDate 方法</a>
        <a href="javascript:void(0)" @click="method1">../../common/commonMethods.js 常用 里面的 method1 方法</a>
        <a href="javascript:void(0)" @click="method2">../../common/commonMethods.js 常用 里面的 method2 方法</a>
        <a href="javascript:void(0)" @click="getData1">../../common/ajaxMethods.js 请求 里面的 getData1 方法</a>
    </div>
</template>
<script>
    export default {};
</script>
<style lang="less" scoped>
    div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        a {
            margin: 15px 0;
        }
    }
</style>