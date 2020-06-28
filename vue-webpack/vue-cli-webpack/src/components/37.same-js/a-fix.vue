<template>
    <div>
        <p>修复后的页面a</p>
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
        color: #f00;
        font-size: 14px;
    }
</style>