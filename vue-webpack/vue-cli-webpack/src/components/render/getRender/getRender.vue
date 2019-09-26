<!-- 查看render函数 -->
<template>
    <div>
        <button @click="check">查看</button>
        <componentCheck></componentCheck>
    </div>
</template>
<script>
    import componentCheck from "./componentRender";
    console.dir(componentCheck.render);
    export default {
        components: {
            componentCheck
        },
        methods: {
            check() {
                console.dir(componentCheck.render);
            }
        }
    };
</script>