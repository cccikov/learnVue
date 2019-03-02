<template>
    <div class="wrap">
        <p>v-model 研究</p>
        <p>v-model 不仅可以用于表单元素的双向绑定，还是应用于自定义组件的双向绑定</p>
        <p>v-model 绑定的属性可以是任何数据类型</p>
        <div>
            <p>父组件的值：{{str}}</p>
            <vModelWidget v-model="str"></vModelWidget>
        </div>
        <div>
            <p>父组件的值：{{obj}}</p>
            <vModelWidget2 v-model="obj"></vModelWidget2>
        </div>
        <div>
            <p>父组件的值：{{num}}</p>
            <vModelWidget3 v-model="num"></vModelWidget3>
        </div>
    </div>
</template>

<script>
    import vModelWidget from "./widget/v-model-widget.vue";
    import vModelWidget2 from "./widget/v-model-widget2.vue";
    import vModelWidget3 from "./widget/v-model-widget3.vue";
    export default {
        components: {
            vModelWidget,
            vModelWidget2,
            vModelWidget3
        },
        data() {
            return {
                str: "Lorem, ipsum dolor.",
                obj: {
                    name: "ccc",
                    age: 18
                },
                num: 912873891273
            };
        }
    };
</script>

<style lang="less" scoped>
    .wrap {
        div {
            margin: 20px 0;
            padding: 12px;
            border-bottom: 1px solid #eee;
        }
    }
</style>
