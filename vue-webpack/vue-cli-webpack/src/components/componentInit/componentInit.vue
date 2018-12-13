<template>
    <!-- template标签相当于 render函数或者template属性 -->
    <div>
        <template v-if="show1">
            <inCom></inCom>
        </template>
        <p>只要将组件从dom中去除，再次加载，组件就会再次初始化。所以可以使用v-if去控制组件是否加载、清除。</p>
        <button @click="initCom1">再次初始化1</button>

        <hr>

        <p>但是当v-if 和 v-else 里面都有这个组件的时候，不会再次初始化</p>
        <template v-if="show2">
            <inCom></inCom>
        </template>
        <template v-else>
            <inCom></inCom>
        </template>
        <p>因为，如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试修复/再利用相同类型元素的算法。</p>
        <button @click="initCom2">再次初始化2</button>

        <hr>

        <p>但是当v-if 和 v-else 里面都有这个组件的时候，加上不同的key，就会再次初始化</p>
        <template v-if="show3">
            <inCom key="1"></inCom>
        </template>
        <template v-else>
            <inCom key="2"></inCom>
        </template>
        <p>因为，如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试修复/再利用相同类型元素的算法。</p>
        <button @click="initCom3">再次初始化2</button>
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
                show1: true,
                show2: true,
                show3: true
            };
        },
        created() {},
        methods: {
            initCom1() {
                console.log("%c初始化组件1", "font-size:20px;color:#f00");
                this.show1 = false;
                this.$nextTick(() => {
                    // 组件渲染后再设置，否则设置了false，还没渲染立即设置true，那就相当于直接设为true，没有经历过false状态。
                    this.show1 = true;
                });
            },

            initCom2() {
                console.log("%c初始化组件2", "font-size:20px;color:#f0f");
                this.show2 = !this.show2;
            },

            initCom3() {
                console.log("%c初始化组件3", "font-size:20px;color:#0f0");
                this.show3 = !this.show3;
            }
        }
    };
</script>


<style lang='less'>
</style>
