<template>
    <div class="wrap">
         <!-- 自定义table 2的排序其实是不正确的，不可能多个拍序，只能是其中一个排序 -->
         <!-- ps：多个标记，就在多个数据中标记，可以在原始数据数组上增加字段；单个标记，通常要多定义一个变量记住，存对应需要标记的对象id，以及值 -->
        <table>
            <tr>
                <th @click="headClick(head)" v-for="(head,head_index) in columns" :key="head.key+head_index">
                    <div>
                        {{head.name}}
                        <template v-if="sort_key == head.key">
                            <span class="icon" v-if="sort_type=== 'asc'">升</span>
                            <span class="icon" v-if="sort_type=== 'desc'">降</span>
                        </template>
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
                sort_key: "", // 标记是哪个排序
                sort_type: "" // 标记排序状态 asc 升  desc 降
            };
        },
        methods: {
            headClick(head) {
                let key = head.key;
                if (this.sort_key == key) {
                    // 之前就是排这个项的，切换状态
                    if (this.sort_type === "") {
                        this.sort_type = "desc";
                    } else if (this.sort_type === "desc") {
                        this.sort_type = "asc";
                    } else if (this.sort_type === "asc") {
                        this.sort_type = "";
                    } else {
                        // 防止有其他情况出现
                        this.sort_type = "";
                    }
                } else {
                    // 如果是一个新的排序，则重新开始-降序
                    this.sort_key = key;
                    this.sort_type = "desc";
                }

                this.$emit("sort", this.sort_key, this.sort_type);
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