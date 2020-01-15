<template>
    <div>
        <button @click="mixin_setTimer(fn,finish)">执行定时器</button>
        <button @click="mixin_clearTimer()">手动停止</button>
    </div>
</template>
<script>
export default {
    methods:{
        fn(){
            console.log("%c每次执行","font-size:20px;color:blue")
        },
        finish(){
            console.log("%c自动结束了","font-size:20px;color:red")
        }
    }
}
</script>