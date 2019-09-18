<style lang="less" scoped>
    .wrap {
        padding: 20px;
        box-shadow: 0px 0px 3px rgba(0, 0, 255, 0.3);
    }
</style>
<template>
    <div class="wrap">
        <p>str : {{str}} {{typeof str}}</p>
        <p>arr : {{arr}} {{typeof arr}}</p>
        <p>obj : {{obj}} {{typeof obj}}</p>
        <p>$str: {{$str}} {{typeof $str}}</p>
        <p>$arr: {{$arr}} {{typeof $arr}}</p>
        <p>$arr2: {{$arr2}} {{typeof $arr2}}</p>
        <p>$obj: {{$obj}} {{typeof $obj}}</p>
        <p>$obj2: {{$obj2}} {{typeof $obj2}}</p>
        <hr />
        <p>函数： {{$fn}} {{typeof $fn}}</p>
        <ul>
            <li v-for="(val,key) in $fn()">{{key}} -- {{val}}</li>
        </ul>
        <p>函数由于是每次使用的时候调用一次的，所以值都是最新的</p>
        <p>只要依赖的数据来源非函数，即是原数据改变（等于一个新值），inject的值也不会改变，因为：</p>
        <p>provide 和 inject 绑定并不是可响应的。然而，如果你传入了一个可监听的对象，那么其对象的属性还是可响应的。（只要不是赋予一个新值，由于js引用类型的原因，对象还是指向同一个内存位置，所以属性还是响应的）</p>
        <p>但是好难确保祖先组件不会赋予一个新值，所以最好还是使用函数，return想要provide的值。</p>
    </div>
</template>
<script>
    export default {
        data() {
            return {};
        },
        inject: ["str", "arr", "obj", "$str", "$arr", "$arr2", "$obj", "$obj2", "$fn"]
    };
</script>