<template>
    <!-- 自定义table 在基础版上面加上了 表头排序 -->
    <div class="wrap">
        <table>
            <tr>
                <th @click="headClick(head)" v-for="(head,head_index) in columns_actually" :key="head.key+head_index">
                    <div>
                        {{head.name}}
                        <span class="icon" v-if="head.sort=== 'asc'">升</span>
                        <span class="icon" v-if="head.sort=== 'default'">中</span>
                        <span class="icon" v-if="head.sort=== 'desc'">降</span>
                    </div>
                </th>
            </tr>
            <tr v-for="(line,line_index) in tableData" :key="line_index">
                <td v-for="(head,head_index) in columns" :key="head.key+head_index">{{line[head.key]}}</td>
            </tr>
        </table>
    </div>
</template>
<script>
    export default {
        props: {
            columns: {
                type: Array
            },
            tableData: {
                type: Array
            }
        },
        data() {
            return {
                columns_actually: []
            };
        },
        methods: {
            headClick(head) {
                if (head.sort === "default") {
                    head.sort = "asc";
                } else if (head.sort === "asc") {
                    head.sort = "desc";
                } else if (head.sort === "desc") {
                    head.sort = "default";
                } else {
                    // 防止有其他情况出现
                    head.sort = "default";
                }
                this.$emit("sort", head.key, head.sort);
            }
        },
        watch: {
            columns: {
                handler(val) {
                    this.columns_actually = val.map(v => {
                        /* 要返回一个新对象，不然 sort 就不是响应式数据*/
                        return Object.assign(
                            {
                                sort: "default" // asc 升  desc 降
                            },
                            v
                        );
                    });
                },
                immediate: true
            }
        }
    };
</script>
<style lang="less" scoped>
    .wrap {
        overflow: auto;
    }
    table {
        min-width: 100%;
        border-collapse: collapse;
        td,
        th {
            min-width: 100px;
            border: 1px solid #ccc;
            line-height: 50px;
        }
    }
</style>