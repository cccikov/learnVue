<style lang="less" scoped>
    h5 {
        text-align: center;
        font-size: 50px;
        color: #f44336;
    }
</style>

<template>
    <div>
        <h5>404</h5>
        <p>匹配路由的时候，会按照路由的索引一个个往下匹配，知道匹配为止，所以</p>
        <p>
            <strong>当使用通配符路由时，请确保路由的顺序是正确的，也就是说含有通配符的路由应该放在最后。</strong>
        </p>
        <p>否则，如果通配的放在前面，那访问每个页面都是通配的了</p>
    </div>
</template>

<script>
    export default {};
</script>
