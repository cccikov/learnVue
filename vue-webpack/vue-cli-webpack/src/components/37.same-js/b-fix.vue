<template>
    <div>
        <p>修复后页面b</p>
        <p>{{str}}</p>
    </div>
</template>
<script>
import common from './common'
export default {
    mixins:[common]
}
</script>
<style lang="less" scoped>
    p {
        color: #00f;
        font-size: 14px;
    }
</style>