<template>
    <!-- 自定义table -->
    <div class="wrap">
        <table>
            <tr>
                <th v-for="(head,head_index) in columns" :key="head.key+head_index">{{head.name}}</th>
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