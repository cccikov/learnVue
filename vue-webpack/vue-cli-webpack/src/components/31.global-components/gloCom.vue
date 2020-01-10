<!-- 将作为全局组件使用 -->
<template>
    <div>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, assumenda?</p>
        <p>{{foo}}</p>
        <p>
            <button @click="fn">按钮</button>
        </p>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                foo: "组件内部数据"
            };
        },
        methods: {
            fn() {
                alert("组件里面方法");
            }
        }
    };
</script>