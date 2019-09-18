<style lang="less" scoped>
    .wrap {
        padding: 20px;
        box-shadow: 0px 0px 3px rgba(0, 0, 255, 0.3);
    }
</style>
<template>
    <div class="wrap">
        <p>{{str}} {{typeof str}}</p>
        <p>{{str1}} {{typeof str1}}</p>
        <p>{{str2}} {{typeof str2}}</p>
        <p>{{str3}} {{typeof str3}}</p>
        <p>{{str4}} {{typeof str4}}</p>
    </div>
</template>
<script>
    export default {
        data() {
            return {};
        },
        inject: {
            str: {
                default: "haha"
            },
            // 相当于
            // str: {
            //     from: "str",
            //     default: "haha"
            // },
            str1: {
                from: "str"
            },
            str2: {
                from: "str",
                default: [1, 2, 3]
            },
            str3: {
                from: "str",
                default: () => [1, 2, 3]
            },
            str4: {
                from: "str1",
                default: () => [1, 2, 3]
            }
        }
    };
</script>