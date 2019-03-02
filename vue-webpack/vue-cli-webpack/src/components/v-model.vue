<template>
    <div class="wrap">
        <p>v-model 研究</p>
        <p>v-model 不仅可以用于表单元素的双向绑定，还是应用于自定义组件的双向绑定</p>
        <div>
            <p>父组件的值：{{str1}}</p>
            <vModelWidget v-model="str1"></vModelWidget>
        </div>
        <div>
            <p>父组件的值：{{str2}}</p>
            <vModelWidget2 v-model="str2"></vModelWidget2>
        </div>
        <div>
            <p>父组件的值：{{str3}}</p>
            <vModelWidget3 v-model="str3"></vModelWidget3>
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
                str1: "Lorem, ipsum dolor.",
                str2: "memeda",
                str3: "第三个用来研究v-model的变量"
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
