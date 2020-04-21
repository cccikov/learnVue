<template>
    <!-- 33 那个功能太复杂，没有体现核心代码 -->
    <div>
        <tableCustom @sort="sort" :columns="columns" :tableData="tableData"></tableCustom>
        <tableCustom2 @sort="sort" :columns="columns" :tableData="tableData"></tableCustom2>
        <tableCustom3 @sort="sort" :columns="columns" :tableData="tableData"></tableCustom3>
    </div>
</template>
<script>
    import tableCustom from "./table-customize";
    import tableCustom2 from "./table-customize2";
    import tableCustom3 from "./table-customize3";
    export default {
        data() {
            return {
                columns: [
                    {
                        name: "名字",
                        key: "userName"
                    },
                    {
                        name: "年龄",
                        key: "age"
                    },
                    {
                        name: "性别",
                        key: "gender"
                    },
                    {
                        name: "字符串",
                        key: "str"
                    },
                    {
                        name: "字符串",
                        key: "str"
                    },
                    {
                        name: "数组",
                        key: "arr"
                    }
                ],
                tableData: [
                    {
                        userName: "ccc",
                        age: 18,
                        gender: "male",
                        str: "xxx",
                        arr: "数组"
                    },
                    {
                        userName: "ccc",
                        age: 18,
                        gender: "male",
                        str: "xxx",
                        arr: "数组"
                    }
                ]
            };
        },
        components: {
            tableCustom,
            tableCustom2,
            tableCustom3
        },
        methods: {
            sort(key, sort) {
                console.log(key, sort);
            }
        }
    };
</script>
