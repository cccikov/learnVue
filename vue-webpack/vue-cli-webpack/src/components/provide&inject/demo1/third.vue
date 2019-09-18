<style lang="less" scoped>
    .wrap {
        padding: 20px;
        box-shadow: 0px 0px 3px rgba(0, 0, 255, 0.3);
    }
</style>
<template>
    <div class="wrap">
        <p>{{str}} {{typeof str}}</p>
        <p>{{arr}} {{typeof arr}}</p>
        <p>{{obj}} {{typeof obj}}</p>
        <p>{{$str}} {{typeof $str}}</p>
        <p>{{$arr}} {{typeof $arr}}</p>
        <p>{{$obj}} {{typeof $obj}}</p>
    </div>
</template>
<script>
    export default {
        data() {
            return {};
        },
        inject: ["str", "arr", "obj", "$str", "$arr", "$obj"]
    };
</script>