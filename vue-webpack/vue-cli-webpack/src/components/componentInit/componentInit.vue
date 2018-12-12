<template>
    <!-- template标签相当于 render函数或者template属性 -->
    <div>
        <template v-if="show">
            <inCom></inCom>
        </template>
        <p>只要将组件从dom中去除，再次加载，组件就会再次初始化。所以可以使用v-if去控制组件是否加载、清除。</p>
        <button @click="initCom">再次初始化</button>
    </div>
</template>

<script>
    import inCom from "./componentInitIn.vue";
    export default {
        components: {
            inCom
        },
        data() {
            return {
                show: true
            };
        },
        created() {
        },
        methods: {
            initCom() {
                this.show = false;
                this.$nextTick(() => {
                    // 组件渲染后再设置，否则设置了false，还没渲染立即设置true，那就相当于直接设为true，没有经历过false状态。
                    this.show = true;
                });
            }
        }
    };
</script>


<style lang='less'>
</style>
