<!-- 查看render函数 -->
<template>
    <div>
        <button @click="check">查看</button>
        <componentCheck></componentCheck>
    </div>
</template>
<script>
    import componentCheck from "./componentRender";
    /* 局部组件的本质就是选项组成的对象；单文件组件返回的也是选项组成的对象 */
    console.dir(componentCheck.render); // 其中的render选项
    export default {
        components: {
            componentCheck
        },
        methods: {
            check() {
                console.dir(componentCheck.render); // 通过 [[FunctionLocation]] 去查看render函数是怎么写的
            }
        }
    };
</script>